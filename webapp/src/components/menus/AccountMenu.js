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
import { logout } from '../../redux/reducers/actions/authActions';
import routes from '../../router/routes.json';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.palette.primary.dark};
  padding: 0.4rem;
  border-radius: 1rem;
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
`;

const getLetters = (name) => {
  const split = name.split(' ');
  return [split[0].charAt(0), split[1].charAt(0)];
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

const AccountMenu = () => {
  const name = useSelector((state) => state.auth.token.name);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const letters = getLetters(name);

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
        <StyledAvatar>
          {letters[0]}
          {letters[1]}
        </StyledAvatar>
        <NameWrapper>{name}</NameWrapper>
      </Wrapper>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <StyledMenuItem>
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
