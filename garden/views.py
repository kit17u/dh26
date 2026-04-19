from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.template import loader
from django.contrib.auth.decorators import login_required
from django.core import serializers
from django.contrib.auth.forms import UserCreationForm
from .forms import CustomUserCreationForm
from django.db.models import Sum

import random
from .models import Data, Plant

MODEL_NUMBER = 4

@login_required
def index(request):
    template = loader.get_template('index.html')
    context = {}
    return HttpResponse(template.render(context, request))

@login_required
def data(request):
    print(request)
    # Get data
    value = int(request.GET.get('value'))

    if(not value):
        return HttpResponse("Bad request", status=400)

    # Store data
    new_data = Data(
        user=request.user,
        value=value
    )
    new_data.save()

    # Re-calculate plants
    water_plants(request.user, value)

    return HttpResponse("Data stored", status=200)

@login_required
def garden(request):
    # Get user's plants from database
    plants = Plant.objects.filter(user=request.user)
    data = Data.objects.filter(user=request.user)
    dataToday = Data.objects.filter(user=request.user)
    total = Data.objects.filter(user=request.user).aggregate(Sum('value'))['value__sum']
    return JsonResponse({
        "intakeToday": total,
        "data": serializers.serialize("json", data),
        "plants": serializers.serialize("json", plants),
    })

def water_plants(user, value):
    # First, generate some new plants
    for i in range(value//10):
        generate_plant(user)

    plants = Plant.objects.filter(user=user)

    # Then update their scales:
    for plant in plants:
        plant.scale += 0.5 + random.random()*0.1
        plant.scale = min(plant.scale, 1)
        plant.save()
        print(plant)

def generate_plant(user):
    newPlant = Plant(
        user = user,
        scale = 0,
        x = random.random(),
        y = random.random(),
        plant_model = int(random.random()*MODEL_NUMBER)
    )
    newPlant.save()

def register(request):
    if request.method == "POST":
        form =  CustomUserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("login")
    else:
        form = CustomUserCreationForm()

    return render(request, "register.html", {"form": form})