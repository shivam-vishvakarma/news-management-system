from django.db import models
from django.contrib.auth.models import AbstractUser
import datetime

# Create your models here.
class User(AbstractUser):
    user_roll = models.CharField(max_length=50,)
    email =models.EmailField(max_length=50)
    
    class Meta(AbstractUser.Meta):
        swappable = "AUTH_USER_MODEL"

    def __str__(self):
        return self.username + " and roll  " + self.user_roll
    
    

class Publisher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    publisherName = models.CharField(max_length=150)
    city = models.CharField(max_length=150)
    country = models.CharField(max_length=150)
    phone = models.CharField(max_length=150)

class Article(models.Model):
    articlsTitle = models.CharField(max_length=150)
    articlsContent = models.TextField()
    publisherId = models.ForeignKey(Publisher, on_delete=models.SET_NULL, null=True)
    articlsDate = models.DateTimeField(default=datetime.datetime.now())

class Comment(models.Model):
    articalId = models.ForeignKey(Article, on_delete=models.CASCADE)
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    commentContent = models.TextField()
    commentDate = models.DateTimeField( default=datetime.datetime.now())
    



    