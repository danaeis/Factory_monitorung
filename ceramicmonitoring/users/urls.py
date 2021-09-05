from django.contrib import admin
from django.urls import path, include
from .views import ProfileViewSet
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register('', ProfileViewSet, basename='factory')


urlpatterns = [
    path('viewset/', include(router.urls)),
    path('viewset/<int:pk>/', include(router.urls)),
    # path('register/', user_views.register, name='register'),
    # path('profile/', user_views.profile, name='profile'),
    # path('login/', auth_views.LoginView.as_view(template_name='users/login.html'), name='login'),
    # path('logout/', auth_views.LogoutView.as_view(template_name='users/logout.html'), name='logout'),
]
