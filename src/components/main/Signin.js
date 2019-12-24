import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import { palette } from '../../constants/styles'
import logoIcon from '../../images/logo.png'
import Footer from './Footer'
import Firebase from '../../constants/firebase'
import CustomSnackbar from '../shared/CustomSnackbar'

var store = require('store')

const styles = {
  button: {
    margin: '30px 0 0 0'
  },

  container: {
    display: 'flex',
    justifyContent: 'center'
  }, 

  contentContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '40px 20px 40px 20px',

    '@media (min-width:780px)': {
      padding: '40px 40px 40px 40px',
    },
  },

  footer: {
    margin: '95vh 0 0 0',
    width: '100%'
  },

  paper: {
    position: 'absolute',
    width: '100%',
    boxShadow: 'none',
    borderRadius: '5px',

    '@media (min-width:780px)': {
      top: '16%',
      width: '500px',
      border: '1px solid',
      borderColor: palette.gray[0]
    },
  },

  linkContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '25px 0 30px 0',
    width: '100%'
  },

  link: {
    color: palette.blue[0],
    fontWeight: 700,
    fontSize: '15px',
    textDecoration: 'none',

    "&:hover": {
      textDecoration: 'underline'
    }
  },

  logoIcon: {
    marginBottom: '30px',
    objectFit: 'contain',
    height: '40px',
    width: '40px'
  },

  textField: {
    marginTop: '25px'
  }
}

class Signin extends Component {
  state = {
    email: '',
    emailHelperText: '',
    emailError: false,
    password: '',
    passwordHelperText: '',
    passwordError: false,
    snackbarIsOpen: false,
    snackbarVariant: 'success',
    snackbarMessage: ''
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
      emailHelperText: '',
      emailError: false,
      passwordHelperText: '',
      passwordError: false
    })
  }

  handleOnClick = event => {
    this.validateForms()
  }

  validateForms() { 
    const { email, password } = this.state

    var emailHasError = false
    var emailErrorText = ""
    
    if (email === "") { 
      emailHasError = true
      emailErrorText = "Please enter a valid email."
    }

    var passwordHasError = false
    var passwordErrorText = ""

    if (password === "") { 
      passwordHasError = true
      passwordErrorText = "Please enter a password."
    }

    if (emailHasError || passwordHasError) {
      this.displayFormError(emailHasError, emailErrorText, passwordHasError, passwordErrorText)
    } else {
      this.signUserIn(email, password)
    }
  }

  displayFormError(emailHasError, emailErrorText, passwordHasError, passwordErrorText) { 
    this.setState({
      emailError: emailHasError,
      emailHelperText: emailErrorText,
      passwordError: passwordHasError,
      passwordHelperText: passwordErrorText
    })
  }

  onSnackBarClose = () => {
    this.setState({
      snackbarIsOpen: false
    })
  }

  displaySnackbar = (variant, message) => {
    this.setState({
      snackbarIsOpen: true,
      snackbarVariant: variant,
      snackbarMessage: message
    })
  }

  signUserIn(email, password) { 
    this.setState({ isLoading: true })

    var signIn = Firebase.functions().httpsCallable('signIn')
    signIn({ email: email, password: password, verify: true}).then(function (result) {
      if (result.data.success) {
        store.set('token', result.data.token)
        this.displaySnackbar('success', 'Successfully signed in.')
        window.location = '/home'
      } else {
        this.displaySnackbar('error', result.data.error)
      }
      this.setState({ isLoading: false })
    }.bind(this))
  }

  render() {
    const { classes } = this.props
    const { email, emailHelperText, emailError, password, passwordHelperText, passwordError, isLoading, snackbarIsOpen, snackbarMessage, snackbarVariant } = this.state

    return (
      <div className={classes.container}>
        <Paper className={classes.paper}>
          <div className={classes.contentContainer}>
            <img src={logoIcon} className={classes.logoIcon} alt="" />

            <Typography variant="h4" gutterBottom>
              Sign in to Satstreet
            </Typography>

            <TextField
              fullWidth
              error={emailError}
              className={classes.textField}
              id="outlined-email"
              label="Email"
              name="email"
              type="email"
              helperText={emailHelperText}
              value={email}
              onChange={this.handleChange('email')}
              variant="outlined"
            />

            <TextField
              fullWidth
              error={passwordError}
              className={classes.textField}
              id="outlined-password"
              label="Password"
              name="password"
              type="password"
              value={password}
              helperText={passwordHelperText}
              onChange={this.handleChange('password')}
              variant="outlined"
            /> 
                  
            <Button
              className={classes.button}
              size="large"
              variant={'contained'}
              color="primary"
              fullWidth
              onClick={this.handleOnClick}
            >
            {isLoading ? (
                <CircularProgress
                  variant="indeterminate"
                  disableShrink
                  size={24}
                  thickness={4}
                />
              ) : (
                'Sign in'
              )}
            </Button>

            <div className={classes.linkContainer}>
              <a className={classes.link} href={"/forgot_password"}>Forgot password?</a>
              <a className={classes.link} href={"/create_account"}>Create an account</a>
            </div>

          </div>
        </Paper>
        <div className={classes.footer}>
          <Footer />
        </div>

        <CustomSnackbar variant={snackbarVariant} message={snackbarMessage} open={snackbarIsOpen} onSnackBarClose={this.onSnackBarClose}/>
      </div>
    )
  }
}

Signin.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Signin)