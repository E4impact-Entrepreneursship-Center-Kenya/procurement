from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('mainapp.urls')),
    path('auth/', include('customauth.urls')),
    path('account/', include('account.urls')),
    path('accounting/', include('accounting.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
