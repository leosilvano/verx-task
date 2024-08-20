from django.contrib import admin

from .models import Produtor, Cultura


class ProdutorAdmin(admin.ModelAdmin):
    fields = []


class CulturaAdmin(admin.ModelAdmin):
    fields = []


admin.site.register(Produtor, ProdutorAdmin)
admin.site.register(Cultura, CulturaAdmin)
