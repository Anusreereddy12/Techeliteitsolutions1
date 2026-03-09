# backend/api/models.py

from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    """Extra info linked to Django's built-in User"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    phone = models.CharField(max_length=20, blank=True)
    google_avatar = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Profile of {self.user.username}"


class Course(models.Model):
    MODE_CHOICES = [('online', 'Online'), ('offline', 'Offline')]

    title = models.CharField(max_length=200)
    description = models.TextField()
    mode = models.CharField(max_length=10, choices=MODE_CHOICES)
    duration = models.CharField(max_length=100)   # e.g. "3 months"
    price = models.DecimalField(max_digits=8, decimal_places=2)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"[{self.mode.upper()}] {self.title}"


class Enrollment(models.Model):
    """Online course enrollment — Enroll Now button"""
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='enrollments')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='enrollments')
    full_name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    preferred_date = models.DateField(null=True, blank=True)
    preferred_time = models.TimeField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    enrolled_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'course')   # one enrollment per course per user

    def __str__(self):
        return f"{self.full_name} → {self.course.title}"


class SeatBooking(models.Model):
    """Offline course seat booking — Book a Seat button"""
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='bookings')
    full_name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    preferred_date = models.DateField()
    preferred_time = models.TimeField()
    message = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    booked_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.full_name} → {self.course.title} on {self.preferred_date}"


class ContactMessage(models.Model):
    """Handles both /contact and /contact-us — same form, same table"""
    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    subject = models.CharField(max_length=300, blank=True, null=True)
    message = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f"[{self.submitted_at.date()}] {self.name} — {self.subject}"