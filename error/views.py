from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseRedirect, Http404, JsonResponse


def error_page(request):
    return render(request, 'error/error.html')