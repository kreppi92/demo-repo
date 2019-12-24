import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
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
  boldText: {
    fontWeight: 700
  },

  button: {
    margin: '30px 0 0 0'
  },

  checkBoxContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    fontSize: '12px',
    fontWeight: 'normal',
    justifyContent: 'flex-start',
    lineHeight: '16px',
    letterSpacing: 0.2,
    margin: '0 0 5px -10px'
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

  formHelperText: {
    fontWeight: 'normal',
    letterSpacing: 0.2,
    margin: '10px 0 20px 0'
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

  linkContainerVerification: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '25px 0 30px 0',
    width: '100%'
  },

  linkTerms: {
    color: palette.gray[2],
    fontWeight: '700'
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
  },

  verificationText: {
    fontSize: '15px',
    margin: '30px 0 0 0',
    letterSpacing: 0.3,
    lineHeight: '20px',
  }
}

class Signup extends Component {
  state = {
    code: '',
    codeHelperText: '',
    codeError: false,
    email: '',
    emailHelperText: '',
    emailError: false,
    password: '',
    passwordHelperText: '',
    passwordError: false,
    verificationSent: false,
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
      passwordError: false,
      codeHelperText: '',
      codeError: false,
      terms: false,
      termsError: false
    })
  }

  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.validateForms()
    }
  }

  handleTermsChange = name => event => {
    this.setState({
      [name]: event.target.checked,
      termsError: false
    })
  }

  handleOnClick = event => {
    this.validateForms()
  }

  validateForms() {
    const { email, password, terms } = this.state

    var emailHasError = false
    var emailErrorText = ""
    var termsError = !terms

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

    if (emailHasError || passwordHasError || termsError) {
      this.displayFormError(emailHasError, emailErrorText, passwordHasError, passwordErrorText, termsError)
    } else {
      this.sendVerificationCode()
    }
  }

  displayFormError(emailHasError, emailErrorText, passwordHasError, passwordErrorText, termsError) {
    this.setState({
      emailError: emailHasError,
      emailHelperText: emailErrorText,
      passwordError: passwordHasError,
      passwordHelperText: passwordErrorText,
      termsError: termsError
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
      snackbarMessage: message,
      isLoading: false
    })
  }

  sendVerificationCode = () => {
    const { email } = this.state

    this.setState({ isLoading: true })

    var generateCode = Firebase.functions().httpsCallable('generateCode')
    generateCode({ email: email }).then(function (result) {
      if (result.data.success) {
        this.setState({ 
          verificationSent: true,
          isLoading: false
         })
      } else {
        this.displaySnackbar('error', result.data.error)
      }
    }.bind(this))
  }

  handleCodeVerification = () => {
    const { email, code } = this.state

    var codeHasError = false
    var codeErrorText = ""

    if (code === "") {
      codeHasError = true
      codeErrorText = "Please enter your verification code."
    }

    if (codeHasError) {
      this.setState({
        codeError: codeHasError,
        codeHelperText: codeErrorText,
      })
    } else {
      this.setState({ isLoading: true })

      var verifyCode = Firebase.functions().httpsCallable('verifyCode')
      verifyCode({ email: email, code: code }).then(function (result) {
        if (result.data.success) {
          this.createAccount()
        } else {
          this.displaySnackbar('error', result.data.error)
        }
      }.bind(this))
    }
  }

  createAccount = () => {
    const { email, password } = this.state

    var signUp = Firebase.functions().httpsCallable('signUp')
    signUp({ email: email, password: password }).then(function (result) {
      if (result.data.success) {
        store.set('token', result.data.token)
        this.displaySnackbar('success', "Account successfully created.")
        window.location = '/home'
      } else {
        this.displaySnackbar('error', result.data.error)
      }
    }.bind(this))
  }

  render() {
    const { classes } = this.props
    const { code, codeError, codeHelperText, email, emailHelperText, emailError, password, passwordHelperText, passwordError, isLoading, snackbarIsOpen, snackbarMessage, snackbarVariant, verificationSent, terms, termsError } = this.state

    return (
      <div className={classes.container}>
        <Paper className={classes.paper}>
            {
              verificationSent ?

              <div className={classes.contentContainer}>
                <img src={logoIcon} className={classes.logoIcon} alt="" />
                <Typography variant="h4" gutterBottom>
                  Confirm verification
                </Typography>

                <div className={classes.verificationText}>
                  Please enter the 6 digit verification code sent to <span className={classes.boldText}>{email}</span>.<br /><br />If you did not receive it in your main inbox, please check your junk folder.
                </div>

                <TextField
                  fullWidth
                  error={codeError}
                  className={classes.textField}
                  id="outlined-code"
                  label="Code"
                  name="code"
                  type="text"
                  helperText={codeHelperText}
                  value={code}
                  onChange={this.handleChange('code')}
                  variant="outlined"
                />

                <Button
                  className={classes.button}
                  size="large"
                  variant={'contained'}
                  color="primary"
                  fullWidth
                  onClick={this.handleCodeVerification}
                >
                  {isLoading ? (
                    <CircularProgress
                      variant="indeterminate"
                      disableShrink
                      size={24}
                      thickness={4}
                    />
                  ) : (
                      'Verify code'
                  )}
                </Button>

                <div className={classes.linkContainerVerification}>
                  <a className={classes.link} href={"#"} onClick={this.sendVerificationCode}>Resend activation code?</a>
                  <a className={classes.link} href={"/signin"}>Sign in</a>
                </div>
              </div>

              :

              <div className={classes.contentContainer}>
                <img src={logoIcon} className={classes.logoIcon} alt="" />
                <Typography variant="h4" gutterBottom>
                  Create an account
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

              <FormControl required error={termsError} component="fieldset" fullWidth>
                <div className={classes.checkBoxContainer}>
                  <Checkbox checked={terms} onChange={this.handleTermsChange('terms')} value="terms" color="primary" />
                  <div>I agree to the <a className={classes.linkTerms} href={"/terms"} target="_blank" rel="noopener noreferrer">terms of use</a> and <a className={classes.linkTerms} href={"/privacy"} target="_blank" rel="noopener noreferrer">privacy policy</a>.</div>
                </div>

                {termsError ? <FormHelperText className={classes.formHelperText} error>You must agree to the terms of use and privacy policy to proceed.</FormHelperText> : <div />}
              </FormControl>

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
                      'Create account'
                    )}
                </Button>

                <div className={classes.linkContainer}>
                  <div />
                  <a className={classes.link} href={"/signin"}>Existing account? Sign in now</a>
                </div>

              </div>
            }
        </Paper>
        <div className={classes.footer}>
          <Footer />
        </div>
        <CustomSnackbar variant={snackbarVariant} message={snackbarMessage} open={snackbarIsOpen} onSnackBarClose={this.onSnackBarClose}/>
      </div>
    )
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Signup)