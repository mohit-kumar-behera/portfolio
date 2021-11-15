from django.shortcuts import render, redirect
from project.models import Project

def redirect_to_all_projects(request):
	return redirect('project:all_projects')


def all_projects(request):
	return render(request, 'project/project.html')


def view_project(request, slug):
	try:
		project_meta = Project.objects.all().meta_info(slug)
		project_meta['page_url'] = request.path_info
	except Project.DoesNotExist:
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