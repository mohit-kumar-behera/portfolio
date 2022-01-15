from django.shortcuts import render, redirect
import project
from project.models import Project

def redirect_to_portfolio(request):
	return redirect('project:my_portfolio')


def my_portfolio(request):
	return render(request, 'project/project.html')


def all_projects(request):
	projects = Project.objects.all()
	context = {'projects': projects} 
	return render(request, 'project/project-all.html', context)


def view_project(request, slug):
	try:
		project_meta = Project.objects.all().meta_info(slug)
		if not project_meta:
			raise Exception("Content not found for this search")
		project_meta['page_url'] = request.path_info
	except:
		context = {
		'error':{
			'code':404,
			'message':'Sorry! We couldn\'t find any project with the mentioned title'
			}
		}
		return render(request, 'error/error.html', context, status=404)
	else:
		context = {'meta': project_meta}
		return render(request, 'project/v-project.html', context)