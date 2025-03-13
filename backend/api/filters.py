import django_filters
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
    color = django_filters.CharFilter(lookup_expr="iexact")
    bordero_range = django_filters.RangeFilter(field_name="bordero")
    vsa_range = django_filters.RangeFilter(field_name="vsa")

    # Фильтрация заказов по связанным паллетам (по ID паллет)
    pallet = django_filters.BaseInFilter(field_name="pallet__id", lookup_expr="in")

    class Meta:
        model = Order
        fields = ["bordero", "vsa", "color", "pallet"]

class PalletFilter(django_filters.FilterSet):
    place = django_filters.BaseInFilter(field_name="place_id", lookup_expr="in")

    class Meta:
        model = Pallet
        fields = ["place"]
