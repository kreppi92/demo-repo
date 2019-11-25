import { createMuiTheme } from '@material-ui/core/styles'

export const palette = {
  gray: {
    '-4': '#C4C4C4',
    '-3': '#E5E5EC80',
    '-2': '#DADCE0',
    '-1': '#E5E5EC',
    '0': '#888888',
    '1': '#414146',
    '2': '#6C7189'
  },

  blueGray: {
    '0': '#6C7189'
  },

  black: {
    '-1': '#00000030',
    '0': '#000000'
  },

  white: {
    '-1': '#ffffff50',
    '0': '#ffffff',
  },

  purple: {
    '-1': '#4D3FBC',
    '0': '#3700FF',
    '1': '#211F69',
  }
}

export const mainTheme = createMuiTheme({
  palette: {
    primary: {
      main: palette.purple[0],
    },
    secondary: {
      main: palette.purple[0],
    },
  },

  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },

  typography: {
    fontFamily: 'Montserrat',
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
        borderRadius: 30,
        fontSize: 16,
        fontWeight: 600,
        color: 'white',
        boxShadow: 'none',
        '&:hover' : {
          opacity: 0.8
        }
      },
    },
    
    MuiCard: {
      root: {
        width: '100%',
        margin: '20px 0 0 0',
        backgroundColor: '#f3f3f3',
        letterSpacing: 0.5 
      },
    },

    MuiDialog: {
      paper: {
        margin: 0,
        overflowX: 'hidden'
      }
    },

    MuiDialogContent: {
      root: {
        padding: 0
      }
    },

    MuiExpansionPanel: {
      root: {
        borderTop: '1px solid',
        borderBottom: '1px solid',
        borderTopColor: palette.gray[0],
        borderBottomColor: palette.gray[0],
        boxShadow: 'none',
        '&:not(:last-child)': {
          borderBottom: '0',
        },
        '&:before': {
          display: 'none',
        },
        '&$expanded': {
          margin: 'auto',
        },
      },
    },
    
    MuiTypography: {
      root: {
        fontFamily: 'Montserrat',
        letterSpacing: 1,

        '&$h1': {
          fontWeight: 600,
          lineHeight: 1.2,
          letterSpacing: 2,
          fontSize: 30,
          '@media (min-width:600px)': {
            fontSize: 40,
          },
          '@media (min-width:960px)': {
            fontSize: 50,
          },
          '@media (min-width:1280px)': {
            fontSize: 55,
          }
        },

        '&$h2': {
          textAlign: 'center',
          fontWeight: 600,
          lineHeight: 1.2,
          letterSpacing: 2,
          fontSize: 30,

          '@media (min-width:600px)': {
            fontSize: 40,
          }
        },


        '&$h3': {
          fontWeight: 600,
          fontSize: 18,
          letterSpacing: 1,
          color: palette.black[0]
        },

        '&$h4': {
          fontWeight: 500,
          fontSize: 20,
          letterSpacing: 1,
          '@media (min-width:600px)': {
            fontSize: 23,
          },
          '@media (min-width:960px)': {
            fontSize: 26,
          },
          '@media (min-width:1280px)': {
            fontSize: 30,
          }
        },

        '&$h5': {
          fontWeight: 600,
          fontSize: 25,
          letterSpacing: 1
        },

        '&$h6': {
          textAlign: 'center',
          fontWeight: 500,
          fontSize: 17,
          letterSpacing: 1
        },

        '&$body1': {
          textAlign: 'left',
          fontSize: 14,

          '@media (min-width:600px)': {
            fontSize: 15,
          },
          '@media (min-width:960px)': {
            fontSize: 16,
          },
          '@media (min-width:1280px)': {
            fontSize: 17,
          },
        },

        '&$body2': {
          textAlign: 'left',
          fontSize: 12,
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

    MuiInputBase: {
      root: {
        padding: '0px 14px 0px 14px',
      }
    },

    MuiFab: {
      root: {
        boxShadow: 'none',
        width: '70px',
        height: '70px',
      },
    },

    MuiOutlinedInput: {
      input: {
        padding: 0
      }
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