from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect, Http404, JsonResponse


def contact_view(request):
    return render(request, 'contact/contact.html')

