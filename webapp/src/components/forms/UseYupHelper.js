import * as yup from 'yup';
import i18next from 'i18next';
import { equalTo, lettersOnly } from './Validation';

const useYupHelper = () => {
  yup.addMethod(yup.string, 'equalTo', equalTo);

  const email = yup
    .string()
    .trim()
    .email(i18next.t('error:form.email.format'))
    .required(i18next.t('error:form.required'))
    .max(254, i18next.t('error:form.max'));
  const password = yup
    .string()
    .trim()
    .required(i18next.t('error:form.required'))
    .min(8, i18next.t('error:form.password.min'));
  const repeatPassword = yup
    .string()
    .trim()
    .required(i18next.t('error:form.required'))
    .equalTo(yup.ref('password'), i18next.t('error:form.password.repeat'))
    .min(8, i18next.t('error:form.password.min'));
  const firstName = yup
    .string()
    .trim()
    .max(16, i18next.t('error:form.max'))
    .matches(lettersOnly, i18next.t('error:form.letters'))
    .nullable();
  const lastName = yup
    .string()
    .trim()
    .max(32, i18next.t('error:form.max'))
    .matches(lettersOnly, i18next.t('error:form.letters'))
    .nullable();
  const username = yup
    .string()
    .trim()
    .required(i18next.t('error:form.required'))
    .max(16, i18next.t('error:form.max'));

  return { email, password, repeatPassword, username, firstName, lastName };
};

export default useYupHelper;
