import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 10px',
    display: 'flex',
    alignItems: 'center',
    width: '40%',
    justifyContent: 'space-between',
  },
}));

const SearchInput = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder={t('search')}
        inputProps={{ 'aria-label': t('search') }}
      />
      <SearchIcon />
    </Paper>
  );
};

export default SearchInput;
