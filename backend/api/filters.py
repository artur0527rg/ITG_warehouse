import django_filters
from django.db.models import Q

from logic.models import Line, Place, Order, Pallet


class LineFilter(django_filters.FilterSet):
    zone = django_filters.BaseInFilter(field_name="zone_id", lookup_expr="in")

    class Meta:
        model = Line
        fields = ["zone"]

class PlaceFilter(django_filters.FilterSet):
    line = django_filters.BaseInFilter(field_name="line_id", lookup_expr="in")

    class Meta:
        model = Place
        fields = ["line"]

class OrderFilter(django_filters.FilterSet):
    bordero = django_filters.NumberFilter()
    vsa = django_filters.NumberFilter()
    name = django_filters.CharFilter()
    color = django_filters.CharFilter(lookup_expr="iexact")
    bordero_range = django_filters.RangeFilter(field_name="bordero")
    vsa_range = django_filters.RangeFilter(field_name="vsa")

    # Filtering orders by associated pallets (by pallet ID)
    pallet = django_filters.BaseInFilter(field_name="pallet__id", lookup_expr="in")

    search = django_filters.CharFilter(method='custom_search', label="Search by keyword")

    def custom_search(self, queryset, name, value):
        return queryset.filter(
            Q(bordero__icontains=value) | 
            Q(vsa__icontains=value) |
            Q(name__icontains=value)
        )[:5]

    class Meta:
        model = Order
        fields = ["bordero", "vsa", "color", "pallet", 'name',]

class PalletFilter(django_filters.FilterSet):
    place = django_filters.BaseInFilter(field_name="place_id", lookup_expr="in")

    class Meta:
        model = Pallet
        fields = ["place"]
