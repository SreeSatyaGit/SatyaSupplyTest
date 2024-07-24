from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.views.generic import TemplateView
from companies.views import CompanyViewSet, LocationViewSet
from . import views

router = DefaultRouter()
router.register(r'companies', CompanyViewSet)
router.register(r'locations', LocationViewSet)

urlpatterns = [
    path('', TemplateView.as_view(template_name="index.html")),
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('',views.index, name='index')
]
