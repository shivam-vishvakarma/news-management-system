from django.contrib import admin
from .models import UserTable, Articls, Comments, Publisher

# Register your models here.
admin.site.register(UserTable)
admin.site.register(Articls)
admin.site.register(Comments)
admin.site.register(Publisher)
