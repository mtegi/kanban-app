import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Fade from '@material-ui/core/Fade';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { AccountBox, ExitToApp } from '@material-ui/icons';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { logout } from '../../redux/reducers/actions/authActions';
import routes from '../../router/routes.json';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.palette.primary.dark};
  padding: 0.2rem 0.4rem;
  border-radius: 1rem;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  &:hover {
    filter: brightness(0.7);
  }
  &:focus {
    filter: brightness(0.7);
    outline: none;
  }
`;

const NameWrapper = styled.span`
  margin-left: 0.5rem;
  font-weight: bolder;
  color: azure;
  user-select: none;
`;

const getLetters = (name, username) => {
  let split;
  if (name !== null && name !== '' && name !== undefined) {
    if (name.includes(' ')) {
      split = name.split(' ');
      return [split[0].charAt(0), split[1].charAt(0)];
    }
    split = name;
  } else {
    split = username;
  }
  if (split.length >= 2) {
    return [split.charAt(0), split.charAt(1)];
  }
  return [split.charAt(0), null];
};

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.secondary.dark,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const StyledAvatar = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.dark,
  },
}))(Avatar);

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
}));

const AccountMenu = () => {
  const name = useSelector((state) => state.auth.token.name);
  const username = useSelector((state) => state.auth.token.user_name);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const letters = getLetters(name, username);
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout().then(() => navigate(routes.login.uri));
  };

  return (
    <>
      <Wrapper
        tabIndex={0}
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={handleClick}
        onKeyDown={handleClick}
        role="button"
      >
        <StyledAvatar className={classes.avatar}>
          {letters[0]}
          {letters[1]}
        </StyledAvatar>
        <NameWrapper>{name || username}</NameWrapper>
      </Wrapper>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <StyledMenuItem onClick={() => navigate(routes.myAccount.uri)}>
          <ListItemIcon>
            <AccountBox />
          </ListItemIcon>
          <ListItemText primary={t('my-account')} />
        </StyledMenuItem>
        <StyledMenuItem onClick={handleLogout}>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary={t('logout')} />
        </StyledMenuItem>
      </Menu>
    </>
  );
};

export default AccountMenu;
