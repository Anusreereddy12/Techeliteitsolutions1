# Django Backend API Documentation

This document outlines the required Django REST API endpoints for the TechElite IT Solutions website frontend.

## Tech Stack
- **Backend**: Django 4.x + Django REST Framework
- **Database**: PostgreSQL 14+
- **Authentication**: JWT (JSON Web Tokens)

## Required Django Apps

```bash
# Create Django apps
python manage.py startapp accounts
python manage.py startapp courses
python manage.py startapp enrollments
python manage.py startapp bookings
```

## Database Models

### 1. User Model (accounts/models.py)
```python
from django.contrib.auth.models.AbstractUser import AbstractUser
from django.db import models

class User(AbstractUser):
    phone = models.CharField(max_length=20, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    address = models.TextField(blank=True)
    profile_picture = models.ImageField(upload_to='profiles/', null=True, blank=True)
    is_student = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.email
```

### 2. Course Model (courses/models.py)
```python
from django.db import models

class Course(models.Model):
    COURSE_TYPE_CHOICES = [
        ('online', 'Online'),
        ('offline', 'Offline'),
    ]
    
    LEVEL_CHOICES = [
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
        ('beginner_to_advanced', 'Beginner to Advanced'),
        ('intermediate_to_advanced', 'Intermediate to Advanced'),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    course_type = models.CharField(max_length=10, choices=COURSE_TYPE_CHOICES)
    duration = models.CharField(max_length=50)
    level = models.CharField(max_length=30, choices=LEVEL_CHOICES)
    description = models.TextField()
    detailed_description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    rating = models.DecimalField(max_digits=2, decimal_places=1, default=0)
    students_enrolled = models.IntegerField(default=0)
    location = models.CharField(max_length=200, blank=True)
    schedule = models.CharField(max_length=200, blank=True)
    instructor_info = models.TextField()
    prerequisites = models.JSONField(default=list)
    topics = models.JSONField(default=list)
    features = models.JSONField(default=list)
    what_you_will_learn = models.JSONField(default=list)
    curriculum = models.JSONField(default=list)
    certifications = models.JSONField(default=list)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title
```

### 3. Enrollment Model (enrollments/models.py)
```python
from django.db import models
from django.conf import settings
from courses.models import Course

class Enrollment(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='enrollments')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='enrollments')
    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    preferred_start_date = models.DateField()
    message = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    payment_status = models.CharField(max_length=20, default='pending')
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    enrolled_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-enrolled_at']
        unique_together = ['user', 'course']

    def __str__(self):
        return f"{self.name} - {self.course.title}"
```

### 4. Booking Model (bookings/models.py)
```python
from django.db import models

class Booking(models.Model):
    MODE_CHOICES = [
        ('online', 'Online'),
        ('offline', 'Offline'),
    ]
    
    TIME_CHOICES = [
        ('09:00', '09:00 AM'),
        ('10:00', '10:00 AM'),
        ('11:00', '11:00 AM'),
        ('14:00', '02:00 PM'),
        ('15:00', '03:00 PM'),
        ('16:00', '04:00 PM'),
        ('17:00', '05:00 PM'),
    ]

    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    course_name = models.CharField(max_length=200)
    mode = models.CharField(max_length=10, choices=MODE_CHOICES)
    preferred_date = models.DateField()
    preferred_time = models.CharField(max_length=5, choices=TIME_CHOICES)
    message = models.TextField(blank=True)
    status = models.CharField(max_length=20, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} - {self.course_name}"
```

### 5. Contact Model (bookings/models.py)
```python
class ContactInquiry(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    subject = models.CharField(max_length=200)
    message = models.TextField()
    status = models.CharField(max_length=20, default='new')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = 'Contact Inquiries'

    def __str__(self):
        return f"{self.name} - {self.subject}"
```

## API Endpoints

### Authentication Endpoints

#### 1. Register User
```
POST /api/auth/register/
Content-Type: application/json

Request Body:
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "password": "securepassword123",
  "confirm_password": "securepassword123"
}

Response (201 Created):
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGci...",
  "user": {
    "id": 1,
    "email": "john@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "phone": "+1234567890",
    "is_student": true
  }
}
```

#### 2. Login User
```
POST /api/auth/login/
Content-Type: application/json

Request Body:
{
  "email": "john@example.com",
  "password": "securepassword123"
}

Response (200 OK):
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGci...",
  "user": {
    "id": 1,
    "email": "john@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "phone": "+1234567890"
  }
}
```

#### 3. Get User Profile
```
GET /api/auth/profile/
Authorization: Bearer <token>

Response (200 OK):
{
  "id": 1,
  "email": "john@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "phone": "+1234567890",
  "created_at": "2024-01-01T00:00:00Z",
  "enrollments_count": 3
}
```

#### 4. Google OAuth Login/Register
```
GET /api/auth/google/

# This redirects to Google OAuth consent screen
# After user consents, Google redirects back to:
GET /api/auth/google/callback/?code=<authorization_code>

Response (Redirect to frontend):
http://localhost:5173/?token=<jwt_token>&user=<user_data>

# Frontend should extract token and user from URL params
```

### Admin Endpoints

#### 10. Get Dashboard Stats (Admin Only)
```
GET /api/admin/stats/
Authorization: Bearer <admin_token>

Response (200 OK):
{
  "total_students": 1234,
  "active_courses": 24,
  "pending_bookings": 45,
  "monthly_revenue": "450000.00",
  "growth_stats": {
    "students": "+12%",
    "courses": "+3",
    "bookings": "-5",
    "revenue": "+18%"
  }
}
```

#### 11. List All Enrollments (Admin Only)
```
GET /api/admin/enrollments/
Authorization: Bearer <admin_token>
Query Parameters:
- status: pending|confirmed|cancelled (optional)
- search: string (optional)
- page: int (optional)

Response (200 OK):
{
  "count": 150,
  "results": [
    {
      "id": 1,
      "user": {
        "id": 5,
        "name": "John Doe",
        "email": "john@example.com"
      },
      "course": {
        "id": 1,
        "title": "Python Full Stack Development"
      },
      "status": "confirmed",
      "enrolled_at": "2024-01-15T10:30:00Z",
      "amount": "45000.00"
    }
  ]
}
```

#### 12. Update Enrollment Status (Admin Only)
```
PATCH /api/admin/enrollments/:id/
Authorization: Bearer <admin_token>
Content-Type: application/json

Request Body:
{
  "status": "confirmed"
}

Response (200 OK):
{
  "id": 1,
  "status": "confirmed",
  "updated_at": "2024-01-15T14:30:00Z"
}
```

#### 13. List All Bookings (Admin Only)
```
GET /api/admin/bookings/
Authorization: Bearer <admin_token>
Query Parameters:
- status: pending|confirmed|cancelled (optional)
- search: string (optional)

Response (200 OK):
{
  "count": 45,
  "results": [
    {
      "id": 1,
      "name": "Alice Johnson",
      "email": "alice@example.com",
      "phone": "+1234567890",
      "course_name": "Python Full Stack",
      "mode": "online",
      "preferred_date": "2024-01-20",
      "preferred_time": "10:00",
      "status": "pending",
      "message": "Interested in learning..."
    }
  ]
}
```

#### 14. Update Booking Status (Admin Only)
```
PATCH /api/admin/bookings/:id/
Authorization: Bearer <admin_token>
Content-Type: application/json

Request Body:
{
  "status": "confirmed"
}

Response (200 OK):
{
  "id": 1,
  "status": "confirmed",
  "updated_at": "2024-01-15T14:30:00Z"
}
```

#### 15. Add New Course (Admin Only)
```
POST /api/admin/courses/
Authorization: Bearer <admin_token>
Content-Type: application/json

Request Body:
{
  "title": "Python Full Stack Development",
  "slug": "python-full-stack",
  "type": "online",
  "duration": "6 Months",
  "level": "beginner_to_advanced",
  "description": "Master Python, Django, React...",
  "detailed_description": "This comprehensive course...",
  "price": "45000.00",
  "topics": ["Python", "Django", "React", "REST APIs"],
  "features": ["Live classes", "Lifetime access", "Projects"],
  "curriculum": [...],
  "prerequisites": ["Basic programming"],
  "what_you_will_learn": [...],
  "instructor_info": "Industry experts..."
}

Response (201 Created):
{
  "id": 7,
  "slug": "python-full-stack",
  "title": "Python Full Stack Development",
  "created_at": "2024-01-15T10:30:00Z"
}
```

#### 16. Update Course (Admin Only)
```
PUT /api/admin/courses/:slug/
Authorization: Bearer <admin_token>
Content-Type: application/json

Request Body:
{
  "title": "Updated Title",
  "price": "50000.00",
  ...
}

Response (200 OK):
{
  "id": 1,
  "slug": "python-full-stack",
  "title": "Updated Title",
  "updated_at": "2024-01-15T14:30:00Z"
}
```

#### 17. Delete Course (Admin Only)
```
DELETE /api/admin/courses/:slug/
Authorization: Bearer <admin_token>

Response (204 No Content)
```

### Course Endpoints

#### 4. List All Courses
```
GET /api/courses/
Query Parameters:
- type: online|offline (optional)
- level: beginner|intermediate|advanced (optional)
- search: string (optional)

Response (200 OK):
{
  "count": 6,
  "results": [
    {
      "id": 1,
      "slug": "python-full-stack",
      "title": "Python Full Stack Development",
      "type": "online",
      "duration": "6 Months",
      "level": "beginner_to_advanced",
      "description": "Master Python, Django, React...",
      "price": "45000.00",
      "rating": "4.8",
      "students_enrolled": 500,
      "topics": ["Python", "Django", "React"],
      "features": [...]
    }
  ]
}
```

#### 5. Get Course by Slug
```
GET /api/courses/<slug>/

Response (200 OK):
{
  "id": 1,
  "slug": "python-full-stack",
  "title": "Python Full Stack Development",
  "type": "online",
  "duration": "6 Months",
  "level": "beginner_to_advanced",
  "description": "Master Python, Django, React...",
  "detailed_description": "This comprehensive Python Full Stack...",
  "price": "45000.00",
  "rating": "4.8",
  "students_enrolled": 500,
  "topics": [...],
  "features": [...],
  "curriculum": [...],
  "prerequisites": [...],
  "what_you_will_learn": [...],
  "certifications": [...],
  "instructor_info": "..."
}
```

### Enrollment Endpoints

#### 6. Create Enrollment
```
POST /api/enrollments/
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "course_id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "preferred_start_date": "2024-02-01",
  "message": "Looking forward to learning"
}

Response (201 Created):
{
  "id": 1,
  "course": {
    "id": 1,
    "title": "Python Full Stack Development",
    "price": "45000.00"
  },
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "status": "pending",
  "enrolled_at": "2024-01-15T10:30:00Z"
}
```

#### 7. List User Enrollments
```
GET /api/enrollments/
Authorization: Bearer <token>

Response (200 OK):
{
  "count": 2,
  "results": [
    {
      "id": 1,
      "course": {
        "id": 1,
        "title": "Python Full Stack Development",
        "slug": "python-full-stack"
      },
      "status": "confirmed",
      "enrolled_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### Booking Endpoints

#### 8. Create Demo Booking
```
POST /api/bookings/
Content-Type: application/json

Request Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "course_name": "Python Full Stack",
  "mode": "online",
  "preferred_date": "2024-01-20",
  "preferred_time": "10:00",
  "message": "Interested in the course"
}

Response (201 Created):
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "course_name": "Python Full Stack",
  "status": "pending",
  "created_at": "2024-01-15T10:30:00Z"
}
```

### Contact Endpoints

#### 9. Submit Contact Form
```
POST /api/contact/
Content-Type: application/json

Request Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "subject": "Course Inquiry",
  "message": "I would like to know more about..."
}

Response (201 Created):
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "status": "new",
  "created_at": "2024-01-15T10:30:00Z"
}
```

## Django Settings Configuration

### settings.py
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'techelite_db',
        'USER': 'postgres',
        'PASSWORD': 'your_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

# JWT Settings
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=7),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=30),
}

# CORS Settings
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  # Vite dev server
    "http://localhost:3000",
    "https://yourdomain.com",
]

# REST Framework Settings
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
}
```

## Required Packages
```
pip install django djangorestframework
pip install djangorestframework-simplejwt
pip install django-cors-headers
pip install psycopg2-binary
pip install pillow
pip install python-decouple
pip install django-allauth  # For Google OAuth
pip install requests  # For API calls
```

## Google OAuth Setup

### 1. Create Google OAuth Credentials
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
5. Add authorized redirect URIs:
   - `http://localhost:8000/api/auth/google/callback/`
   - `https://yourdomain.com/api/auth/google/callback/`
6. Copy Client ID and Client Secret

### 2. Django Settings for Google OAuth
```python
# settings.py

INSTALLED_APPS = [
    ...
    'django.contrib.sites',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google',
]

AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
    'allauth.account.auth_backends.AuthenticationBackend',
]

SITE_ID = 1

SOCIALACCOUNT_PROVIDERS = {
    'google': {
        'SCOPE': [
            'profile',
            'email',
        ],
        'AUTH_PARAMS': {
            'access_type': 'online',
        },
        'APP': {
            'client_id': os.getenv('GOOGLE_CLIENT_ID'),
            'secret': os.getenv('GOOGLE_CLIENT_SECRET'),
            'key': ''
        }
    }
}
```

### 3. Environment Variables for Google OAuth
```
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 4. Google OAuth URLs
```python
# urls.py
from django.urls import path, include

urlpatterns = [
    ...
    path('api/auth/', include('accounts.urls')),
    path('accounts/', include('allauth.urls')),  # For Google OAuth
]
```

## Admin Panel Permissions

### Admin User Model Extension
```python
# accounts/models.py
class User(AbstractUser):
    ...
    is_admin_user = models.BooleanField(default=False)
    admin_role = models.CharField(
        max_length=50,
        choices=[
            ('super_admin', 'Super Admin'),
            ('course_manager', 'Course Manager'),
            ('support_admin', 'Support Admin'),
        ],
        blank=True
    )
    
    class Meta:
        permissions = [
            ('can_manage_courses', 'Can manage courses'),
            ('can_view_enrollments', 'Can view enrollments'),
            ('can_manage_enrollments', 'Can manage enrollments'),
            ('can_view_bookings', 'Can view bookings'),
            ('can_manage_bookings', 'Can manage bookings'),
            ('can_view_analytics', 'Can view analytics'),
        ]
```

### Admin Permission Decorator
```python
# accounts/decorators.py
from functools import wraps
from rest_framework.response import Response
from rest_framework import status

def admin_required(permission=None):
    def decorator(view_func):
        @wraps(view_func)
        def wrapped_view(request, *args, **kwargs):
            if not request.user.is_authenticated:
                return Response(
                    {'error': 'Authentication required'},
                    status=status.HTTP_401_UNAUTHORIZED
                )
            
            if not (request.user.is_staff or request.user.is_admin_user):
                return Response(
                    {'error': 'Admin access required'},
                    status=status.HTTP_403_FORBIDDEN
                )
            
            if permission and not request.user.has_perm(permission):
                return Response(
                    {'error': f'Permission {permission} required'},
                    status=status.HTTP_403_FORBIDDEN
                )
            
            return view_func(request, *args, **kwargs)
        return wrapped_view
    return decorator
```

### Admin Roles & Permissions

#### Super Admin
- Full access to all features
- Can manage other admins
- Access to all API endpoints
- Can add/edit/delete courses
- Can view and manage all enrollments
- Can view and manage all bookings
- Can view analytics and reports
- Can configure system settings

#### Course Manager
- Can add/edit/delete courses
- Can view course analytics
- Cannot manage other admins
- Cannot access user data beyond course enrollments

#### Support Admin
- Can view enrollments and bookings
- Can update enrollment/booking status
- Can respond to contact inquiries
- Cannot add/edit/delete courses
- Cannot access financial data

### Permission Middleware
```python
# accounts/permissions.py
from rest_framework import permissions

class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and 
            (request.user.is_staff or request.user.is_admin_user)
        )

class IsSuperAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and 
            (request.user.is_superuser or request.user.admin_role == 'super_admin')
        )

class CanManageCourses(permissions.BasePermission):
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and 
            request.user.has_perm('accounts.can_manage_courses')
        )
```

## Environment Variables (.env)
```
SECRET_KEY=your-secret-key-here
DEBUG=True
DATABASE_NAME=techelite_db
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password
DATABASE_HOST=localhost
DATABASE_PORT=5432
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ORIGIN_WHITELIST=http://localhost:5173,http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## Running the Backend

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create database
createdb techelite_db

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Load initial course data (optional)
python manage.py loaddata courses.json

# Run development server
python manage.py runserver
```

## Frontend Integration

Update your frontend to use the Django API:

```typescript
// src/app/config/api.ts
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const API_ENDPOINTS = {
  auth: {
    register: '/auth/register/',
    login: '/auth/login/',
    profile: '/auth/profile/',
    google: '/auth/google/',
    google_callback: '/auth/google/callback/',
  },
  courses: {
    list: '/courses/',
    detail: (slug: string) => `/courses/${slug}/`,
  },
  enrollments: {
    create: '/enrollments/',
    list: '/enrollments/',
  },
  bookings: {
    create: '/bookings/',
  },
  contact: {
    create: '/contact/',
  },
  admin: {
    stats: '/admin/stats/',
    enrollments: '/admin/enrollments/',
    update_enrollment: (id: number) => `/admin/enrollments/${id}/`,
    bookings: '/admin/bookings/',
    update_booking: (id: number) => `/admin/bookings/${id}/`,
    courses: '/admin/courses/',
    update_course: (slug: string) => `/admin/courses/${slug}/`,
    delete_course: (slug: string) => `/admin/courses/${slug}/`,
  },
};
```

## Testing APIs

Use Postman or curl to test:

```bash
# Test registration
curl -X POST http://localhost:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","first_name":"Test","last_name":"User"}'

# Test login
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'

# Test courses list
curl http://localhost:8000/api/courses/

# Test course detail
curl http://localhost:8000/api/courses/python-full-stack/
```

## Notes
- All authenticated endpoints require JWT token in Authorization header
- File uploads (profile pictures) should use multipart/form-data
- Implement proper error handling and validation on backend
- Use Django signals for sending email notifications
- Implement payment gateway integration for actual payments
- Add rate limiting for API endpoints
- Use Django's admin panel for content management