import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import { withStyles } from '@material-ui/core/styles'
import { palette } from '../../constants/styles'
import bitcoinIcon from '../../images/bitcoin.svg'
import closeIcon from '../../images/close.svg'
import Chart from './Chart'
import Deposit from './Transactions/Deposit'
import Transaction from './Transactions/Transaction'
import CustomSnackbar from '../shared/CustomSnackbar'

var QRCode = require('qrcode.react')

const EMAIL = "email"
const GIFT = "gift"

const styles = {
  address: {
    fontSize: '13px'
  },

  bitcoinIcon: {
    height: '100px',
    margin: '0 0 20px 0',
    opacity: 0.2,
    width: '100px'
  },

  cancelButton: {
    background: palette.red[0],
    margin: '25px 0 0 0',

    "&:hover": {
      background: palette.red[-1]
    }
  },

  confirmButton: {
    background: palette.green[0],

    "&:hover": {
      background: palette.green[-1]
    }
  },

  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: '100%',

    '@media (min-width:780px)': {
      width: '80%',
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

  dialogContent: {
    padding: '15px 20px 50px 20px'
  },

  dialogTitleContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    fontSize: '23px',
    fontWeight: 700,
    height: '60px',
    justifyContent: 'space-between',
    margin: '10px 0 30px 0',
    padding: '0 0 0 5px'
  },

  iconButton: {
    height: '30px',
    width: '30px'
  },

  closeIcon: {
    color: palette.blue[0],
    margin: '-5px -10px 0 0',
  },

  link: {
    color: palette.blue[0],
    fontWeight: 700,
    fontSize: '13px',
    textDecoration: 'none',
    margin: '5px 0 0 0',

    "&:hover": {
      textDecoration: 'underline'
    }
  },

  list: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    height: '340px',
    margin: '20px 0 0 0'
  },

  listEmpty: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '20px 0 0 0',
    overflow: 'auto',
    height: '340px'
  },

  paperOptions: {
    boxShadow: 'none',
    borderRadius: '5px',
    margin: '30px 0 0 0',
    minHeight: '500px',
    minWidth: '300px',
    width: '100%',

    '@media (min-width:780px)': {
      border: '1px solid',
      borderColor: palette.gray[0],
      margin: '10vh 0 10vh 0',
      width: '30%'
    },
  },

  paperChart: {
    boxShadow: 'none',
    borderRadius: '5px',
    minHeight: '500px',
    margin: '30px 0 80px 0',
    width: '100%',

    '@media (min-width:780px)': {
      border: '1px solid',
      borderColor: palette.gray[0],
      margin: '10vh 0 10vh 0',
      width: '50%'
    },

    '@media (min-width:900px)': {
      width: '55%'
    },

    '@media (min-width:1000px)': {
      width: '60%'
    },

    '@media (min-width:1200px)': {
      width: '65%'
    },
  },

  qrButtonContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: '40px 20px 0 20px',
    maxWidth: '400px',
    width: '100%'
  },

  qrButton: {
    height: '50px',
    margin: '0 0 15px 0',
    width: '100%'
  },

  qrCode: {
    margin: '60px 0 20px 0'
  },

  textSeperator: {
    alignItems: 'center',
    color: palette.blue[0],
    display: 'flex',
    flexDirection: 'column',
    fontSize: '18px',
    fontWeight: 700,
    height: '60px',
    justifyContent: 'center'
  },

  textField: {
    margin: '0 0 25px 0'
  }
}

class Wallet extends Component {
  state = {
    email: '',
    emailHelperText: '',
    emailError: false,
    amount: '',
    amountHelperText: '',
    amountError: false,
    sendDialogOpen: false,
    transactionListType: 'sent',
    transactionDialogOpen: false,
    pendingConfirmation: false,
    isLoading: false,
    transactionType: EMAIL,
    receivedList: [],
    sentList: [],
    depositList: [],
    snackbarIsOpen: false,
    snackbarVariant: 'success',
    snackbarMessage: ''
  }

  handleCopyCode = () => {
    this.setState({
      snackbarIsOpen: true,
      snackbarVariant: 'success',
      snackbarMessage: "Your wallet address was successfully copied."
    })
  }

  onSnackBarClose = () => {
    this.setState({
      snackbarIsOpen: false,
    })
  }

  handleChange = name => event => {
    event.preventDefault()

    this.setState({
      [name]: event.target.value,
      emailHelperText: '',
      emailError: false,
      amountHelperText: '',
      amountError: false
    })
  }

  handleTransactionSwitch = (event, newTransactionListType) => {
    this.setState({ transactionListType: newTransactionListType })
  }

  handleSendDialogClose = () => {
    this.setState({ sendDialogOpen: false })
  }

  handleSendFunds = () => {
    this.setState({ sendDialogOpen: true })
  }

  handleDownloadGiftReceipt = () => {
    this.validateForms(GIFT)
  }

  handleSendEmail = () => {
    this.validateForms(EMAIL)
  }

  handleCancelTransaction = () => {
    this.setState({ pendingConfirmation: false })
  }

  handleViewTransactions = () => {
    this.setState({ transactionDialogOpen: true })
  }

  handleTransactionDialogClose = () => {
    this.setState({ transactionDialogOpen: false })
  }

  handleConfirmTransaction = () => {
    const { transactionType } = this.state

    this.setState({ isLoading: true })

    setTimeout(
      function () {
        this.setState({
          sendDialogOpen: false,
          email: '',
          amount: '',
          pendingConfirmation: false,
          isLoading: false
        })

        // for gift
        if (transactionType === GIFT) {
          this.downloadGift()
        } 

      }.bind(this),
      1000,
    )
  }

  // Download the gift certificate
  downloadGift() {
    const { email, amount } = this.state

  }

  validateForms(type) {
    const { email, amount } = this.state

    var emailHasError = false
    var emailErrorText = ""

    if (email === "") {
      emailHasError = true
      emailErrorText = "Please enter a valid email."
    }

    var amountHasError = false
    var amountErrorText = ""

    if (amount === "") {
      amountHasError = true
      amountErrorText = "Please enter an amount."
    } else if (!/^\d+$/.test(amount)) {
      amountHasError = true
      amountErrorText = "This field should only contain numbers."
    }

    if (emailHasError || amountHasError) {
      this.displayFormError(emailHasError, emailErrorText, amountHasError, amountErrorText)
    } else {
      this.setState({
        transactionType: type,
        pendingConfirmation: true
      })
    }
  }

  displayFormError(emailHasError, emailErrorText, amountHasError, amountErrorText) {
    this.setState({
      emailError: emailHasError,
      emailHelperText: emailErrorText,
      amountError: amountHasError,
      amountHelperText: amountErrorText
    })
  }

  getTransactions() {
    const { transactionListType, sentList, receivedList, depositList } = this.state
    const { classes } = this.props

    if (transactionListType === "sent") {
      if (sentList.length === 0) {
        return(
          <div className={classes.listEmpty}>
            <img src={bitcoinIcon} className={classes.bitcoinIcon} alt="" />
            No sent transactions
          </div>
        )
      } else {
        return(
          <div className={classes.list}>
            {
              sentList.map((transaction, index) => 
                <Transaction key={index} transaction={transaction}/>
              )
            }
          </div>
        )
      }
    } else if (transactionListType === "received") {

      if (receivedList.length === 0) {
        return(
          <div className={classes.listEmpty}>
            <img src={bitcoinIcon} className={classes.bitcoinIcon} alt="" />
            No received transactions
          </div>
        )
      } else {
        return(
          <div className={classes.list}>
            {
              receivedList.map((transaction, index) => 
                <Transaction key={index} transaction={transaction}/>
              )
            }
          </div>
        )
      }
    } else if (transactionListType === "deposits") {
      if (depositList.length === 0) {
        return(
          <div className={classes.listEmpty}>
            <img src={bitcoinIcon} className={classes.bitcoinIcon} alt="" />
            No deposits
          </div>
        )
      } else {
        return(
          <div className={classes.list}>
            {
              depositList.map((deposit, index) => 
                <Deposit key={index} deposit={deposit}/>
              )
            }
          </div>
        )
      }
    }
  }

  render() {
    const { email, emailHelperText, emailError, amount, amountHelperText, amountError, sendDialogOpen, snackbarIsOpen, snackbarVariant, snackbarMessage, transactionListType, transactionDialogOpen, pendingConfirmation, isLoading } = this.state
    const { classes } = this.props

    return (
      <div className={classes.container}>
        <Paper className={classes.paperOptions}>
          <div className={classes.contentContainer}>
            <Typography variant="h4" gutterBottom>
              0 Sats
            </Typography>
              0 BTC - $0.00

            <QRCode className={classes.qrCode} color={palette.blue[0]} size={160} value="1P4enaLERffNRpWcHqn5onmYDYZu4hr4p9" />
            <div className={classes.address}>1P4enaLERffNRpWcHqn5onmYDYZu4hr4p9</div>
            <a className={classes.link} href={"#"} onClick={this.handleCopyCode}>Copy</a>
            <div className={classes.qrButtonContainer}>
              <Button className={classes.qrButton} size="small" variant={'contained'} color="primary" onClick={this.handleSendFunds}>
                Send
                </Button>
              <Button className={classes.qrButton} size="small" variant={'contained'} color="secondary" onClick={this.handleViewTransactions}>
                View transactions
                </Button>
            </div>
          </div>
        </Paper>

        <Paper className={classes.paperChart}>
          <Chart />
        </Paper>

        <Dialog onClose={this.handleSendDialogClose} open={sendDialogOpen} disableBackdropClick>
          <div className={classes.dialogContent}>

            {pendingConfirmation ?
              <div className={classes.dialogTitleContainer}>
                Confirm transaction
                  <div />
              </div>
              :
              <div className={classes.dialogTitleContainer}>
                Send

                <IconButton aria-label="menu" className={classes.closeIcon} onClick={this.handleSendDialogClose}>
                  <img src={closeIcon} className={classes.iconButton} alt="" />
                </IconButton >
              </div>
            }
            <TextField
              fullWidth
              disabled={pendingConfirmation}
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
              disabled={pendingConfirmation}
              error={amountError}
              className={classes.textField}
              id="outlined-amount"
              label="Amount in Sats"
              name="amount"
              helperText={amountHelperText}
              value={amount}
              onChange={this.handleChange('amount')}
              variant="outlined"
            />

            {
              pendingConfirmation ?

                <div>
                  <Button
                    className={classes.confirmButton}
                    size="large"
                    variant={'contained'}
                    fullWidth
                    onClick={this.handleConfirmTransaction}
                  >
                    {isLoading ? (
                      <CircularProgress
                        variant="indeterminate"
                        disableShrink
                        size={24}
                        thickness={4}
                      />
                    ) : (
                        'Confirm transaction'
                      )}
                  </Button>

                  <Button
                    disabled={isLoading}
                    className={classes.cancelButton}
                    size="large"
                    variant={'contained'}
                    fullWidth
                    onClick={this.handleCancelTransaction}
                  >
                    Cancel
                </Button>
                </div>

                :

                <div>
                  <Button
                    className={classes.button}
                    size="large"
                    variant={'contained'}
                    color="primary"
                    fullWidth
                    onClick={this.handleSendEmail}
                  >
                    Send email
                </Button>

                  <div className={classes.textSeperator}>
                    Or
                </div>

                  <Button
                    className={classes.button}
                    size="large"
                    variant={'contained'}
                    color="primary"
                    fullWidth
                    onClick={this.handleDownloadGiftReceipt}
                  >
                    Download gift receipt
                </Button>
                </div>
            }
          </div>
        </Dialog>

        <Dialog fullWidth onClose={this.handleTransactionDialogClose} open={transactionDialogOpen} disableBackdropClick>
          <div className={classes.dialogContent}>
            <div className={classes.dialogTitleContainer}>
              Transactions
              
              <IconButton aria-label="menu" className={classes.closeIcon} onClick={this.handleTransactionDialogClose}>
                <img src={closeIcon} className={classes.iconButton} alt="" />
              </IconButton >
            </div>

            <ToggleButtonGroup
              value={transactionListType}
              exclusive
              onChange={this.handleTransactionSwitch}
            >
              <ToggleButton value="sent">
                Sent
              </ToggleButton>
              <ToggleButton value="received">
                Received
              </ToggleButton>
              <ToggleButton value="deposits">
                Deposits
              </ToggleButton>
            </ToggleButtonGroup>
            
            { this.getTransactions() }

          </div>
        </Dialog>

        <CustomSnackbar variant={snackbarVariant} message={snackbarMessage} open={snackbarIsOpen} onSnackBarClose={this.onSnackBarClose}/>

      </div>
    )
  }
}

Wallet.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Wallet)