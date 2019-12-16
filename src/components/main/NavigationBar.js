import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { useMediaQuery } from 'react-responsive'
import { withStyles } from '@material-ui/core/styles'
import { palette } from '../../constants/styles'
import logoIcon from '../../images/logo-full.png'
import menuIcon from '../../images/menu.svg'
import closeIcon from '../../images/close.svg'
import bitcoinIcon from '../../images/bitcoin.svg'
import Footer from './Footer'

var QRCode = require('qrcode.react')

const options = ["Wallet", "Buy Bitcoin", "Education", "Resources", "Sign out"]

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  return isMobile ? children : null
}

const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 })
  return isNotMobile ? children : null
}

const styles = {
  button: {
    color: palette.gray[1],
    padding: '0 15px 0 15px',
    textDecoration: 'none'
  },

  selectedButton: {
    color: palette.blue[0],
    padding: '0 15px 0 15px',
    textDecoration: 'underline'
  },

  container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },

  appBarContainer: {
    alignItems: 'center',
    background: palette.black[-1],
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: '80px',
    width: '100%',

    '@media (min-width:500px)': {

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

  logoIcon: {
    margin: '0 0 0 20px',
    objectFit: 'contain',
    height: '30px',
  },

  bitcoinIcon: {
    opacity: 0.2,
    margin: '80px 0 20px 0',
    width: '100px'
  },

  menuOptionsContainer: {
    margin: '0 20px 0 0'
  },

  iconButton: {
    height: '30px',
    width: '30px',
  },

  menuIcon: {
    color: palette.blue[0],
    margin: '0 20px 0 0'
  },

  paperContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    width: '100%',

    '@media (min-width:780px)': {
      width: '80%',
    },
  },

  paper: {
    boxShadow: 'none',
    borderRadius: '5px',
    width: '100%',

    '@media (min-width:780px)': {
      border: '1px solid',
      borderColor: palette.gray[0],
      margin: '90px 0 50px 0',
      width: '500px'
    },
  },

  qrButtonContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '50px 20px 10px 20px',
    width: '100%'
  },

  qrButton: {
    height: '50px',
    width: '45%'
  },

  qrCode: {
    margin: '30px 0 20px 0'
  },

  address: {
    fontSize: '13px'
  },

  expandedOption: {
    alignItems: 'center',
    background: palette.black[-1],
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    height: '60px',
    width: '100vw'
  },

  expandedOptionTextUnselected: {
    color: palette.gray[1],
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '700',
    padding: '0 20px 0 20px'
  },

  expandedOptionTextSelected: {
    color: palette.blue[0],
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '700',
    padding: '0 20px 0 20px'
  }
}

class NavigationBar extends Component {
  state = {
    isExpanded: false,
    selectedOption: options[0]
  }

  handleOptionChange = (option) => {
    console.log("Option", option)
    this.setState({
      selectedOption: option
    })
  }

  handleMenuClick = () => {
    const { isExpanded } = this.state

    this.setState({
      isExpanded: !isExpanded
    })
  }

  render() {
    const { isExpanded, selectedOption } = this.state
    const { classes } = this.props

    return (
      <div className={classes.container}>
        <div className={classes.appBarContainer}>
          <img src={logoIcon} className={classes.logoIcon} alt="" />
          <Mobile>
            {
              isExpanded ?

                < IconButton aria-label="menu" className={classes.menuIcon} onClick={this.handleMenuClick}>
                  <img src={closeIcon} className={classes.iconButton} alt="" />
                </IconButton >

                :

                < IconButton aria-label="menu" className={classes.menuIcon} onClick={this.handleMenuClick}>
                  <img src={menuIcon} className={classes.iconButton} alt="" />
                </IconButton >
            }

          </Mobile>
          <Default>
            <div className={classes.menuOptionsContainer}>
              {
                options.map(function(option, i){
                  return (
                  <Button key={option} className={ option === selectedOption ? classes.selectedButton : classes.button } onClick={() => this.handleOptionChange(option)}>
                    {option}
                  </Button>
                  )
                }.bind(this))
              }
            </div>
          </Default>
        </div>
        <Mobile>
          {
            isExpanded ?
              options.map(function(option, i){
                return (
                  <div key={option} onClick={() => this.handleOptionChange(option)}>
                    <div className={classes.expandedOption}>
                      <div className={ option === selectedOption ? classes.expandedOptionTextSelected : classes.expandedOptionTextUnselected }>
                        {option}
                      </div>
                    </div>
                    <Divider />
                  </div>
                )
              }.bind(this))
              :
              <div />
          }

        </Mobile>
        <div className={classes.paperContainer}>
          <Paper className={classes.paper}>
            <div className={classes.contentContainer}>
              <Typography variant="h4" gutterBottom>
                Balance: 0 Sats
              </Typography>

              <QRCode className={classes.qrCode} size={200} value="1P4enaLERffNRpWcHqn5onmYDYZu4hr4p9" />
              <div className={classes.address}>1P4enaLERffNRpWcHqn5onmYDYZu4hr4p9</div>
              <div className={classes.qrButtonContainer}>
                <Button className={classes.qrButton} size="small" variant={'contained'} color="primary" onClick={this.handleOnClick}>
                  Copy address
                </Button>
                <Button className={classes.qrButton} size="small" variant={'contained'} color="primary" onClick={this.handleOnClick}>
                  Send funds
                </Button>
              </div>
            </div>
          </Paper>

          <Paper className={classes.paper}>
            <div className={classes.contentContainer}>
              <Typography variant="h4" gutterBottom>
                Recent transactions
              </Typography>
              <img src={bitcoinIcon} className={classes.bitcoinIcon} alt="" />
              No recent transactions
            </div>
          </Paper>
        </div>
        <Footer />
      </div>
    )
  }
}

NavigationBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NavigationBar)