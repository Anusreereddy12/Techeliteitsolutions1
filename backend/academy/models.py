from django.db import models

class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=200)

    def __str__(self):
        return self.email
    
class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()

class Course(models.Model):
    COURSE_TYPE = [
        ('online','Online'),
        ('offline','Offline')
    ]

    name = models.CharField(max_length=200)
    type = models.CharField(max_length=10, choices=COURSE_TYPE)