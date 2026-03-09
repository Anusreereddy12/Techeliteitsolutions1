from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('courses.urls')),   # ← empty prefix, not 'api/'
    path('', include('academy.urls')),   # ← empty prefix, not 'api/'
]