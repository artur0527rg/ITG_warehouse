# filters.py
from django_filters.rest_framework import DjangoFilterBackend


class PostDjangoFilterBackend(DjangoFilterBackend):
  def get_filterset_kwargs(self, request, queryset, view):
        return {
            "data": request.data,
            "queryset": queryset,
            "request": request,
        }