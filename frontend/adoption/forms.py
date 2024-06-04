# adoption/forms.py
from django import forms
from .models import Booking

class BookingForm(forms.ModelForm):
    class Meta:
        model = Booking
        fields = ['fname', 'email', 'date', 'time', 'message']

    def clean_time(self):
        time = self.cleaned_data['time']
        if isinstance(time, str):
            # Optionally parse string to time object if necessary
            # from datetime import datetime
            # time = datetime.strptime(time, '%H:%M:%S').time()
            pass
        return time
