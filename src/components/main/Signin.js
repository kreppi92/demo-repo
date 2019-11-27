import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import { palette } from '../../constants/styles'

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center'
  },

  paper: {
    position: 'absolute',
    width: '100%',
    boxShadow: 'none',
    zIndex: 1,
    borderRadius: '5px',

    '@media (min-width:780px)': {
      top: '20%',
      width: '800px',
      border: '1px solid',
      borderColor: palette.gray[0]
    },
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

  textField: {
    width: '100%',
    marginTop: '25px'
  },

  button: {
    marginTop: '30px'
  }
}

class Signin extends Component {
  state = {
    email: '',
    emailHelperText: '',
    emailError: false,
    password: '',
    passwordHelperText: '',
    passwordError: false
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
      emailErrorText = "Please enter a valid email"
    }

    var passwordHasError = false
    var passwordErrorText = ""

    if (password === "") { 
      passwordHasError = true
      passwordErrorText = "Please enter a password"
    }

    if (emailHasError === true || passwordHasError === true) {
      this.displayFormError(emailHasError, emailErrorText, passwordHasError, passwordErrorText)
    } else {
      this.signUserIn()
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

  signUserIn() { 
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
    const { email, emailHelperText, emailError, password, passwordHelperText, passwordError, isLoading } = this.state

    return (
      <div className={classes.container}>
        <Paper className={classes.paper}>
          <div className={classes.contentContainer}>
            <Typography variant="h4" gutterBottom>
              Satstreet
            </Typography>

            <TextField
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
                'Sign In'
              )}
            </Button>
          </div>
        </Paper>
      </div>
    )
  }
}

Signin.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Signin)