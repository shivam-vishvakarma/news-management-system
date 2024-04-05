from rest_framework import serializers
from .models import User, Article, Comment, Publisher



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','first_name','last_name','user_roll','email']


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'



class PublisherSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Publisher
        fields = '__all__'