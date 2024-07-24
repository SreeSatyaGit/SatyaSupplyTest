from django.http import JsonResponse
import pandas as pd

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

def contact_list(request):
    # Assuming 'contacts.csv' is the file with your data
    df = pd.read_csv('path_to_your_csv/contacts.csv')
    contacts = df.to_dict(orient='records')
    return JsonResponse(contacts, safe=False)

def contact_details(request, contact_id):
    df = pd.read_csv('path_to_your_csv/contacts.csv')
    contact = df[df['id'] == contact_id].to_dict(orient='records')
    return JsonResponse(contact, safe=False)