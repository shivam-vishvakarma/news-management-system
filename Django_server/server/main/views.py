from django.db.models import Q
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAdminUser, IsAuthenticatedOrReadOnly
from .permissions import IsMeOrReadOnly, IsPublisherOrReadOnly, IsAuthenticated, IsMeOrPublisher, IsMe, CommentIsMeOrPublisher
from rest_framework.authentication import TokenAuthentication, BasicAuthentication
from .models import User, Article, Comment, Publisher
from .serializers import UserSerializer, ArticleSerializer, CommentSerializer, PublisherSerializer
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

# Create your views here.

@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = User.objects.get(username=username)
    if not user:
        return Response({'error': 'Invalid credentials'}, status=400)
    if not user.check_password(password):
        return Response({'error': 'Wrong password'}, status=400)
    if user.user_roll == 'publisher' and not Publisher.objects.get(user=user).approved:
        return Response({'error': 'Publisher not approved'}, status=400)
    if not user.is_active:
        return Response({'error': 'User is blocked'}, status=400)
    serializer = UserSerializer(user)
    data=serializer.data
    if user.is_superuser:
        data.update({'user_roll': 'admin'})
    token, _ = Token.objects.get_or_create(user=user)
    return Response({"token": token.key, "user": data} , status=200)

@api_view(['POST'])
def register(request):
    request.data['user_roll'] = 'user'
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        user.set_password(request.data['password'])
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
    permission_classes = [IsAuthenticated, IsMe]
    authentication_classes = [TokenAuthentication]

    @action(detail=False, methods=['GET'])
    def me(self, request):
        user = request.user
        serializer = UserSerializer(user)
        data = serializer.data
        if user.is_superuser:
            data.update({'user_roll': 'admin'})
        return Response(data, status=201)

    @action(detail=False, methods=['POST'])
    def logout(self,request):
        Token.objects.get(key=request.auth).delete()
        return Response({'message': 'Logged out'}, status=200)

class CommentViewSet(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated, CommentIsMeOrPublisher]
    authentication_classes = [TokenAuthentication]

    @action(detail=False, methods=['GET'], permission_classes=[IsAuthenticated], url_path='publisher-comments')
    def user_comments(self, request):
        comments = Comment.objects.filter(articalId__publisherId__user = request.user.id).order_by("-commentDate")
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data, status=200)

class ArticleViewSet(ModelViewSet):
    queryset = Article.objects.all().order_by("-articleDate")
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsMeOrReadOnly]
    authentication_classes = [TokenAuthentication]

    def create(self, request):
        request.data['publisherId'] = Publisher.objects.get(user=request.user).id
        request.data['articleTitle'] = " ".join(request.data['title'].split())
        request.data['articleContent'] = " ".join(request.data['content'].split())
        request.data['tag'] = " ".join(request.data['tag'].split())
        serializer = ArticleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    @action(detail=True, methods=['GET', 'POST'])
    def comments(self, request, pk=None):
        if request.method == 'GET':
            comments = Comment.objects.filter(articalId=pk).order_by("-commentDate")
            serializer = CommentSerializer(comments, many=True)
            return Response(serializer.data, status=200)
        elif request.method == 'POST':
            request.data['articalId'] = pk
            request.data['userId'] = request.user.id
            serializer = CommentSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=201)
            return Response(serializer.errors, status=400)

    @action(detail=False, methods=['GET'])
    def search(self, request):
        search = request.query_params.get('q')
        articles = Article.objects.filter(Q(articleTitle__icontains=search) | Q(articleContent__icontains=search) | Q(tag__icontains = search)).order_by("-articleDate")
        serializer = ArticleSerializer(articles, many=True)
        return Response(serializer.data, status=200)

    @action(detail=False, methods=['GET'], permission_classes=[IsAuthenticated])
    def publisher_articles(self, request):
        articles = Article.objects.filter(publisherId=Publisher.objects.get(user=request.user).id).order_by("-articleDate")
        serializer = ArticleSerializer(articles, many=True)
        return Response(serializer.data, status=200)

    @action(detail=True, methods=['POST'], permission_classes=[IsMeOrPublisher])
    def add_tag(self, request, pk=None):
        article = Article.objects.get(id=pk)
        article.tag += ' ' + request.data['tag']
        article.save()
        return Response({'message': 'Tag added'}, status=200)

    @action(detail=True, methods=['PUT'], permission_classes=[IsMeOrPublisher])
    def remove_tag(self, request, pk=None):
        article = Article.objects.get(id=pk)
        article.tag = article.tag.replace(request.data['tag'], '')
        article.tag = ' '.join(article.tag.split())
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

    @action(detail=False, methods=['GET'], url_path='headlines')
    def headlines(self, request):
        articles = Article.objects.filter(tag__icontains='headline')
        serializer = ArticleSerializer(articles, many=True)
        return Response(serializer.data, status=200)

    @action(detail=False, methods=['GET'], url_path='trending')
    def trending(self, request):
        articles = Article.objects.filter(tag__icontains='trending')
        serializer = ArticleSerializer(articles, many=True)
        return Response(serializer.data, status=200)
    
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
    permission_classes = [IsAuthenticated, IsPublisherOrReadOnly]
    authentication_classes = [TokenAuthentication]

    def create(self, request):
        user = request.user
        request.data['user'] = user.id
        request.data['approved'] = False
        serializer = PublisherSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=user)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    @action(detail=False, methods=['GET'], permission_classes=[IsAuthenticated])
    def is_applied(self, request):
        user = request.user
        if Publisher.objects.filter(user=user).exists():
            return Response({'is_applied': True}, status=200)
        return Response({'is_applied': False}, status=200)
    
    @action(detail=True, methods=['PUT'], permission_classes=[IsAdminUser])
    def approve(self, request, pk=None):
        user = User.objects.get(id=Publisher.objects.get(id=pk).user.id)
        user.user_roll = 'publisher'
        publisher = Publisher.objects.get(id=pk)
        publisher.approved = True
        user.save()
        publisher.save()
        return Response({'message': 'Publisher approved'}, status=200)

    @action(detail=True, methods=['PUT'], permission_classes=[IsAdminUser])
    def revoke_publisher(self, request, pk=None):
        user = User.objects.get(id=Publisher.objects.get(id=pk).user.id)
        user.user_roll = 'user'
        user.save()
        publisher = Publisher.objects.get(id=pk)
        publisher.approved = False
        publisher.save()
        return Response({'message': 'Publisher unapproved'}, status=200)

    @action(detail=False, methods=['GET'])
    def approved_publishers(self, request):
        publishers = Publisher.objects.filter(approved=True)
        serializer = PublisherSerializer(publishers, many=True)
        return Response(serializer.data, status=200)

    @action(detail=False, methods=['GET'], permission_classes=[IsAdminUser])
    def unapproved_publishers(self, request):
        publishers = Publisher.objects.filter(approved=False).order_by('-id')
        serializer = PublisherSerializer(publishers, many=True)
        return Response(serializer.data, status=200)

    @action(detail=True, methods=['GET'])
    def publisher_articles_count(self, request, pk=None):
        articles = Article.objects.filter(publisherId=pk)
        count = articles.count()
        return Response({'count': count}, status=200)