from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response


from django.urls import get_resolver


def get_all_urls():
    resolver = get_resolver()

    # Get the list of URL patterns from the resolver
    url_patterns = resolver.url_patterns

    return [str(pattern.pattern) for pattern in url_patterns]


@api_view(['GET'])
def main(request):
    urls = get_all_urls()
    print(urls)
    return Response(urls)
