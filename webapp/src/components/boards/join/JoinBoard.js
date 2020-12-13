import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import { useAsync } from 'react-async-hook';
import { useNavigate } from 'react-router-dom';
import BoardApi from '../../../api/BoardApi';
import ProgressBar from '../../misc/ProgressBar';
import { ErrorWrapper } from './styled';
import GenericAlert from '../../forms/GenericAlert';
import routes from '../../../router/routes.json';

const JoinBoard = () => {
  const { t } = useTranslation(['boards', 'common', 'error']);
  const { search } = useLocation();
  const navigate = useNavigate();
  const { joinBoard } = BoardApi;
  const req = useAsync(joinBoard, [search], { onSuccess: () => navigate(routes.boards.uri) });

  return (
    <>
      {req.loading && <ProgressBar />}
      {req.error && <ErrorWrapper><GenericAlert message={t(req.error.message)} severity="error" /></ErrorWrapper>}
    </>
  );
};

export default JoinBoard;
