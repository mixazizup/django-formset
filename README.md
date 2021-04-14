# django-formset – Better UX for Django Forms 

`<django-formset>` is a [Webcomponent](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
used to wrap one or more Django Forms and/or ModelForms.

## Example

Say, we have a standard Django Form:

```python
from django.forms import forms, fields

class SubscribeForm(forms.Form):
    last_name = fields.CharField(
        label="Last name",
        min_length=2,
        max_length=50,
    )

    # ... more fields
```

then we rendering to HTML, we shall wrap that form into our special Webcomponent:

```html
{% load django_formset %}

<django-formset endpoint="{{ request.path }}">
  <form name="subscribe">
    {% csrf_token %}
    {% render_groups form %}
  </form>
</django-formset>
```

this gives our Subscribe Form a much better **User eXperience**.


## Features

* Before submitting, our Form is prevalidated by the browser using the constraints we defined for
  each field.
* Multiple FormData objects are submitted to an endpoint.
* Server side validation errors are injected back to do form


[![Build Status](https://github.com/jrief/django-formset/actions/workflows/pythonpackage.yml/badge.svg)]()
[![PyPI](https://img.shields.io/pypi/pyversions/django-entangled.svg)]()
[![PyPI version](https://img.shields.io/pypi/v/django-entangled.svg)](https://https://pypi.python.org/pypi/django-entangled)
[![PyPI](https://img.shields.io/pypi/l/django-entangled.svg)]()
