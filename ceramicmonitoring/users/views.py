from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ProfileSerializer, UpdateUserSerializer
from .models import Profile
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
# Create your views here.


class ProfileViewSet(viewsets.ViewSet):
    # def list(self, request):
        # profiles = Profile.objects.all()
        # users = User.objects.all()
        # p_serializer = ProfileSerializer(profiles, many=True)
        # u_serializer = UpdateUserSerializer(users, many=True)
# 
        # context = {
            # 'u_form':p_serializer,
            # 'p_form':u_serializer
        # }
        # return Response(context.data)

    def create(self, request):
        p_serializer = ProfileSerializer(data=request.data)
        u_serializer = UpdateUserSerializer(data=request.data)
        if u_serializer.is_valid() and p_serializer.is_valid():
            u_serializer.save()
            p_serializer.save()
            return Response(u_serializer.data,p_serializer.data, status=status.HTTP_201_CREATED)
        if not u_serializer.is_valid():
            return Response(u_serializer.errors, status=status.HTTP_400_BAD_REQUEST)        
        if not p_serializer.is_valid():
            return Response(p_serializer.errors, status=status.HTTP_400_BAD_REQUEST)        


    def retrieve(self, request, pk=None):
        # p_queryset = Profile.objects.all()
        # u_queryset = User.objects.all()
        # profile = get_object_or_404(queryset, pk=pk)
        p_serializer = ProfileSerializer(instance=request.user)
        u_serializer = UpdateUserSerializer(instance=request.user.profile)
        context = {
            'u_form':p_serializer,
            'p_form':u_serializer
        }
        return Response(context.data)

    # def update(self, request, pk=None):
        # profile = Profile.objects.get(pk=pk)
        # serializer = ProfileSerializer(profile, data=request.data)
        # if serializer.is_valid():
            # serializer.save()
            # return Response(serializer.data)
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class ProfileViewSet (viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

    def get_permissions(self):
        if self.action == 'GET':
            return IsAuthenticated()
        elif self.action == 'POST':
            return IsAdminUser()
        elif self.action == 'PUT':
            return IsAdminUser()
        elif self.action == 'DELETE':
            return IsAdminUser()
        else :
            return []