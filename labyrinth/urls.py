from django.urls import path
from . import views
app_name = 'labyrinth'

urlpatterns = [
    path('', views.index, name='index'),
    path('previewMaze/', views.upload_maze, name='upload'),
    path('preview/', views.preview_maze, name='preview'),
    path('upload', views.upload, name='upload'),
    path('play/', views.play, name='play'),
]