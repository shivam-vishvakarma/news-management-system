from django.shortcuts import render
# from rest_framework.decorators import api_view
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAdminUser, IsAuthenticatedOrReadOnly
from rest_framework.authentication import TokenAuthentication, SessionAuthentication, BasicAuthentication
from .models import User, Article, Comment, Publisher
from .serializers import UserSerializer, ArticleSerializer, CommentSerializer, PublisherSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
# Create your views here.




@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password) 
    if user == None:
        return Response({'error': 'Invalid credentials'}, status=400)
    serializer = UserSerializer(user)
    token, _ = Token.objects.get_or_create(user=user)
    return Response({"token": token.key, "_": _, "user": serializer.data} , status=200)

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]
    authentication_classes = [TokenAuthentication]

class ArticleViewSet(ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    authentication_classes = [TokenAuthentication]


class CommentViewSet(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    authentication_classes = [TokenAuthentication]


class PublisherViewSet(ModelViewSet):
    queryset = Publisher.objects.all()
    serializer_class = PublisherSerializer
    permission_classes = [IsAdminUser]
    authentication_classes = [TokenAuthentication]



# def index(request):
#     return HttpResponse("Hello, world. You're at the polls index.")

