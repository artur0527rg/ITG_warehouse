from django.contrib import admin

from .models import Zone, Line, Place, Order, Pallet


admin.site.register(Zone)
admin.site.register(Line)
admin.site.register(Place)
admin.site.register(Order)
admin.site.register(Pallet)