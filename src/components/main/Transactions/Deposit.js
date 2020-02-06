import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core/styles'
import { palette } from '../../../constants/styles'

const moment = require('moment')

const styles = {
  blueText: {
    color: palette.blue[0],
    fontWeight: 700
  },

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
    minHeight: '80px',
    width: '100%'
  },

  greenText: {
    color: palette.green[0],
    fontWeight: 700
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
      fontSize: '13px',
    },

    '@media (max-width:360px)': {
      fontSize: '12px',
    }
  },

  bottomLeftContent: {
    fontSize: '12px',

    '@media (max-width:780px)': {
      fontSize: '10px',
    },

    '@media (max-width:480px)': {
      fontSize: '8px',
    },

    '@media (max-width:360px)': {
      fontSize: '6px',
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

class Deposit extends Component {
  state = {
  }

  render() {
    const { classes, deposit } = this.props

    return (
      <div className={classes.container}>
        <div className={classes.contentContainer}>
          <div className={classes.leftContent}>
            <div className={classes.topLeftContent}>{moment(deposit.date).format("MMM D, YYYY")} {deposit.state === "confirmed" ? <span className ={classes.greenText}> • Confirmed</span> : <span className ={classes.blueText}> • Pending</span>}</div>
             <div className={classes.bottomLeftContent}>{deposit.inputs[0].address}</div>
          </div>
          <div className={classes.rightContent}>
            {deposit.valueString} Sats
        </div>
        </div>
        <Divider />
      </div>
    )
  }
}

Deposit.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Deposit)