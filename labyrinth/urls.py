from django.urls import path
from . import views
app_name = 'labyrinth'

urlpatterns = [
    path('previewMaze/', views.upload_maze, name='previewMaz'),
    path('preview/', views.preview_maze, name='preview'),
    path('upload', views.upload, name='index'),
    path('play/', views.play, name='play'),

    # Isaac
    path ('character', views.character, name='character'),
]
