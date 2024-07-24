from rest_framework import viewsets
from .models import Company, Location
from .serializers import CompanySerializer, LocationSerializer
from django.shortcuts import render

class CompanyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

class LocationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

def index(request):
    return render(request, 'index.html')