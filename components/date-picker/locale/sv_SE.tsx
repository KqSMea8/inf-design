import CalendarLocale from 'rc-calendar/lib/locale/sv_SE';
import TimePickerLocale from '../../time-picker/locale/sv_SE';

const locale = {
  lang: {
    placeholder: 'Välj datum',
    rangePlaceholder: ['Startdatum', 'Slutdatum'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/infini-design/infini-design/blob/master/components/date-picker/locale/example.json

export default locale;
