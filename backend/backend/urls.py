from django.contrib import admin
from django.urls import path,include
from academy import views
from academy.views import contact

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('academy.urls')),

    path('api/register/', views.register),
    path('api/login/', views.login),
    path('api/contact/', views.contact),

    path('api/online-courses/', views.online_courses),
    path('api/offline-courses/', views.offline_courses),
]