from django.urls import path
from . import views

urlpatterns = [
    # Public
    path('api/courses/',                views.CourseListView.as_view()),
    path('api/courses/online/',         views.online_courses),
    path('api/courses/offline/',        views.offline_courses),
    path('api/courses/<slug:slug>/',    views.CourseDetailView.as_view()),
    path('api/bookings/',               views.BookingCreateView.as_view()),
    path('api/stats/',                  views.site_stats),

    # Admin
    path('api/admin/stats/',                        views.admin_stats),
    path('api/admin/courses/',                      views.AdminCourseListCreateView.as_view()),
    path('api/admin/courses/<slug:slug>/',          views.AdminCourseDetailView.as_view()),
    path('api/admin/bookings/',                     views.AdminBookingListView.as_view()),
    path('api/admin/bookings/<int:pk>/',            views.AdminBookingDetailView.as_view()),

    # Enrollments — filtered bookings with booking_type='enrollment'
    path('api/admin/enrollments/',          views.admin_enrollment_list),
    path('api/admin/enrollments/<int:pk>/', views.admin_enrollment_detail),
]