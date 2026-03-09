from .models import Course, Booking
from rest_framework import serializers

class CourseListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'title', 'slug', 'course_type', 'level',
                  'duration', 'price', 'rating', 'students', 'topics',
                  'location', 'schedule']

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

class BookingSerializer(serializers.ModelSerializer):
    course_title = serializers.CharField(source='course.title', read_only=True)
    class Meta:
        model = Booking
        fields = ['id', 'course', 'course_title', 'name', 'email', 'phone',
                  'booking_type', 'preferred_date', 'message', 'status', 'created_at']
        read_only_fields = ['status', 'created_at']