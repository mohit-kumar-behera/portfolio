from django.shortcuts import render, redirect


def redirect_to_all_projects(request):
	return redirect('project:all_projects')


def all_projects(request):
	return render(request, 'project/project.html')


def view_project(request, title):
	return render(request, 'project/v-project.html')