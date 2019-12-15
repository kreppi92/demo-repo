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

class Signup extends Component {
  state = {
    name: '',
    nameHelperText: '',
    nameError: false,
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
      nameHelperText: '',
      nameError: false,
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
    const { name, email, password } = this.state

    var nameHasError = false
    var nameErrorText = ""
    
    if (name === "") { 
      nameHasError = true
      nameErrorText = "Please enter your full name."
    }

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

    if (nameHasError || emailHasError || passwordHasError) {
      this.displayFormError(nameHasError, nameErrorText, emailHasError, emailErrorText, passwordHasError, passwordErrorText)
    } else {
      this.createAccount()
    }
  }

  displayFormError(nameHasError, nameErrorText, emailHasError, emailErrorText, passwordHasError, passwordErrorText) { 
    this.setState({
      nameError: nameHasError,
      nameHelperText: nameErrorText,
      emailError: emailHasError,
      emailHelperText: emailErrorText,
      passwordError: passwordHasError,
      passwordHelperText: passwordErrorText
    })
  }

  createAccount() { 
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
    const { name, nameHelperText, nameError, email, emailHelperText, emailError, password, passwordHelperText, passwordError, isLoading } = this.state

    return (
      <div className={classes.container}>
        <Paper className={classes.paper}>
          <div className={classes.contentContainer}>
            <img src={logoIcon} className={classes.logoIcon} alt="" />

            <Typography variant="h4" gutterBottom>
              Create an account
            </Typography>

            <TextField
              fullWidth
              error={nameError}
              className={classes.textField}
              id="outlined-name"
              label="Full name"
              name="name"
              type="name"
              helperText={nameHelperText}
              value={name}
              onChange={this.handleChange('name')}
              variant="outlined"
            />

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
        </Paper>
      </div>
    )
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Signup)