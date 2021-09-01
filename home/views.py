from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect, Http404, JsonResponse


from home.user import get_user
from home.models import ProfileImage

def home_view(request):
	user, profile = get_user()
	context = {
		'profile': profile
	}
	profile_image = ProfileImage.objects.get(profile=profile)
	context['img'] = profile_image
	return render(request, 'home/home.html', context)

