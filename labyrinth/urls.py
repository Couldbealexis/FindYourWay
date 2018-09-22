from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='upload'),
    path('uploadMaze/', views.upload_maze, name='upload'),

]