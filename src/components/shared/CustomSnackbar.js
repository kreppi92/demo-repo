import React, { Component } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import CloseIcon from '@material-ui/icons/Close'
import { amber, green, red } from '@material-ui/core/colors'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import WarningIcon from '@material-ui/icons/Warning'
import { withStyles } from '@material-ui/core/styles'
import { palette } from '../../constants/styles'

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
}

const styles = {
  icon: {
    fontSize: 20,
  },

  iconVariant: {
    opacity: 0.9,
    marginRight: '10px',
  },

  message: {
    display: 'flex',
    alignItems: 'center',
  },

  success: {
    backgroundColor: green[600]
  },

  error: {
    backgroundColor: red[600]
  },

  info: {
    backgroundColor: palette.blue[0],
  },
  warning: {
    backgroundColor: amber[700],
  }
}

class CustomSnackbar extends Component {
  handleClose = () => {
    const { onSnackBarClose } = this.props

    onSnackBarClose()
  }

  render() {
    const { classes, variant, message, open } = this.props
    const Icon = variantIcon[variant]
    
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={this.handleClose}
      >
        <SnackbarContent
          className={clsx(classes[variant], classes.className)}
          message={
            <span id="client-snackbar" className={classes.message}>
              <Icon className={clsx(classes.icon, classes.iconVariant)} />
              {message}
            </span>
          }
          action={[
            <IconButton key="close" aria-label="close" color="inherit" onClick={this.handleClose}>
              <CloseIcon className={classes.icon} />
            </IconButton>
          ]}
        />
      </Snackbar>
    )
  } 
}

CustomSnackbar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CustomSnackbar)