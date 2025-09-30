from django.shortcuts import render
from .models import Project, Achievement


def index(request):
    return render(request, 'portfolio/index.html')


def projects(request):
    projects = Project.objects.all()
    return render(request, 'portfolio/projects.html', {'projects': projects})


def achievements(request):
    achievements = Achievement.objects.all()
    return render(request, 'portfolio/achievements.html', {'achievements': achievements})
