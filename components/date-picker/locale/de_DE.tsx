import CalendarLocale from 'rc-calendar/lib/locale/de_DE';
import TimePickerLocale from '../../time-picker/locale/de_DE';

// Merge into a locale object
const locale = {
  lang: {
    placeholder: 'Datum auswählen',
    rangePlaceholder: ['Startdatum', 'Enddatum'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/infini-design/infini-design/issues/424

export default locale;