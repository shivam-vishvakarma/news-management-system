from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    user_roll = models.CharField(choices=[('user','user'),('publisher','publisher')], max_length=15 , default='user')
    email =models.EmailField(max_length=50)
    
    class Meta(AbstractUser.Meta):
        swappable = "AUTH_USER_MODEL"

    def __str__(self):
        return self.username + " and roll  " + self.user_roll

class Publisher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    publisherName = models.CharField(max_length=150, unique=True, blank=False)
    city = models.CharField(max_length=150, blank=False)
    country = models.CharField(max_length=150, blank=False)
    phone = models.CharField(max_length=150, blank=False)
    approved = models.BooleanField(default=False)

class Article(models.Model):
    articleTitle = models.CharField(max_length=150)
    articleContent = models.TextField()
    publisherId = models.ForeignKey(Publisher, on_delete=models.SET_NULL, null=True)
    articleDate = models.DateTimeField(auto_now=True, editable=False)
    tag= models.CharField(max_length=300 , blank=True , null=True, default='Newsy')

class Comment(models.Model):
    articalId = models.ForeignKey(Article, on_delete=models.CASCADE)
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    commentContent = models.TextField()
    commentDate = models.DateTimeField(auto_now=True, editable=False)