from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Course, Booking
from .serializers import (
    CourseSerializer, CourseListSerializer,
    BookingSerializer,
)
#  ── Admin: Course CRUD ──────────────────────────────────────────────────────

class AdminCourseListCreateView(generics.ListCreateAPIView):
    """GET /api/admin/courses/  — list all courses (incl inactive)
       POST /api/admin/courses/ — create course"""
    serializer_class = CourseSerializer
    def get_queryset(self):
        return Course.objects.all()


class AdminCourseDetailView(generics.RetrieveUpdateDestroyAPIView):
    """GET/PUT/PATCH/DELETE /api/admin/courses/<slug>/"""
    serializer_class = CourseSerializer
    queryset = Course.objects.all()
    lookup_field = 'slug'


# ── Admin: Booking management ───────────────────────────────────────────────

class AdminBookingListView(generics.ListAPIView):
    """GET /api/admin/bookings/ — all bookings"""
    serializer_class = BookingSerializer
    def get_queryset(self):
        return Booking.objects.select_related('course').order_by('-created_at')


class AdminBookingDetailView(generics.RetrieveUpdateDestroyAPIView):
    """PATCH /api/admin/bookings/<id>/ — update status etc."""
    serializer_class = BookingSerializer
    queryset = Booking.objects.all()


# ── Admin: Stats ────────────────────────────────────────────────────────────

@api_view(['GET'])
def admin_stats(request):
    from django.contrib.auth.models import User
    pending = Booking.objects.filter(status='pending').count()
    confirmed = Booking.objects.filter(status='confirmed').count()
    cancelled = Booking.objects.filter(status='cancelled').count()
    recent = Booking.objects.select_related('course').order_by('-created_at')[:5]
    return Response({
        'total_courses':        Course.objects.count(),
        'active_courses':       Course.objects.filter(is_active=True).count(),
        'online_courses':       Course.objects.filter(is_active=True, course_type='online').count(),
        'offline_courses':      Course.objects.filter(is_active=True, course_type='offline').count(),
        'total_bookings':       Booking.objects.count(),
        'pending_bookings':     pending,
        'confirmed_bookings':   confirmed,
        'cancelled_bookings':   cancelled,
        'total_students':       User.objects.count(),
        'recent_bookings':      BookingSerializer(recent, many=True).data,
    })

# ── Courses ──────────────────────────────────────────────

class CourseListView(generics.ListAPIView):
    """GET /api/courses/ — all active courses"""
    serializer_class = CourseListSerializer

    def get_queryset(self):
        return Course.objects.filter(is_active=True)


class CourseDetailView(generics.RetrieveAPIView):
    """GET /api/courses/<slug>/ — single course detail"""
    serializer_class = CourseSerializer
    queryset = Course.objects.filter(is_active=True)
    lookup_field = 'slug'


@api_view(['GET'])
def online_courses(request):
    """GET /api/courses/online/ — online courses only"""
    courses = Course.objects.filter(is_active=True, course_type='online')
    serializer = CourseListSerializer(courses, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def offline_courses(request):
    """GET /api/courses/offline/ — offline courses only"""
    courses = Course.objects.filter(is_active=True, course_type='offline')
    serializer = CourseListSerializer(courses, many=True)
    return Response(serializer.data)


# ── Bookings ─────────────────────────────────────────────

class BookingCreateView(generics.CreateAPIView):
    """POST /api/bookings/ — create a demo/consultation/enrollment booking"""
    serializer_class = BookingSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {'message': 'Booking submitted successfully!', 'data': serializer.data},
            status=status.HTTP_201_CREATED
        )


# ── Stats ─────────────────────────────────────────────────

@api_view(['GET'])
def site_stats(request):
    """GET /api/stats/ — summary numbers for the homepage"""
    return Response({
        'total_courses': Course.objects.filter(is_active=True).count(),
        'online_courses': Course.objects.filter(is_active=True, course_type='online').count(),
        'offline_courses': Course.objects.filter(is_active=True, course_type='offline').count(),
        'total_bookings': Booking.objects.count(),
    })