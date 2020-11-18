import { getI18n } from 'react-i18next';
import { enUS, pl } from 'date-fns/locale';
import { format, parseISO } from 'date-fns';

export const getLocale = () => {
  switch (getI18n().language) {
    case 'pl' || 'pl-Pl':
      return pl;
    default:
      return enUS;
  }
};

export const parseDate = (date, formatString) =>
  format(parseISO(date), formatString, { locale: getLocale() });
