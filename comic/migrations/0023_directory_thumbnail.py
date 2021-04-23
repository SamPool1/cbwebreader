# Generated by Django 3.2 on 2021-04-21 17:44

from django.db import migrations
import imagekit.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('comic', '0022_comicbook_thumbnail'),
    ]

    operations = [
        migrations.AddField(
            model_name='directory',
            name='thumbnail',
            field=imagekit.models.fields.ProcessedImageField(null=True, upload_to='thumbs'),
        ),
    ]
