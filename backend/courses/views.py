from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Course, Booking
from .serializers import (
    CourseSerializer, CourseListSerializer,
    BookingSerializer,
)


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