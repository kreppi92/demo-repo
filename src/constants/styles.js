import { createMuiTheme } from "@material-ui/core/styles";
import BlueGrey from "@material-ui/core/colors/blueGrey";

export const palette = {
  gray: {
    "-2": "#f3f3f3",
    "-1": "#f2f2f2",
    "0": "#DADCE0",
    "1": "#9e9e9e",
    "2": BlueGrey[500]
  },

  blue: {
    "0": "#19a0db"
  },

  green: {
    "-1": "#009688",
    "0": "#26a69a",
    "1": "#4caf50",
    "2": "#43a047"
  },

  red: {
    "-1": "#f44336",
    "0": "#ef5350"
  },

  white: {
    "0": "#ffffff"
  },

  black: {
    "-2": "#212121",
    "-1": "#fafafa",
    "0": "#000000"
  }
};

export const mainTheme = createMuiTheme({
  shadows: [...new Array(10).fill("")],

  palette: {
    primary: {
      main: "#19a0db"
    },
    secondary: {
      main: BlueGrey[500]
    }
  },

  props: {
    MuiButtonBase: {
      disableRipple: true
    }
  },

  typography: {
    fontFamily: "Lato"
  },

  overrides: {
    MuiLinearProgress: {
      root: {
        height: 5
      }
    },
    MuiCircularProgress: {
      colorPrimary: {
        color: palette.white[0]
      },
      root: {
        animationDuration: "550ms"
      }
    },
    MuiButton: {
      root: {
        textTransform: "none",
        letterSpacing: 0.5,
        height: "56px",
        boxShadow: "none",
        fontWeight: "700",
        fontSize: 14,
        textShadow: "none"
      },

      sizeLarge: {
        fontSize: 18,
        fontWeight: "700",
        color: "white"
      },

      sizeSmall: {
        fontSize: 16,
        fontWeight: "700",
        color: "white"
      }
    },
    MuiCard: {
      root: {
        width: "100%",
        margin: "20px 0 0 0",
        backgroundColor: "#f3f3f3",
        letterSpacing: 0.5
      }
    },
    MuiTypography: {
      root: {
        fontFamily: "Lato",
        letterSpacing: 0.5,

        "&$h4": {
          textAlign: "left",
          fontWeight: 700,
          fontSize: 22
        },
        "&$h6": {
          textAlign: "left",
          fontWeight: 500,
          fontSize: 18
        },
        "&$body1": {
          textAlign: "left"
        }
      },
      gutterBottom: {
        marginBottom: ".7em"
      }
    },
    MuiFormControl: {
      root: {
        marginTop: 20,
        letterSpacing: 0.5
      }
    },
    MuiFormLabel: {
      root: {
        fontWeight: 500,
        letterSpacing: 0.5,

        "&$focused": {
          fontWeight: 550
        }
      },
      filled: {
        fontWeight: 550
      }
    },

    MuiFab: {
      root: {
        boxShadow: "none",
        width: "70px",
        height: "70px"
      }
    },

    MuiCardContent: {
      root: {
        padding: 0,
        "&:last-child": {
          paddingBottom: 0
        },
        "& h6": {
          padding: "20px 20px 0 20px"
        }
      }
    }
  }
});
