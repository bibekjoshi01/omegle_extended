from django.shortcuts import render


def BaseDocTemplate(request):
    return render(request, 'base.html')

