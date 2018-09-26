from django.urls import path
from . import views
app_name = 'labyrinth'

urlpatterns = [
    path('', views.index, name='index'),
    path('uploadMaze/', views.upload_maze, name='upload'),
    path('preview/', views.preview_maze, name='preview'),
]