import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBoards, setSearchInput } from '../../../redux/reducers/actions/boardManagerActions';

const useStyles = makeStyles(() => ({
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
  const dispatch = useDispatch();
  const value = useSelector((state) => state.boardManager.searchInput);

  useEffect(() => {
    const timeOutId = setTimeout(() => dispatch(fetchBoards(value)), 1000);
    return () => clearTimeout(timeOutId);
  }, [value]);

  return (
    <Paper className={classes.root}>
      <InputBase
        value={value}
        className={classes.input}
        placeholder={t('search')}
        inputProps={{ 'aria-label': t('search') }}
        onChange={(event) => dispatch(setSearchInput(event.target.value))}
      />
      <SearchIcon />
    </Paper>
  );
};

export default SearchInput;

// SearchInput.propTypes = {
//   callback: PropTypes.func
// };
//
// SearchInput.defaultProps = {
//   callback: () => {}
// };
