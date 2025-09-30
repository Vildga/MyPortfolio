from django.db import models


class Project(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    link = models.URLField()
    image = models.ImageField(upload_to='projects/', null=True, blank=True)

    def __str__(self):
        return self.title


class Achievement(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    date = models.DateField()
    certificate = models.FileField(upload_to='achievements/', null=True, blank=True)

    def __str__(self):
        return self.title

