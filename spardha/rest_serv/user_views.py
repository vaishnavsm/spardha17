from django.shortcuts import render
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
# from .utils import *

@api_view(['GET','POST'])
@authentication_classes([])
@permission_classes([])
@csrf_exempt
def RegisterView(request):
    if(request.method == 'POST'):
        data = JSONParser().parse(request)
        #TODO Validate Data
        college = College.objects.filter(CollegeID=data['CollegeID'])
        if( not college.exists()):
            return HttpResponse(json.dumps({"detail":"college_invalid"}), status=400, content_type='application/json')
        college = college.first()
        serializer = PlayerSerializer(data=data)
        if(not serializer.is_valid()):
            return JsonResponse(serializer.errors, status=400)
        serializer.save()
        player = Player.objects.get(Email=data['Email'])
        player = Player.Register(player=player, password=data['Password'])
        if(player is None):
            return HttpResponse(json.dumps({"detail":"user_creation_failed"}), status=400, content_type='application/json')
        player.CollegeRef = college;
        player.save()
        return JsonResponse(PlayerSerializer(player).data, status=201)
    else:
        return HttpResponse(json.dumps({"error":"true","detail":"unsupported_request"}), content_type="application/json", status=400)
    return HttpResponse(json.dumps({"error":"true","detail":"bad_request"}), content_type="application/json", status=400)

@api_view(['GET','POST'])
@authentication_classes([])
@permission_classes([])
@csrf_exempt
def LoginView(request):
    if(request.method=='POST'):
        data = JSONParser().parse(request)
        user = authenticate(username=data['Email'],password=data['Password'])
        if(user is None):
            return HttpResponse(json.dumps({"detail":"login_failed"}), status=400, content_type='application/json')
        try:
            token=Token.objects.get(user=user)
        except Token.DoesNotExist:
            token = Token.objects.create(user=user)
            token.save()
        return HttpResponse(json.dumps({"token":token.key}), status=200, content_type='application/json')
    else:
        HttpResponse(json.dumps({"error":"true","detail":"unsupported_request"}), content_type="application/json", status=400)
    return HttpResponse(json.dumps({"error":"true","detail":"bad_request"}), content_type="application/json", status=400)
