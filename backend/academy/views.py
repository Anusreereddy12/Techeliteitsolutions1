import uuid
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from django.contrib.auth.models import User as DjangoUser
from .models import Contact
from .serializers import ContactSerializer

_TOKENS = {}

@api_view(['POST'])
def register(request):
    name     = request.data.get('name', '')
    email    = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({"error": "Email and password are required"}, status=status.HTTP_400_BAD_REQUEST)

    if DjangoUser.objects.filter(email=email).exists():
        return Response({"error": "Email already registered"}, status=status.HTTP_400_BAD_REQUEST)

    user = DjangoUser.objects.create_user(
        username=email,
        email=email,
        password=password,
        first_name=name,
    )

    return Response({
        "message": "Registered successfully",
        "user": {
            "id":    user.id,
            "name":  user.get_full_name() or name,
            "email": user.email,
        }
    }, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def login(request):
    email    = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({"error": "Email and password required"}, status=status.HTTP_400_BAD_REQUEST)

    # Use filter().first() to avoid MultipleObjectsReturned error
    # when multiple users share the same email (picks the first match)
    django_user = DjangoUser.objects.filter(email=email).first()

    if django_user is None:
        return Response({"error": "No account found with this email"}, status=status.HTTP_401_UNAUTHORIZED)

    # Authenticate using the actual username (not email)
    user = authenticate(username=django_user.username, password=password)

    if user is None:
        return Response({"error": "Incorrect password"}, status=status.HTTP_401_UNAUTHORIZED)

    token = str(uuid.uuid4())
    _TOKENS[token] = user.id

    return Response({
        "token": token,
        "user": {
            "id":           user.id,
            "name":         user.get_full_name() or user.username,
            "email":        user.email,
            "is_staff":     user.is_staff,
            "is_admin":     user.is_staff,
            "is_superuser": user.is_superuser,
        }
    })


@api_view(['POST'])
def contact(request):
    serializer = ContactSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)