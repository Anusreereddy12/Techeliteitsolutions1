# backend/api/urls.py

from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    # Auth
    path('auth/register/', views.RegisterView.as_view(), name='register'),
    path('auth/login/', views.LoginView.as_view(), name='login'),
    path('auth/google/', views.GoogleAuthView.as_view(), name='google-auth'),
    path('auth/me/', views.UserProfileView.as_view(), name='user-profile'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),

    # Courses
    path('courses/', views.CourseListView.as_view(), name='courses'),

    # Enrollment (online)
    path('enrollments/', views.EnrollView.as_view(), name='enroll'),
    path('enrollments/mine/', views.MyEnrollmentsView.as_view(), name='my-enrollments'),

    # Seat booking (offline)
    path('bookings/', views.BookSeatView.as_view(), name='book-seat'),
    path('bookings/mine/', views.MyBookingsView.as_view(), name='my-bookings'),

    # Contact
    path('contact/', views.ContactView.as_view(), name='contact'),
]