from django.db import models

response = {
    "code":'',
    "data":'',
    "message":''
}

def clean_response():
    response['code'] = ''
    response['message'] = ''
    response['data'] = ''

class Land:

    def __init__(self, id, name = "", color="", image=""):
        self.id = id
        self.name = name
        self.color = color
        self.image = image

    def __str__(self):
        return self.name

    def info(self):
        return { "id" : self.id, "name" : self.name, "color": self.color, "image": self.image }


