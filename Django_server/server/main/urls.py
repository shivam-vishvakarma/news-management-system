from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from . import views


routers = routers.DefaultRouter()
routers.register('users', views.UserViewSet)
routers.register('articles', views.ArticleViewSet)
routers.register('comments', views.CommentViewSet)
routers.register('publishers', views.PublisherViewSet)

urlpatterns = [
    path('', include(routers.urls)),
    path('login/', views.login, name='login'),
    path('register/', views.register, name='register'),
    path('categories/<slug:category>', views.categories, name='categories')
    

]
urlpatterns += routers.urls

