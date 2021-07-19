from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect, Http404, JsonResponse



def redirect_to_all_projects(request):
	return redirect('project:all_projects')


def all_projects(request):
	return render(request, 'project/project.html')


def projects_by_tag(request, tag):
	return render(request, 'project/project.html')


def view_product(request, title):
	return render(request, 'project/v-project.html')