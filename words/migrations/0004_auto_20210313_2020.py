# Generated by Django 3.1.7 on 2021-03-13 20:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('words', '0003_auto_20210228_1906'),
    ]

    operations = [
        migrations.RenameField(
            model_name='token',
            old_name='key_cipher',
            new_name='key',
        ),
    ]
