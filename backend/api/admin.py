# backend/api/admin.py

from django.contrib import admin
from .models import UserProfile, Course, Enrollment, SeatBooking, ContactMessage

admin.site.register(UserProfile)
admin.site.register(Course)
admin.site.register(Enrollment)
admin.site.register(SeatBooking)
admin.site.register(ContactMessage)