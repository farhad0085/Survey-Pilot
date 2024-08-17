from django.db import models
from django.core.exceptions import ImproperlyConfigured


class TrackingModel(models.Model):
    """By inheriting this model, we get created and updated time out of the box"""

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class ChangedTrackerModel(models.Model):
    """Determine if some value changed or not"""

    changed_lookup_fields = None


    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.track_original()

    def validate_look_fields(self):
        if not self.changed_lookup_fields:
            raise NotImplementedError("changed_lookup_fields needs to be defined.")
        if type(self.changed_lookup_fields) != list:
            raise ImproperlyConfigured("changed_lookup_fields must be a list.")


    def track_original(self):
        self.validate_look_fields()
        for field in self.changed_lookup_fields:
            field_value = getattr(self, field)
            setattr(self, f'__original_{field}', field_value)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.custom_save(*args, **kwargs)
        self.track_original() # this is important


    def custom_save(self, *args, **kwargs):
        """Write your custom save methods here. Don't override `save` method."""
        pass


    def has_changed(self, field_name=None):
        """
        specify `field_name` to check if that field changed or not
        """
        if field_name:
            if field_name not in self.changed_lookup_fields:
                raise NotImplementedError(f"You didn't define `{field_name}` in `changed_lookup_fields`")
            original_value = getattr(self, f'__original_{field_name}')
            current_value = getattr(self, field_name)
            return original_value != current_value

        changed_fields = []

        conditions = []
        for field in self.changed_lookup_fields:
            original_value = getattr(self, f'__original_{field}')
            current_value = getattr(self, field)
            if original_value != current_value:
                changed_fields.append(field)
            conditions.append(original_value != current_value)
        return any(conditions), changed_fields


    class Meta:
        abstract = True

