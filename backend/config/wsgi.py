"""
WSGI config for omegal_extended project.
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'omegal_extended.settings')

application = get_wsgi_application()
