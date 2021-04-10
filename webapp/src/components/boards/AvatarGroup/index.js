import React, { useState } from 'react';
import { AvatarGroup } from '@material-ui/lab';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Dialog from '@material-ui/core/Dialog';
import { DialogActions, Tooltip } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useTranslation } from 'react-i18next';
import { useBoardState } from '../context/BoardContext';
import BoardAvatar from './Avatar';
import MemberList from './MemberList';
import { v4 } from 'uuid';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    cursor: 'pointer',
    '&:hover': {
      filter: 'brightness(0.8)',
    },
  },
}));

const BoardAvatarGroup = () => {
  const { members } = useBoardState();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation('boards');
  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
        <MemberList />
        <DialogActions>
          <Tooltip title={t('button.Close')}>
            <IconButton
              aria-label={t('button.Close')}
              onClick={() => setOpen(false)}
              color="primary"
            >
              <CloseIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        </DialogActions>
      </Dialog>
      <Tooltip title={t('memberList')} placement="top-center">
        <AvatarGroup max={4} className={classes.root} onClick={() => setOpen(true)}>
          {members.map((m) => (
            <BoardAvatar key={v4()} username={m.name} />
          ))}
        </AvatarGroup>
      </Tooltip>
    </>
  );
};

export default BoardAvatarGroup;
