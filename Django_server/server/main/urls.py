from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from . import views


router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'articles', views.ArticleViewSet)
router.register(r'comments', views.CommentViewSet)
router.register(r'publishers', views.PublisherViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', views.login, name='login'),
    path('register/', views.register, name='register'),
    path('categories/<slug:category>', views.categories, name='categories')
    

]
urlpatterns += router.urls

