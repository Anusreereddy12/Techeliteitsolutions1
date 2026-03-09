# backend/api/views.py

from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from api.models import Course, Enrollment, SeatBooking, ContactMessage
from api.serializers import (
    UserSerializer, RegisterSerializer, CourseSerializer,
    EnrollmentSerializer, SeatBookingSerializer, ContactMessageSerializer
)


# ── AUTH VIEWS ──────────────────────────────────────────────────────────────

class RegisterView(generics.CreateAPIView):
    """POST /api/auth/register/"""
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            'user': UserSerializer(user).data,
            'token': str(refresh.access_token), # frontend expects 'token'
            'refresh': str(refresh),
        }, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    """POST /api/auth/login/"""
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email_or_username = request.data.get('email', '')
        password = request.data.get('password', '')

        # Support login by email OR username
        try:
            user_obj = User.objects.get(email=email_or_username)
            username = user_obj.username
        except User.DoesNotExist:
            username = email_or_username

        user = authenticate(username=username, password=password)
        if not user:
            return Response({'error': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)
        return Response({
            'user': UserSerializer(user).data,
            'token': str(refresh.access_token), # frontend expects 'token'
            'refresh': str(refresh),
        })


class GoogleAuthView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        access_token = request.data.get('token')
        if not access_token:
            return Response({'error': 'Token required.'}, status=400)

        # Verify with Google and get user info
        import requests as req
        google_resp = req.get(
            'https://www.googleapis.com/oauth2/v3/userinfo',
            headers={'Authorization': f'Bearer {access_token}'}
        )
        if google_resp.status_code != 200:
            return Response({'error': 'Invalid Google token.'}, status=400)

        info = google_resp.json()
        email = info.get('email')
        first_name = info.get('given_name', '')
        last_name = info.get('family_name', '')
        picture = info.get('picture', '')

        user, _ = User.objects.get_or_create(
            email=email,
            defaults={'username': email.split('@')[0], 'first_name': first_name, 'last_name': last_name}
        )
        user.profile.google_avatar = picture
        user.profile.save()

        refresh = RefreshToken.for_user(user)
        return Response({
            'user': UserSerializer(user).data,
            'token': str(refresh.access_token),
            'refresh': str(refresh),
        })


class UserProfileView(APIView):
    """GET /api/auth/me/"""
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


# ── COURSE VIEWS ─────────────────────────────────────────────────────────────

class CourseListView(generics.ListAPIView):
    """GET /api/courses/?mode=online  or  ?mode=offline"""
    serializer_class = CourseSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        qs = Course.objects.filter(is_active=True)
        mode = self.request.query_params.get('mode')
        if mode:
            qs = qs.filter(mode=mode)
        return qs


# ── ENROLLMENT (ONLINE) ───────────────────────────────────────────────────────

class EnrollView(generics.CreateAPIView):
    """POST /api/enrollments/  — Enroll Now for online courses"""
    serializer_class = EnrollmentSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        
        # In course details payload, it sends 'courseId' or we need to find course by title if frontend didn't send ID
        if 'courseId' in data:
            data['course'] = data['courseId']
        elif 'courseName' in data:
            # try to find course by title
            course = Course.objects.filter(title=data['courseName']).first()
            if course:
                data['course'] = course.id
            
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        
        # If user is authenticated, save with user, otherwise anon user handling requires either returning error
        # or allowing nullable user on Enrollment. Wait, Enrollment requires user!
        # If frontend doesn't send token, this will fail. Let's see if we can find a user by email, or create a dummy user
        if request.user.is_authenticated:
            serializer.save(user=request.user)
        else:
            # Let's try to find an existing user by email or create a temporary one for enrollment
            email = data.get('email')
            if email:
                user, created = User.objects.get_or_create(
                    email=email,
                    defaults={'username': email.split('@')[0], 'first_name': data.get('name', '').split(' ')[0]}
                )
                serializer.save(user=user)
            else:
                return Response({'error': 'Email is required for enrollment'}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class MyEnrollmentsView(generics.ListAPIView):
    """GET /api/enrollments/mine/  — user's own enrollments"""
    serializer_class = EnrollmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Enrollment.objects.filter(user=self.request.user)


# ── SEAT BOOKING (OFFLINE) ────────────────────────────────────────────────────

class BookSeatView(generics.CreateAPIView):
    """POST /api/bookings/  — Book a Seat for offline courses"""
    serializer_class = SeatBookingSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        
        # Map course string to course ID
        course_slug_or_name = data.get('course')
        if course_slug_or_name:
            # frontend uses strings like: "python", "java", "mern", "devops", "aws", "data-science"
            # we need to map this to an actual Course object
            course_map = {
                'python': 'Python Full Stack',
                'java': 'Java Full Stack',
                'mern': 'MERN Stack',
                'devops': 'DevOps',
                'aws': 'AWS Cloud',
                'data-science': 'Data Science'
            }
            course_title = course_map.get(course_slug_or_name, course_slug_or_name)
            course = Course.objects.filter(title__icontains=course_title).first()
            if course:
                data['course'] = course.id

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        
        if request.user.is_authenticated:
            serializer.save(user=request.user)
        else:
            email = data.get('email')
            if email:
                user, created = User.objects.get_or_create(
                    email=email,
                    defaults={'username': email.split('@')[0], 'first_name': data.get('name', '').split(' ')[0]}
                )
                serializer.save(user=user)
            else:
                return Response({'error': 'Email is required for booking'}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class MyBookingsView(generics.ListAPIView):
    """GET /api/bookings/mine/"""
    serializer_class = SeatBookingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return SeatBooking.objects.filter(user=self.request.user)


# ── CONTACT FORM ─────────────────────────────────────────────────────────────

class ContactView(generics.CreateAPIView):
    """POST /api/contact/  — used by both Contact and Contact Us pages"""
    serializer_class = ContactMessageSerializer
    permission_classes = [permissions.AllowAny]   # anyone can contact