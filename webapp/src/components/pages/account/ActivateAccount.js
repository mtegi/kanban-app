import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import * as qs from 'query-string';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import useFormStatus from '../../forms/UseFormStatus';
import BasicFormContainer from '../../forms/BasicFormContainer';
import AccountApi from '../../../api/AccountApi';
import PopUp from '../../misc/PopUp';
import routes from '../../../router/routes.json';
import NavButton from '../../misc/NavButton';

const ActivateAccount = () => {
  const { t } = useTranslation(['register', 'common', 'error']);
  const status = useFormStatus();
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const { username, token } = qs.parse(location.search);
    AccountApi.activateAccount(username, token)
      .then(() => status.handleSuccess())
      .catch((e) => status.handleError(e))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {status.success && <PopUp text={t('activateSuccess')} />}
      <BasicFormContainer loading={loading} error={status.error}>
        <Row>
          <Col>
            <NavButton disabled={!status.success} to={routes.login.uri} fullWidth>
              {t('goToLogin')}
            </NavButton>
          </Col>
        </Row>
      </BasicFormContainer>
    </>
  );
};

export default ActivateAccount;
