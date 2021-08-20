from django.shortcuts import render

def error_400(request, exception=None):
	context = {
		'error':{
			'code':400,
			'message':'Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.'
		}
	}
	return render(request, 'error/error.html', context)


def error_403(request, exception=None):
	context = {
		'error':{
			'code':403,
			'message':'The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401, the client\'s identity is known to the server.'
		}
	}
	return render(request, 'error/error.html', context)


def error_404(request, exception=None):
	context = {
		'error':{
			'code':404,
			'message':'The server can not find the requested resource. In the browser, this means the URL is not recognized. In an API, this can also mean that the endpoint is valid but the resource itself does not exist. Servers may also send this response instead of 403 to hide the existence of a resource from an unauthorized client. This response code is probably the most famous one due to its frequent occurrence on the web.'
		}
	}
	return render(request, 'error/error.html', context)


def error_500(request, exception=None):
	context = {
		'error':{
			'code':404,
			'message':'The server can not find the requested resource. In the browser, this means the URL is not recognized. In an API, this can also mean that the endpoint is valid but the resource itself does not exist. Servers may also send this response instead of 403 to hide the existence of a resource from an unauthorized client. This response code is probably the most famous one due to its frequent occurrence on the web.'
		}
	}
	return render(request, 'error/error.html', context)



