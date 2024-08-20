from django.db.models import Count, Sum, F

from ..models import Produtor


class DashboardService:
    def get(self):
        total_fazendas = Produtor.objects.all().count()
        total_por_estado = Produtor.objects.values(nome=F('estado')).annotate(total=Count('estado'))
        total_por_cultura = Produtor.objects.values(nome=F('culturas__nome')).annotate(
            total=Count('culturas__nome')).filter(
            total__gte=1
        )
        total_por_area = Produtor.objects.aggregate(
            total_area_agricultavel=Sum('area_agricultavel'),
            total_area_vegetacao=Sum('area_vegetacao')
        )

        return {
            "total_fazendas": total_fazendas,
            "total_por_estado": total_por_estado,
            "total_por_cultura": total_por_cultura,
            "total_por_area": total_por_area,
        }
