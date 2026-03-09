from django.urls import path
from . import views

urlpatterns = [
    path('api/courses/', views.CourseListView.as_view()),
    path('api/courses/online/', views.online_courses),
    path('api/courses/offline/', views.offline_courses),
    path('api/courses/<slug:slug>/', views.CourseDetailView.as_view()),
    path('api/bookings/', views.BookingCreateView.as_view()),
    path('api/stats/', views.site_stats),
]