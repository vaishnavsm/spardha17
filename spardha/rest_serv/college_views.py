from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from .models import *
from .serializers import *
import json
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from django.utils.six import BytesIO


@api_view(['GET','POST'])
@authentication_classes([])
@permission_classes([])
@csrf_exempt
def CollegeView(request):
    if request.method == 'GET':
        colleges = College.objects.all()
        serializer = CollegeSerializer(colleges, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = CollegeSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    return HttpResponse(json.dumps({"error":"true","detail":"bad_request"}), status=400, content_type="application/json")
    