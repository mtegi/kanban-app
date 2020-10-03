import { createMuiTheme } from '@material-ui/core/styles';

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#81c784',
      light: '#b2fab4',
      dark: '#2d7a42',
    },
    secondary: {
      main: '#37474f',
      light: '#62727b',
      dark: '#62727b',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

export default muiTheme;
