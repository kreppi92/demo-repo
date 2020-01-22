import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core/styles'

const moment = require('moment')

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
  },

  contentContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '80px',
    width: '100%'
  },

  leftContent: {
    display: 'flex',
    flexDirection: 'column',
  },

  topLeftContent: {
    fontSize: '15px',
    margin: '0 0 5px 0',

    '@media (max-width:780px)': {
      fontSize: '14px',
    },

    '@media (max-width:480px)': {
      fontSize: '10px',
    },

    '@media (max-width:360px)': {
      fontSize: '8px',
    }
  },

  bottomLeftContent: {
    fontSize: '12px',

    '@media (max-width:780px)': {
      fontSize: '10px',
    }
  },

  rightContent: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    fontSize: '15px',
    fontWeight: 700,

    '@media (max-width:780px)': {
      fontSize: '14px',
    },

    '@media (max-width:480px)': {
      fontSize: '12px',
    },

    '@media (max-width:360px)': {
      fontSize: '10px',
    }
  }
}

class Withdraw extends Component {
  render() {
    const { classes, withdrawal } = this.props

    return (
      <div className={classes.container}>
        <div className={classes.contentContainer}>
          <div className={classes.leftContent}>
            <div className={classes.topLeftContent}>{withdrawal.address}</div>
            <div className={classes.bottomLeftContent}>{moment.utc(withdrawal.date._seconds * 1000).format("MMM D, YYYY")}</div>
          </div>
          <div className={classes.rightContent}>
            {withdrawal.amount} Sats
        </div>
        </div>
        <Divider />
      </div>
    )
  }
}

Withdraw.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Withdraw)