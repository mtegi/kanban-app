import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Tooltip } from "@material-ui/core";
import HistoryIcon from "@material-ui/icons/History";
import Popper from "@material-ui/core/Popper";
import IconButton from "@material-ui/core/IconButton";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { useDispatch, useSelector } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { format } from "date-fns";
import { Delete } from "@material-ui/icons";
import {
  deleteLogTimeDetails,
  fetchLogTimeDetails
} from "../../../redux/reducers/actions/logTimeActions";
import { StyledIconButton } from "../main/menu/styled";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const TimeEntryManager = () => {
  const { t } = useTranslation('boards');
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const data = useSelector((state) => state.logTime.details);
  const classes = useStyles();

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
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>{t('time.card')}</TableCell>
                    <TableCell align="left">{t('time.from')}</TableCell>
                    <TableCell align="left">{t('time.to')}</TableCell>
                    <TableCell align="left">{t('time.action')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data && data.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell align="left">{row.title}</TableCell>
                      <TableCell align="left">{format(new Date(row.from), 'dd/MM/yyyy, HH:mm')}</TableCell>
                      <TableCell align="left">{format(new Date(row.to), 'dd/MM/yyyy, HH:mm')}</TableCell>
                      <TableCell align="left"><IconButton onClick={() => dispatch(deleteLogTimeDetails(row.id))}><Delete /></IconButton></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default TimeEntryManager;
