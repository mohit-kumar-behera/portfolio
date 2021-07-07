from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect, Http404



def home(request):
	return render(request, 'home/home.html')


def contact(request):
	return render(request, 'home/contact.html') 
