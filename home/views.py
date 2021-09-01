from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect, Http404, JsonResponse


from home.user import get_user, get_profile
from home.models import ProfileImage

def home_view(request):
	profile = get_profile(user=get_user())
	profile_image = ProfileImage.objects.get(profile=profile)
	context = {
		'profile': profile,
		'img': profile_image
	}
	return render(request, 'home/home.html', context)

