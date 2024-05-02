from rest_framework import serializers
from .models import User, Article, Comment, Publisher

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','first_name','last_name','email','user_roll']
       
class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username','first_name','last_name','user_roll']

class PublisherSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Publisher
        fields = '__all__'

class PublisherDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publisher
        fields = ['id', 'publisherName']

class ArticleSerializer(serializers.ModelSerializer):
    publisher = PublisherDetailSerializer(read_only=True, source='publisherId')
    class Meta:
        model = Article
        fields = '__all__'

    def createTag(self, val):
        if val == None:
            return 'Newsy'
        else:
            
            return val.__contains__('Newsy') if val else val + ' Newsy'
       
class CommentSerializer(serializers.ModelSerializer):
    user = UserDetailSerializer(read_only=True, source='userId')
    class Meta:
        model = Comment
        fields = '__all__'
