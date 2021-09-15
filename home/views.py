from django.shortcuts import render
from home.user import get_user, get_profile

def home_view(request):
	profile = get_profile(user=get_user())
	context = {'profile': profile}
	return render(request, 'home/home.html', context)

