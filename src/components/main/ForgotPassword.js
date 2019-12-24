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

const styles = {
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

class ForgotPassword extends Component {
  state = {
    email: '',
    emailHelperText: '',
    emailError: false
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
      emailHelperText: '',
      emailError: false
    })
  }

  handleOnClick = event => {
    this.validateForms()
  }

  validateForms() { 
    const { email } = this.state

    var emailHasError = false
    var emailErrorText = ""
    
    if (email === "") { 
      emailHasError = true
      emailErrorText = "Please enter the email you used to create your account."
    }

    if (emailHasError) {
      this.displayFormError(emailHasError, emailErrorText)
    } else {
      this.recoverPassword()
    }
  }

  displayFormError(emailHasError, emailErrorText) { 
    this.setState({
      emailError: emailHasError,
      emailHelperText: emailErrorText
    })
  }

  recoverPassword() { 
    this.setState({ isLoading: true })

    setTimeout(
      function() {
        //this.props.completedSignIn()
      }.bind(this),
      1000,
    )
  }

  render() {
    const { classes } = this.props
    const { email, emailHelperText, emailError, isLoading } = this.state

    return (
      <div className={classes.container}>
        <Paper className={classes.paper}>
          <div className={classes.contentContainer}>
            <img src={logoIcon} className={classes.logoIcon} alt="" />

            <Typography variant="h4" gutterBottom>
              Account recovery
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
                'Send recovery email'
              )}
            </Button>

            <div className={classes.linkContainer}>
              <a className={classes.link} href={"/signin"}>Sign in</a>
              <a className={classes.link} href={"/create_account"}>Create an account</a>
            </div>

          </div>
        </Paper>
        <div className={classes.footer}>
          <Footer />
        </div>
      </div>
    )
  }
}

ForgotPassword.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ForgotPassword)