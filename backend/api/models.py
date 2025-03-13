from django.db import models


class Zone(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Line(models.Model):
    zone = models.ForeignKey(Zone, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Place(models.Model):
    line = models.ForeignKey(Line, on_delete=models.CASCADE)
    position = models.IntegerField()

    class Meta:
        unique_together = ('line', 'position')  # Уникальность позиции в рамках одной линии

    def __str__(self):
        return f"Place {self.position} in {self.line}"


class Order(models.Model):
    bordero = models.IntegerField()
    vsa = models.IntegerField()
    color = models.CharField(max_length=7)  # Цвет в шестнадцатеричном формате
    description = models.TextField(null=True, blank=True)  # Длинное описание, может быть пустым

    def __str__(self):
        return f"Order {self.bordero} - {self.vsa}"


class Pallet(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    place = models.OneToOneField(Place, on_delete=models.CASCADE)

    def __str__(self):
        return f"Pallet for {self.order} at {self.place}"
