import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Tooltip } from '@material-ui/core';
import HistoryIcon from '@material-ui/icons/History';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { StyledIconButton } from '../main/menu/styled';
import { fetchLogTimeDetails } from '../../../redux/reducers/actions/logTimeActions';

const TimeEntryManager = () => {
  const { t } = useTranslation('boards');
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const data = useSelector((state) => state.logTime.details);

  useEffect(() => {
    if (open) {
      dispatch(fetchLogTimeDetails());
    }
  }, [open]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };

  return (
    <>
      <Tooltip title={t('time.history')} placement="top-center">
        <StyledIconButton color="secondary" onClick={handleClick}>
          <HistoryIcon />
        </StyledIconButton>
      </Tooltip>
      <Popper open={open} anchorEl={anchorEl} placement="bottom-end" transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper style={{ padding: '2px 5px' }}>
              { data && data.map((item) => <div>{item.title}</div>)}
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default TimeEntryManager;
