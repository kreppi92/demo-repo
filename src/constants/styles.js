import { createMuiTheme } from '@material-ui/core/styles'
import BlueGrey from '@material-ui/core/colors/blueGrey'

export const palette = {
  gray: {
    '-2': '#f3f3f3',
    '-1': '#f2f2f2',
    '0': '#DADCE0',
  },
  white: {
    '0': '#ffffff',
  },
}

export const mainTheme = createMuiTheme({
  shadows: ["none"],
  
  palette: {
    primary: {
      main: "#19a0db",
    },
    secondary: {
      main: BlueGrey[500],
    },
  },

  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },

  typography: {
    fontFamily: 'Lato',
  },
  
  overrides: {
    MuiLinearProgress: {
      root: {
        height: 5,
      },
    },
    MuiCircularProgress: {
      colorPrimary: {
        color: palette.white[0],
      },
      root: {
        animationDuration: '550ms',
      },
    },
    MuiButton: {
      root: {
        textTransform: 'none',
        letterSpacing: 0.5,
        height: '56px',
        boxShadow: 'none',
        fontWeight: 'bold',
        fontSize: 14,
        textShadow: 'none',
      },
      sizeLarge: {
        fontSize: 18,
        fontWeight: 'normal',
        color: 'white'
      },
    },
    MuiCard: {
      root: {
        width: '100%',
        margin: '20px 0 0 0',
        backgroundColor: '#f3f3f3',
        letterSpacing: 0.5,
      },
    },
    MuiTypography: {
      root: {
        fontFamily: 'Lato',
        letterSpacing: 0.5,

        '&$h4': {
          textAlign: 'left',
          fontWeight: 600,
          fontSize: 28,
        },
        '&$h6': {
          textAlign: 'left',
          fontWeight: 500,
          fontSize: 18,
        },
        '&$body1': {
          textAlign: 'left',
        },
      },
      gutterBottom: {
        marginBottom: '.7em',
      },
    },
    MuiFormControl: {
      root: {
        marginTop: 20,
        letterSpacing: 0.5,
      },
    },
    MuiFormLabel: {
      root: {
        fontWeight: 500,
        letterSpacing: 0.5,

        '&$focused': {
          fontWeight: 550,
        },
      },
      filled: {
        fontWeight: 550,
      },
    },

    MuiFab: {
      root: {
        boxShadow: 'none',
        width: '70px',
        height: '70px',
      },
    },

    MuiCardContent: {
      root: {
        padding: 0,
        '&:last-child': {
          paddingBottom: 0,
        },
        '& h6': {
          padding: '20px 20px 0 20px',
        },
      },
    },
  },
})