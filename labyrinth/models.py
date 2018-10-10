from django.db import models
from django import forms

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

    def __init__(self, id, color="808080", image=""):
        self.id = id
        self.name = str(id)
        self.color = color
        self.image = image

    def __str__(self):
        return self.name

    def info(self):
        return { "id" : self.id, "name" : self.name, "color": self.color, "image": self.image }


class UploadFileForm(forms.Form):
    title = forms.CharField(max_length=50)
    archive = forms.FileField()
