import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
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
import { MenuItem, Tooltip } from '@material-ui/core';
import { DialogContentWrapper } from './main/custom/styled';
import FormControl from '../forms/FormControl';
import FormControlColor from '../forms/FormControlColor';
import FormControlDateTime from '../forms/FormControlDateTime';
import { setEditOpen } from '../../redux/reducers/actions/editCardActions';
import BoardApi from '../../api/BoardApi';
import { useBoardDispatch, useBoardState } from './context/BoardContext';
import FormControlSelect from '../forms/FormControlSelect';
import { ChipWrapper, StyledChip } from './manager/styled';
import Form from '../forms/Form';

const EditCardForm = ({ onEdit }) => {
  const { t } = useTranslation(['boards', 'common', 'error']);
  const dispatch = useDispatch();
  const boardState = useBoardState();
  const open = useSelector((state) => state.editCard.open);
  const cardId = useSelector((state) => state.editCard.cardId);
  const { members } = useBoardState();
  const data = useAsync(BoardApi.getCardDetails, [cardId]);

  const handleClose = () => {
    dispatch(setEditOpen(false));
  };

  useEffect(() => {
    if (open && boardState.updateCard?.id === cardId) {
      data.execute([cardId]);
    }
  }, [boardState.updateCard, open, cardId]);

  useEffect(() => {
    if (cardId) {
      data.execute([cardId]);
    }
  }, [open, cardId]);

  const handleSubmit = (values) => {
    const body = { ...values, id: cardId, members: values.members.map((m) => m.username) };
    onEdit(body);
    handleClose();
  };

  const validationSchema = yup.object().shape({
    title: yup.string().trim().required(t('error:form.required')),
    description: yup.string().trim(),
  });

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{t('card.edit')}</DialogTitle>
      {data.result && (
        <Formik
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={handleSubmit}
          initialValues={{
            title: data.result.title,
            description: data.result.description,
            deadline: data.result.deadline,
            color: data.result.color,
            members: members.filter((m) =>
              data.result.members.find((dataMember) => dataMember === m.username)
            ),
          }}
        >
          {({ submitForm, errors, setFieldValue, values }) => (
            <Form onSubmit={handleSubmit}>
              <DialogContentWrapper>
                <Row>
                  <Col>
                    <FormControl
                      label={t('card.title')}
                      name="title"
                      required
                      value={values.title}
                    />
                  </Col>
                  <Col md="auto">
                    <FormControlColor label={t('card.color')} name="color" />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormControl
                      label={t('card.description')}
                      name="description"
                      multiline
                      value={values.description}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormControlDateTime
                      label={t('card.deadline')}
                      name="deadline"
                      minDate={new Date()}
                      value={values.deadline}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormControlSelect
                      label={t('card.members')}
                      name="members"
                      multiple
                      onChange={(event) => {
                        const value = values.members;
                        event.target.value.forEach((val) => {
                          if (!value.find((v) => v.username === val.username)) {
                            value.push(val);
                          }
                        });
                      }}
                      onReset={() => setFieldValue('members', [])}
                      renderValue={(selected) => (
                        <ChipWrapper>
                          {selected.map((value) => (
                            <StyledChip key={value.username} label={value.name} />
                          ))}
                        </ChipWrapper>
                      )}
                    >
                      {members.map((m) => (
                        <MenuItem key={m.username} value={{ username: m.username, name: m.name }}>
                          {m.name}
                        </MenuItem>
                      ))}
                    </FormControlSelect>
                  </Col>
                </Row>
              </DialogContentWrapper>
              <DialogActions>
                <Tooltip title={t('button.Cancel')}>
                  <IconButton aria-label={t('button.Cancel')} onClick={handleClose} color="primary">
                    <CancelIcon fontSize="large" />
                  </IconButton>
                </Tooltip>
                <Tooltip title={t('card.edit')}>
                  <IconButton
                    aria-label={t('card.edit')}
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

EditCardForm.propTypes = {
  onEdit: PropTypes.func.isRequired,
};

EditCardForm.defaultProps = {};

export default EditCardForm;
