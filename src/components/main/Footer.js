// React
import React, { Component } from 'react'

// Prop Types
import PropTypes from 'prop-types'

// Material UI
import Link from '@material-ui/core/Link'
import { withStyles } from '@material-ui/core/styles'

// Local
import { palette } from '../../constants/styles'
import twitterIcon from '../../images/twitter.svg'
import mailIcon from '../../images/mail.svg'

// Styles
const styles = ({
  container: {
    alignItems: 'center',
    background: palette.black[-2],
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'absolute',
    textAlign: 'center',
    top: '100%',
    width: '100%'
  },

  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: '50px 0 150px 0',
    width: '100%'
  },

  leftFooter: {
    fontSize: '14px',
    color: palette.white[0],
    margin: '25px 0 0 0',
    padding: '0 0 0 180px',

    '@media (max-width: 1400px)': {
      padding: '0 0 0 100px',
    },

    '@media (max-width: 1300px)': {
      padding: '0 0 0 50px',
    },

    '@media (max-width: 790px)': {
      padding: '0 0 0 40px',
    },

    '@media (max-width: 479px)': {
      padding: '0 0 0 25px',
    }
  },

  rightFooter: {
    alignItems: 'center',
    color: palette.white[0],
    display: 'flex',
    flexWrap: 'wrap',
    fontSize: '14px',
    padding: '10px 170px 0 0',

    '@media (max-width: 1400px)': {
      padding: '0 90px 0 40px',
    },

    '@media (max-width: 1300px)': {
      padding: '0 40px 0 40px',
    },

    '@media (max-width: 790px)': {
      padding: '0 30px 0 30px',
    },

    '@media (max-width: 479px)': {
      padding: '0 15px 0 15px',
    },
  },

  link: {
    fontSize: '14px',
    color: palette.white[0],
    margin: '15px 10px 0 10px',
  },

  linkWithIcon: {
    fontSize: '14px',
    color: palette.white[0],
    margin: 0,
  },

  linkIcon: {
    width: 12,
    heigh: 12,
    margin: '0 5px 0 0'
  },

  linkIconEmail: {
    color: palette.white[0],
    width: 14,
    heigh: 14,
    margin: '0 5px 0 0'
  },

  linkIconContainer: {
    alignItems: 'center',
    color: palette.white[0],
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: '15px 10px 0 10px'
  }

})

class Footer extends Component {
  render() {
    const { classes } = this.props

    return (
      <div className={classes.container}>
        <div className={classes.footer}>
          <div className={classes.leftFooter}>
            Copyright © 2019 Satstreet Inc. All rights reserved.
          </div>
          
          <div className={classes.rightFooter}>
            <div className={classes.linkIconContainer}>
              <img src={mailIcon} className={classes.linkIconEmail} alt="" />
              <Link className={classes.linkWithIcon} href={"/"} color="inherit" target="_blank">Support</Link>
            </div>
            <div className={classes.linkIconContainer}>
              <img src={twitterIcon} className={classes.linkIcon} alt="" />
              <Link className={classes.linkWithIcon} href={"https://twitter.com/satstreet"} color="inherit" target="_blank">Twitter</Link>
            </div>
            <Link className={classes.link} href={"/"} color="inherit" target="_blank">FAQ</Link>
            <Link className={classes.link} href={"/"} color="inherit" target="_blank">Terms of use</Link>
            <Link className={classes.link} href={"/"} color="inherit" target="_blank">Privacy policy</Link>
          </div>
          
        </div>
      </div>
    )
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Footer)