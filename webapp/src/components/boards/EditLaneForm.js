import React, { useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import { useTranslation } from 'react-i18next';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Formik } from 'formik';
import * as yup from 'yup';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useDispatch, useSelector } from 'react-redux';
import { useAsync } from 'react-async-hook';
import { Tooltip } from '@material-ui/core';
import PropTypes from 'prop-types';
import { DialogContentWrapper } from './main/custom/styled';
import FormControl from '../forms/FormControl';
import BoardApi from '../../api/BoardApi';
import Form from '../forms/Form';
import { setEditLaneOpen } from '../../redux/reducers/actions/editLaneActions';

const EditLaneForm = ({ onEdit }) => {
  const { t } = useTranslation(['boards', 'common', 'error']);
  const dispatch = useDispatch();
  const open = useSelector((state) => state.editLane.open);
  const laneId = useSelector((state) => state.editLane.laneId);
  const cardCount = useSelector((state) => state.editLane.cardCount);
  const data = useAsync(BoardApi.getLaneDetails, [laneId]);

  const handleClose = () => {
    dispatch(setEditLaneOpen(false));
  };

  useEffect(() => {
    if (laneId) {
      data.execute([laneId]);
    }
  }, [open]);

  const handleSubmit = (values) => {
    const body = { ...values, id: laneId };
    onEdit(body);
    handleClose();
  };

  const validationSchema = yup.object().shape({
    taskLimit: yup.number().positive(t('error:form.validation')).min(cardCount, t('error:form.taskLimit.cardCount')).nullable(),
  });

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{t('Edit lane')}</DialogTitle>
      {data.result && (
        <Formik
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={handleSubmit}
          initialValues={{
            taskLimit: data.result.taskLimit,
          }}
        >
          {({ submitForm, errors }) => (
            <Form onSubmit={handleSubmit}>
              <DialogContentWrapper>
                <Row>
                  <Col>
                    <FormControl
                      label={t('lane.taskLimit')}
                      name="taskLimit"
                      type="number"
                    />
                  </Col>
                </Row>
              </DialogContentWrapper>
              <DialogActions>
                <Tooltip title={t('button.Cancel')}>
                  <IconButton
                    aria-label={t('button.Cancel')}
                    onClick={handleClose}
                    color="primary"
                  >
                    <CancelIcon fontSize="large" />
                  </IconButton>
                </Tooltip>
                <Tooltip title={t('Edit lane')}>
                  <IconButton
                    aria-label={t('Edit lane')}
                    onClick={submitForm}
                    color="primary"
                    disabled={Object.keys(errors).length !== 0}
                  >
                    <CheckCircleIcon fontSize="large" />
                  </IconButton>
                </Tooltip>
              </DialogActions>
            </Form>
          )}
        </Formik>
      )}
    </Dialog>
  );
};

EditLaneForm.propTypes = {
  onEdit: PropTypes.func.isRequired,
};

EditLaneForm.defaultProps = {};

export default EditLaneForm;
