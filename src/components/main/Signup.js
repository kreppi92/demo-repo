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

const styles = {
  boldText: {
    fontWeight: 700
  },

  button: {
    margin: '30px 0 0 0'
  },

  container: {
    display: 'flex',
    justifyContent: 'center'
  },

  contentContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px 20px 40px 20px',

    '@media (min-width:780px)': {
      padding: '40px 40px 40px 40px',
    },
  },

  paper: {
    position: 'absolute',
    width: '100%',
    boxShadow: 'none',
    borderRadius: '5px',

    '@media (min-width:780px)': {
      top: '20%',
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
    margin: '25px 0 0 0',
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
  },

  verificationText: {
    fontSize: '15px',
    margin: '30px 0 40px 0',
    letterSpacing: 0.3,
    lineHeight: '20px',
  }
}

class Signup extends Component {
  state = {
    email: '',
    emailHelperText: '',
    emailError: false,
    password: '',
    passwordHelperText: '',
    passwordError: false,
    verificationSent: false
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
      this.createAccount(email, password)
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

  createAccount = (email, password) => {
    this.setState({ isLoading: true })

    var signUp = Firebase.functions().httpsCallable('signUp')
    signUp({ email: email, password: password }).then(function (result) {
      if (result.data.success) {
        this.sendEmail()
      } else {
        alert(result.data.error)
        this.setState({ isLoading: false })
      }
    }.bind(this))
  }

  sendEmail = () => {
    const { email } = this.state

    var sendEmail = Firebase.functions().httpsCallable('sendEmail')
    sendEmail({ email: email }).then(function (result) {
      if (result.data.success) {
        this.setState({ verificationSent: true})
      } else {
        alert(result.data.error)
      }

      this.setState({ isLoading: false })
    }.bind(this))
  }

  render() {
    const { classes } = this.props
    const { email, emailHelperText, emailError, password, passwordHelperText, passwordError, isLoading, verificationSent } = this.state

    return (
      <div className={classes.container}>
        <Paper className={classes.paper}>
          <div className={classes.contentContainer}>
            <img src={logoIcon} className={classes.logoIcon} alt="" />

            {
              verificationSent ?

              <div>
                <Typography variant="h4" gutterBottom>
                  Thank you for signing up.
                </Typography>

                <div className={classes.verificationText}>
                  We just sent a confirmation link to <span className={classes.boldText}>{email}</span>.<br /><br />If you did not receive it in your main inbox, please check your junk folder.
                </div>

                <div className={classes.linkContainerVerification}>
                  <a className={classes.link} href={"#"} onClick={this.sendEmail}>Resend confirmation email?</a>
                  <a className={classes.link} href={"/"}>Sign in</a>
                </div>
              </div>

              :

              <div>
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
                  <a className={classes.link} href={"/"}>Existing account? Sign in now</a>
                </div>

              </div>
            }
          </div>
        </Paper>
        <Footer />
      </div>
    )
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Signup)