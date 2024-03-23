from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from .views import *

from .import views


routers = routers.DefaultRouter()
routers.register('users', views.UserViewSet)
routers.register('articles', views.ArticleViewSet)
routers.register('comments', views.CommentViewSet)
routers.register('publishers', views.PublisherViewSet)

urlpatterns = [
    path('', include(routers.urls)),
    path('login/', views.login, name='login')
    

]
urlpatterns += routers.urls

