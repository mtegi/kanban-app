import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tooltip } from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import RefreshIcon from '@material-ui/icons/Refresh';
import PropTypes from 'prop-types';
import { StyledIconButton } from './main/menu/styled';
import { useBoardState } from './context/BoardContext';

const InviteManager = ({ onInviteLinkUpdate }) => {
  const { t } = useTranslation('boards');
  const { token } = useBoardState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const url = `${window.location.origin}/boards/join?token=${token}`;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };

  const copyToClipboard = () => navigator.clipboard.writeText(url);

  return (
    <>
      <Tooltip title={t('share')} placement="top-center">
        <StyledIconButton color="secondary" onClick={handleClick}>
          <ShareIcon />
        </StyledIconButton>
      </Tooltip>
      <Popper open={open} anchorEl={anchorEl} placement="bottom-end" transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper style={{ padding: '2px 5px' }}>
              <TextField
                color="secondary"
                variant="outlined"
                value={url}
                inputProps={{
                  style: { padding: '10px 12px 10px', minWidth: 400 },
                }}
                disabled
              />
              <Tooltip title={t('copy')} placement="bottom">
                <StyledIconButton color="secondary" onClick={copyToClipboard}>
                  <BookmarkIcon />
                </StyledIconButton>
              </Tooltip>
              <Tooltip title={t('newLink')} placement="bottom">
                <StyledIconButton
                  color="secondary"
                  onClick={onInviteLinkUpdate}
                >
                  <RefreshIcon />
                </StyledIconButton>
              </Tooltip>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
};

InviteManager.propTypes = {
  onInviteLinkUpdate: PropTypes.func.isRequired,
};

export default InviteManager;
