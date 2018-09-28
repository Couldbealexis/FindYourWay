from django.urls import path
from . import views
app_name = 'labyrinth'

urlpatterns = [
    path('', views.index, name='index'),
    path('upload', views.upload, name='upload'),
    path('character', views.character, name='character'),
    path('uploadMaze/', views.upload_maze, name='uploadMaze'),
    path('preview/', views.preview_maze, name='preview'),
]
