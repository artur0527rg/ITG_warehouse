from rest_framework.decorators import action
from rest_framework.response import Response

from api.filters import PostDjangoFilterBackend


class PostFilterMixin:
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if not any(isinstance(b, PostDjangoFilterBackend) for b in self.filter_backends):
            self.filter_backends = [PostDjangoFilterBackend] + list(self.filter_backends)

    @action(detail=False, methods=['POST'])
    def filter(self, request):
        """
        Unified POST filtering endpoint.
        """
        queryset = self.filter_queryset(self.get_queryset())
        
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
            
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)