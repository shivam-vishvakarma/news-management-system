from django.db import models
from django.contrib.auth.models import User
import datetime

# Create your models here.
class UserTable(models.Model):
    userId = models.IntegerField(primary_key=True)
    username = models.CharField(max_length=50 )
    password = models.CharField(max_length=50)
    name = models.CharField(max_length=50)
    userRoll = models.CharField(max_length=50,)
    email =models.EmailField(max_length=50)

    def __str__(self):
        return self.username
    

class Articls(models.Model):
    articlsId = models.IntegerField(primary_key=True)
    articlsTitle = models.CharField(max_length=150)
    articlsContent = models.TextField()
    publisherId = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    articlsDate = models.DateTimeField()
    

class Comments(models.Model):
    commentId = models.IntegerField(primary_key=True)
    articalId = models.ForeignKey(Articls, on_delete=models.CASCADE)
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    commentContent = models.TextField()
    commentDate = models.DateTimeField()




class Publisher(models.Model):
    PublisherId = models.IntegerField(primary_key=True)
    articlsId = models.ForeignKey(Articls, on_delete=models.CASCADE)
    userNmae = models.CharField(max_length=50 ,null=False)
    password = models.CharField(max_length=50,null=False)
    userRoll = models.CharField(max_length=50,null=False)
    name = models.CharField(max_length=50)
    email =models.EmailField(max_length=50)
