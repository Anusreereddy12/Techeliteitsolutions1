from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User, Contact, Course
from .serializers import UserSerializer, ContactSerializer, CourseSerializer
from .models import Contact

@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    try:
        user = User.objects.get(email=email, password=password)
        return Response({"message":"Login successful"})
    except:
        return Response({"error":"Invalid credentials"})


@api_view(['POST'])
def contact(request):
    serializer = ContactSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['GET'])
def online_courses(request):
    courses = Course.objects.filter(type='online')
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def offline_courses(request):
    courses = Course.objects.filter(type='offline')
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)