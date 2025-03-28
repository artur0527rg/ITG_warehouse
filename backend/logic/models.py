from django.db import models


class Zone(models.Model):
    name = models.CharField(max_length=50)
    position = models.IntegerField(unique=True)

    def __str__(self):
        return self.name

class Line(models.Model):
    zone = models.ForeignKey(Zone, on_delete=models.CASCADE, related_name='lines')
    position = models.IntegerField()
    name = models.CharField(max_length=50)

    class Meta:
        unique_together = ('zone', 'position')

    def __str__(self):
        return self.name

class Place(models.Model):
    line = models.ForeignKey(Line, on_delete=models.CASCADE, related_name='places')
    position = models.IntegerField()

    class Meta:
        unique_together = ('line', 'position')

    def __str__(self):
        return f"Place {self.position} in line {self.line}"

class Order(models.Model):
    bordero = models.IntegerField(unique=True)
    vsa = models.IntegerField()
    color = models.CharField(max_length=6)
    name = models.CharField(max_length=5, null=True, blank=True)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"Order {self.bordero} - {self.vsa}"

class Pallet(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='pallets')
    place = models.OneToOneField(Place, on_delete=models.CASCADE, related_name='pallet')

    def __str__(self):
        return f"Pallet for {self.order} at {self.place}"
