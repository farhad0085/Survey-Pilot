# Generated by Django 3.2 on 2024-08-19 16:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('poll', '0003_rename_name_poll_title'),
    ]

    operations = [
        migrations.AddField(
            model_name='choice',
            name='index',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='choice',
            name='poll',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='choices', to='poll.poll'),
        ),
        migrations.AlterField(
            model_name='vote',
            name='poll',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='votes', to='poll.poll'),
        ),
        migrations.AlterUniqueTogether(
            name='choice',
            unique_together={('poll', 'index')},
        ),
    ]
