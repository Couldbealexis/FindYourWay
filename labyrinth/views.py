from django.shortcuts import render, render_to_response
from django.http import HttpResponse, HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt
import json
import decimal
from .models import *
from django.contrib.staticfiles.templatetags.staticfiles import static


def handle_file(file):
    map = []
    lengths = []
    clean_response()
    for line in file:
        for word in line.split():
            my_word = str(word)[2:-1]
            arr = my_word.split(',')
            for a in arr:
                try:
                    float(a)
                except ValueError:
                    response['code'] = 400
                    response['message'] = "All lines must have same length"
                    return response
            map.append(arr)
            if not lengths.__contains__(len(arr)):
                if len(lengths) > 0:
                    response['code'] = 400
                    response['message'] = "All lines must have same length"
                    return response
                lengths.append(len(arr))
    response['code'] = 200
    response['data'] = maze_properties(map)
    return response


def maze_properties(map):
    maze = []
    lands = []
    auxLands = []
    for line in map:
        maze_hallway = []
        for land in line:
            id = str(round(float(land),2))
            land = Land(id)
            maze_hallway.append(land.id)
            if land.id not in auxLands:
                auxLands.append(land.id)
                lands.append(land.info())
        maze.append(maze_hallway)

    data = {
        "maze" : maze,
        "lands" :  lands
    }
    return data


@csrf_exempt
def index(request):
    template = './labyrinth/upload.html'
    data = {"javascript_vars" : {
        "message": "",
        "error": "0"
    }}
    return render(request, template, context=data)


@csrf_exempt
def upload(request):
    template = './labyrinth/upload.html'
    data = {"javascript_vars": {
        "message": "request must be in POST method",
        "error": "0"
    }}
    return render(request, template, context=data)


@csrf_exempt
def upload_maze(request):
    template = './labyrinth/error.html'
    data = {
            "message": "request must be in POST method",
            "error": "1"
           }
    if request.method == 'POST':
        archive = request.FILES['archive']
        if archive.name.endswith('.txt'):
            res = handle_file(archive)
            if res['data']:
                print('on data')
                data = {
                        "data" : res['data']
                       }
                template = './labyrinth/preview.html'
            else:
                print('no data')
                data = {
                        "message": res['message'],
                        "error": "1"
                       }
        else:
            print('no txt')
            data = {
                    "message": "archive must be a .txt",
                    "error": "1"
                   }
    print(data)
    print(template)

    return render(request, template, context=data)


@csrf_exempt
def preview_maze(request):

    # Provitional for test
    data = """0,1,2,3,4,5.5555
1,1,1,1,1,1
1,1.9999,1,1,2,2
2,2.66946,2,1,1,1
1,1.1499,1,1,1,1
0,0,0,0,0,0
3,3,3,3,3,3"""
#     data = """0,1,2,3,4,5.5555,6,7,8,9,10,11,12,13,14,15
# 0,1,2,3,4,5.5555,6,7,8,9,10,11,12,13,14,15
# 0,1,2,3,4,5.5555,6,7,8,9,10,11,12,13,14,15
# 0,1,2,3,4,5.5555,6,7,8,9,10,11,12,13,14,15
# 0,1,2,3,4,5.5555,6,7,8,9,10,11,12,13,14,15
# 0,1,2,3,4,5.5555,6,7,8,9,10,11,12,13,14,15
# 0,1,2,3,4,5.5555,6,7,8,9,10,11,12,13,14,15"""
    lines = data.splitlines()
    maze = []
    for line in lines:
        arr = line.split(',')
        maze.append(arr)

    context = maze_properties(maze)

    return render(request, './labyrinth/preview.html', context=context )


@csrf_exempt
def play(request):
    data = """0,1,2,3,4,5.5555
1,1,1,1,1,1
1,1.9999,1,1,2,2
2,2.66946,2,1,1,1
1,1.1499,1,1,1,1
0,0,0,0,0,0
3,3,3,3,3,3"""
    lines = data.splitlines()
    maze = []
    for line in lines:
        arr = line.split(',')
        maze.append(arr)

    context = maze_properties(maze)

    return render(request, './labyrinth/play.html', context=context)
