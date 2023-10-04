from rest_framework.pagination import PageNumberPagination
from rest_framework import serializers
from rest_framework.response import Response


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 25
    page_size_query_param = 'limit'
    page_query_param = 'page'
    max_page_size = 150
    
    def get_paginated_response(self, data):
        return Response({
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link()
            },
            'count': self.page.paginator.count,
            'total_pages': self.page.paginator.num_pages,
            'results': data
        })


class BaseSerializer(serializers.Serializer):
    def get_fields(self):
        fields = super().get_fields()
        request = self.context.get('request', None)
        if request is None:
            return fields
        request_fields = request.query_params.get('fields', None)
        fields_ = request_fields.split(',') if request_fields else []
        fields_ = [f.strip() for f in fields_]
        if fields_:
            allowed = set([f.strip() for f in fields_])
            existing = set(fields.keys())
            for field_name in existing - allowed:
                fields.pop(field_name)
        return fields

