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

const queryString = require('query-string')

const styles = {
  button: {
    margin: '30px 0 0 0'
  },

  viewLoader: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    height: '300px'
  },

  viewCircularProgress: {
    color: palette.blue[0]
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

class ResetPassword extends Component {
  state = {
    password: '',
    passwordHelperText: '',
    passwordError: false,
    password2: '',
    password2HelperText: '',
    password2Error: false,
    isLoading: false,
    isViewLoading: true,
    isFailedView: false
  }

  componentDidMount() {
    const parsed = queryString.parse(window.location.search)
    console.log(parsed.reset)

    if (parsed.reset === "") {
      this.setState({
        isViewLoading: false,
        isFailedView: true
      })
    } else {
      var isLinkValid = Firebase.functions().httpsCallable('isLinkValid')
      isLinkValid({ token: parsed.reset }).then(function (result) {
        console.log(result.data)
        if (result.data.success) {
          this.setState({
            isViewLoading: false,
            isFailedView: false
          })
        } else {
          this.setState({
            isViewLoading: false,
            isFailedView: true
          })
        }
      }.bind(this))
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
      passwordHelperText: '',
      passwordError: false,
      password2HelperText: '',
      password2Error: false
    })
  }

  handleOnClick = event => {
    this.validateForms()
  }

  validateForms() {
    const { password, password2 } = this.state

    var passwordHasError = false
    var passwordErrorText = ""

    if (password === "") {
      passwordHasError = true
      passwordErrorText = "Please enter a password."
    }

    var password2HasError = false
    var password2ErrorText = ""

    if (password2 === "") {
      password2HasError = true
      password2ErrorText = "Please confirm your password."
    }

    if (passwordHasError || password2HasError) {
      this.displayFormError(passwordHasError, passwordErrorText, password2HasError, password2ErrorText)
    } else {
      this.resetPassword()
    }
  }

  displayFormError(passwordHasError, passwordErrorText, password2HasError, password2ErrorText) {
    this.setState({
      passwordError: passwordHasError,
      passwordHelperText: passwordErrorText,
      password2Error: password2HasError,
      password2HelperText: password2ErrorText
    })
  }

  resetPassword() {
    this.setState({ isLoading: true })

    setTimeout(
      function () {
        //this.props.completedSignIn()
      }.bind(this),
      1000,
    )
  }

  render() {
    const { classes } = this.props
    const { password, passwordHelperText, passwordError, password2, password2HelperText, password2Error, isLoading, isFailedView, isViewLoading } = this.state

    return (
      <div className={classes.container}>
        <Paper className={classes.paper}>
          {
            isViewLoading ?

              <div className={classes.viewLoader}>
                <CircularProgress
                  className={classes.viewCircularProgress}
                  variant="indeterminate"
                  disableShrink
                  size={24}
                  thickness={4}
                />
              </div>

              :

              isFailedView ?

                <div className={classes.contentContainer}>
                  <img src={logoIcon} className={classes.logoIcon} alt="" />

                  <Typography variant="h4" gutterBottom>
                    This link has expired and is in valid.
                </Typography>

                  <div className={classes.linkContainer}>
                    <a className={classes.link} href={"/forgot_password"}>Forgot password?</a>
                    <a className={classes.link} href={"/signin"}>Sign in</a>
                  </div>

                </div>

                :

                <div className={classes.contentContainer}>
                  <img src={logoIcon} className={classes.logoIcon} alt="" />

                  <Typography variant="h4" gutterBottom>
                    Enter your new password
                </Typography>

                  <TextField
                    onKeyPress={this.onKeyPress}
                    fullWidth
                    error={passwordError}
                    className={classes.textField}
                    id="outlined-password"
                    label="Enter Password"
                    name="password"
                    type="password"
                    value={password}
                    helperText={passwordHelperText}
                    onChange={this.handleChange('password')}
                    variant="outlined"
                  />

                  <TextField
                    onKeyPress={this.onKeyPress}
                    fullWidth
                    error={password2Error}
                    className={classes.textField}
                    id="outlined-password2"
                    label="Confirm Password"
                    name="password2"
                    type="password"
                    value={password2}
                    helperText={password2HelperText}
                    onChange={this.handleChange('password2')}
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
                        'Reset password'
                      )}
                  </Button>
                </div>
          }

        </Paper>
        <div className={classes.footer}>
          <Footer />
        </div>
      </div>
    )
  }
}

ResetPassword.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ResetPassword)