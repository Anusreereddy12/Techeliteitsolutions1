# backend/api/serializers.py

from rest_framework import serializers
from django.contrib.auth.models import User
from api.models import UserProfile, Course, Enrollment, SeatBooking, ContactMessage


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['phone', 'google_avatar']


class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'profile']


class RegisterSerializer(serializers.ModelSerializer):
    firstName = serializers.CharField(source='first_name', write_only=True)
    lastName = serializers.CharField(source='last_name', write_only=True)
    phone = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True, min_length=8)
    confirmPassword = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['email', 'firstName', 'lastName', 'phone', 'password', 'confirmPassword']

    def validate(self, data):
        if data['password'] != data['confirmPassword']:
            raise serializers.ValidationError({"password": "Passwords do not match."})
        if User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError({"email": "This email is already registered."})
        return data

    def create(self, validated_data):
        validated_data.pop('confirmPassword')
        phone = validated_data.pop('phone')
        
        # generate username from email prefix
        email = validated_data['email']
        base_username = email.split('@')[0]
        username = base_username
        counter = 1
        while User.objects.filter(username=username).exists():
            username = f"{base_username}{counter}"
            counter += 1
            
        validated_data['username'] = username
        
        user = User.objects.create_user(**validated_data)
        UserProfile.objects.create(user=user, phone=phone)
        return user


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'


class EnrollmentSerializer(serializers.ModelSerializer):
    course_title = serializers.CharField(source='course.title', read_only=True)
    # The frontend payload sends matching names mostly, but we map them below.
    # Frontend payload: name, email, phone, mode, date, time, message
    name = serializers.CharField(source='full_name', write_only=True)
    date = serializers.DateField(source='preferred_date', write_only=True)
    time = serializers.TimeField(source='preferred_time', write_only=True)

    class Meta:
        model = Enrollment
        fields = ['id', 'course', 'course_title', 'name', 'email', 'phone', 'date', 'time', 'status', 'enrolled_at']
        read_only_fields = ['status', 'enrolled_at']


class SeatBookingSerializer(serializers.ModelSerializer):
    course_title = serializers.CharField(source='course.title', read_only=True)
    name = serializers.CharField(source='full_name', write_only=True)
    date = serializers.DateField(source='preferred_date', write_only=True)
    time = serializers.TimeField(source='preferred_time', write_only=True)

    class Meta:
        model = SeatBooking
        fields = ['id', 'course', 'course_title', 'name', 'email', 'phone',
                  'date', 'time', 'message', 'status', 'booked_at']
        read_only_fields = ['status', 'booked_at']


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'phone', 'subject', 'message', 'submitted_at']
        read_only_fields = ['submitted_at']