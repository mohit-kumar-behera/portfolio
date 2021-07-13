from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect, Http404, JsonResponse



def home(request):
	return render(request, 'home/home.html')


def contact(request):
	return render(request, 'home/contact.html') 


def about(request):
	return render(request, 'home/about.html')



from django.contrib.auth.models import User
def fetch_mohit(request):
	mohit = User.objects.first()

	obj = {
		'firstName': mohit.first_name,
		'lastName': mohit.last_name,

		'contact': {
			'phone': '9861013399',
			'email': mohit.email
		}
	}
	return JsonResponse(obj)
