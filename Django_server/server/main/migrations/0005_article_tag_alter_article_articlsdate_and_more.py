# Generated by Django 5.0.2 on 2024-04-15 11:57

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_alter_article_articlsdate_alter_comment_commentdate_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='tag',
            field=models.CharField(blank=True, default='Newsy', max_length=300, null=True),
        ),
        migrations.AlterField(
            model_name='article',
            name='articlsDate',
            field=models.DateTimeField(default=datetime.datetime(2024, 4, 15, 17, 27, 25, 103620)),
        ),
        migrations.AlterField(
            model_name='comment',
            name='commentDate',
            field=models.DateTimeField(default=datetime.datetime(2024, 4, 15, 17, 27, 25, 103620)),
        ),
    ]