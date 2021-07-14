from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect, Http404, JsonResponse



def redirect_to_all_projects(request):
	return redirect('project:all_projects')


def all_projects(request):
	return render(request, 'project/project.html')
