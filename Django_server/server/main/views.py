from django.db.models import Q
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAdminUser, IsAuthenticatedOrReadOnly
from .permissions import IsMeOrReadOnly, IsPublisherOrReadOnly
from rest_framework.authentication import TokenAuthentication, SessionAuthentication, BasicAuthentication
from .models import User, Article, Comment, Publisher
from .serializers import UserSerializer, ArticleSerializer, CommentSerializer, PublisherSerializer
from rest_framework.decorators import api_view, action
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
    return Response({"token": token.key, "user": serializer.data} , status=200)

@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        user.set_password(user.password)
        user.save()
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"token": token.key, "user": serializer.data}, status=201)
    return Response(serializer.errors, status=400)

@api_view(['GET'])
def categories(request , category):
    articles = Article.objects.filter(tag__icontains=category)
    serializer = ArticleSerializer(articles, many=True)
    return Response(serializer.data, status=200)

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser, IsMeOrReadOnly]
    authentication_classes = [TokenAuthentication]

class CommentViewSet(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsMeOrReadOnly]
    authentication_classes = [TokenAuthentication]
    method = ['PUT', 'DELETE']

class ArticleViewSet(ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsMeOrReadOnly]
    authentication_classes = [TokenAuthentication]

    def create(self, request):
        request.data['publisherId'] = Publisher.objects.get(user=request.user).id
        serializer = ArticleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    @action(detail=True, methods=['GET', 'POST'])
    def comments(self, request, pk=None):
        if request.method == 'GET':
            comments = Comment.objects.filter(articalId=pk)
            serializer = CommentSerializer(comments, many=True)
            return Response(serializer.data, status=200)
        else:
            request.data['articalId'] = pk
            request.data['userId'] = request.user.id
            serializer = CommentSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=201)
            return Response(serializer.errors, status=400)
    
    @action(detail=False, methods=['GET'])
    def search(self, request):
        search = request.query_params.get('search')
        articles = Article.objects.filter(Q(articlsTitle__icontains=search) | Q(articlsContent__icontains=search)).order_by('-articlsDate')
        serializer = ArticleSerializer(articles, many=True)
        return Response(serializer.data, status=200)
    
    @action(detail=False, methods=['GET'])
    def publisher_articles(self, request):
        articles = Article.objects.filter(publisherId=Publisher.objects.get(user=request.user).id)
        serializer = ArticleSerializer(articles, many=True)
        return Response(serializer.data, status=200)
    
    @action(detail=True, methods=['POST'])
    def add_tag(self, request, pk=None):
        article = Article.objects.get(id=pk)
        article.tag += request.data['tag']
        article.save()
        return Response({'message': 'Tag added'}, status=200)
    
    @action(detail=True, methods=['PUT'])
    def remove_tag(self, request, pk=None):
        article = Article.objects.get(id=pk)
        article.tag = article.tag.replace(request.data['tag'], '')
        article.save()
        return Response({'message': 'Tag removed'}, status=200)
    
    @action(detail=True, methods=['PUT'])
    def update_tag(self, request, pk=None):
        article = Article.objects.get(id=pk)
        article.tag = request.data['tag']
        article.save()
        return Response({'message': 'Tag updated'}, status=200)
    
    @action(detail=True, methods=['DELETE'])
    def delete_tag(self, request, pk=None):
        article = Article.objects.get(id=pk)
        article.tag = ''
        article.save()
        return Response({'message': 'Tag deleted'}, status=200)
    
    ############ for article approval ##############

    # @action(detail=False, methods=['GET'])
    # def approved_articles(self, request):
    #     articles = Article.objects.filter(publisherId=Publisher.objects.get(user=request.user).id, approved=True)
    #     serializer = ArticleSerializer(articles, many=True)
    #     return Response(serializer.data, status=200)
    
    # @action(detail=False, methods=['GET'])
    # def unapproved_articles(self, request):
    #     articles = Article.objects.filter(publisherId=Publisher.objects.get(user=request.user).id, approved=False)
    #     serializer = ArticleSerializer(articles, many=True)
    #     return Response(serializer.data, status=200)
    
    # @action(detail=True, methods=['PUT'])
    # def approve_article(self, request, pk=None):
    #     article = Article.objects.get(id=pk)
    #     article.approved = True
    #     article.save()
    #     return Response({'message': 'Article approved'}, status=200)
    
    # @action(detail=True, methods=['PUT'])
    # def unapprove_article(self, request, pk=None):
    #     article = Article.objects.get(id=pk)
    #     article.approved = False
    #     article.save()
    #     return Response({'message': 'Article unapproved'}, status=200)

    ###############################################

class PublisherViewSet(ModelViewSet):
    queryset = Publisher.objects.all()
    serializer_class = PublisherSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsPublisherOrReadOnly]
    authentication_classes = [TokenAuthentication]

    def create(self, request):
        user = request.user
        if user.user_roll == 'publisher':
            serializer = PublisherSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(user=user)
                return Response(serializer.data, status=201)
            return Response(serializer.errors, status=400)
        return Response({'error': 'You are not a publisher'}, status=400)