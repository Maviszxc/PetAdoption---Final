from django.http import HttpRequest
from django.shortcuts import render

import requests

# Create your views here.

def home(request):

    return render(request, 'home/index.html')

def shop(request):

    return render(request, 'home/shop.html')

def pet(request):

    return render(request, 'home/pet.html')

def login(request):

    return render(request, 'home/login.html')


def hint(request):

    return render(request, 'home/hint.html')

def adminDashboard(request):

    return render(request, 'home/adminDashboard.html')

def edit(request):

    return render(request, 'home/edit.html')