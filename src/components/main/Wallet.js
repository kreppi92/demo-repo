import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { withStyles } from "@material-ui/core/styles";
import { palette } from "../../constants/styles";
import bitcoinIcon from "../../images/bitcoin.svg";
import closeIcon from "../../images/close.svg";
import bitgoLogo from "../../assets/bitgo-logo-vector.png";
import Chart from "./Chart";
import Deposit from "./Transactions/Deposit";
import Withdraw from "./Transactions/Withdraw";
import Transaction from "./Transactions/Transaction";
import Firebase from "../../constants/firebase";
import CustomSnackbar from "../shared/CustomSnackbar";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Certificate from "./Certificate";
import Earn from "./Earn";
var bitcoinConverter = require("bitcoin-units");
var currencyFormatter = require("currency-formatter");
var QRCode = require("qrcode.react");
var store = require("store");

const EMAIL = "email";
const GIFT = "gift";
var timerID = null;
var currency = "";

const styles = {
  address: {
    fontSize: "13px"
  },

  circularProgress: {
    color: palette.blue[0]
  },

  bitcoinIcon: {
    height: "100px",
    margin: "0 0 20px 0",
    opacity: 0.2,
    width: "100px"
  },

  cancelButton: {
    background: palette.red[0],
    margin: "25px 0 0 0",

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

  holdingContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%"
  },

  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    width: "100%",

    "@media (min-width:780px)": {
      width: "80%"
    }
  },

  contentContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    // padding: "40px 20px 40px 20px",

    "@media (min-width:780px)": {
      // padding: "40px 40px 40px 40px"
    }
  },

  dialogContent: {
    padding: "15px 20px 50px 20px"
  },

  dialogContentCentered: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },

  dialogTitleContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    fontSize: "23px",
    fontWeight: 700,
    marginBottom: "10px",
    justifyContent: "space-between",
    width: "100%"
  },

  iconButton: {
    height: "30px",
    width: "30px"
  },

  closeIcon: {
    color: palette.blue[0],
    margin: "-5px -10px 0 0"
  },

  link: {
    color: palette.blue[0],
    fontWeight: 700,
    fontSize: "13px",
    textDecoration: "none",
    margin: "5px 0 30px 0",

    "&:hover": {
      textDecoration: "underline"
    }
  },

  list: {
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    margin: "20px 0 0 0"
  },

  listEmpty: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: "20px 0 0 0",
    overflow: "auto",
    height: "340px"
  },

  paperOptions: {
    boxShadow: "none",
    borderRadius: "5px",
    margin: "30px 0 0 0",
    minHeight: "652px",
    minWidth: "300px",
    width: "100%",

    "@media (min-width:780px)": {
      border: "1px solid",
      borderColor: palette.gray[0],
      margin: "10vh 0 10vh 0",
      width: "30%"
    }
  },

  paperOptionsEmpty: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minHeight: "652px",
    minWidth: "300px",
    width: "100%",

    "@media (min-width:780px)": {
      border: "1px solid",
      borderColor: palette.gray[0],
      margin: "10vh 0 10vh 0",
      width: "30%"
    }
  },

  referrals: {
    boxShadow: "none",
    borderRadius: "5px",
    width: "100%",
    border: "1px solid",
    borderColor: palette.gray[0],
    padding: "10px",
    margin: "20px"
  },

  paperGrid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    boxShadow: "none",
    minHeight: "652px",
    width: "100%",
    border: "0px none",
    padding: 5,

    "@media (min-width:780px)": {
      border: "1px solid",
      borderColor: palette.gray[0],
      margin: "10vh 0 10vh 0",
      width: "50%"
    },

    "@media (min-width:900px)": {
      width: "55%"
    },

    "@media (min-width:1000px)": {
      width: "60%"
    },

    "@media (min-width:1200px)": {
      width: "65%"
    }
  },

  qrButtonContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    maxWidth: "400px",
    width: "100%"
  },

  qrButton: {
    height: "50px",
    margin: "0 0 15px 0",
    width: "100%"
  },

  qrCode: {
    margin: "20px 0px"
  },

  toggleButton: {
    fontSize: "7px",
    fontWeight: 700,

    "@media (min-width:364px)": {
      fontSize: "9px"
    },

    "@media (min-width:400px)": {
      fontSize: "10px"
    },

    "@media (min-width:500px)": {
      fontSize: "12px"
    }
  },

  textSeperator: {
    alignItems: "center",
    color: palette.blue[0],
    display: "flex",
    flexDirection: "column",
    fontSize: "18px",
    fontWeight: 700,
    height: "60px",
    justifyContent: "center"
  },

  textField: {
    margin: "0 0 25px 0"
  },

  currencySummary: {
    alignItems: "center",
    color: palette.gray[2],
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    fontWeight: "700",
    fontSize: "13px",
    margin: "-15px 0 20px 0"
  },

  paddingContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "25px",
    boxSizing: "border-box",
    width: "100%"
  },

  shareButton: {
    background: palette.green[2],
    height: "50px",
    margin: "0 0 15px 0",
    width: "100%",

    "&:hover": {
      background: palette.green[1]
    }
  },
  image: {
    maxWidth: "125px",
    height: "75px",
    margin: "10px",
    objectFit: "scale-down"
  },
  bitgoImage: {
    maxWidth: "100px",
    margin: "10px",
    objectFit: "scale-down"
  },
  earnRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    padding: 10,
    borderRadius: 3,
    margin: 10,
    "&:hover": {
      background: "#eee"
    }
  },
  earnCell: {
    width: "50%",
    height: "50px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: 10
  },
  bold: {
    fontSize: "16px",
    fontWeight: 700
  },

  circularProgress: {
    color: palette.blue[0]
  },

  button: {
    height: "50px",
    boxSizing: "border-box",
    width: "90%",
    marginBottom: 10
  },

  sendButton: {
    height: "50px",
    boxSizing: "border-box",
    width: "100%",
    marginBottom: 10
  },

  earnContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    margin: "50px 0 50px 0",
    width: "100%",

    "@media (min-width:780px)": {
      width: "80%"
    }
  },

  loadingHolder: {
    alignItems: "center",
    display: "flex",
    height: "652px",
    justifyContent: "center",
    width: "100vw"
  },

  outerBox: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    width: "calc(100% / 3 - 10px)",
    flexGrow: 0,
    margin: 5,
    flexBasis: "auto",

    "@media (max-width:780px)": {
      width: "calc(100% / 2)"
    },

    "@media (max-width:500px)": {
      width: "100%"
    }
  },

  innerBox: {
    alignItems: "center",
    border: "1px solid",
    borderColor: palette.blue[0],
    borderRadius: "5px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    height: "100%"
  },

  titleBox: {
    fontSize: "16px",
    fontWeight: 600,
    padding: 20,
    margin: "5px 10px 10px 10px"
  },

  subtitleBox: {
    color: palette.gray[2],
    fontSize: "15px",
    fontWeight: 500,
    textAlign: "center",
    margin: "10px 10px 10px 10px",
    flexGrow: 1
  }
};

class Wallet extends Component {
  state = {
    address: "",
    rate: 0,
    balance: "",
    email: "",
    emailHelperText: "",
    emailError: false,
    amount: "",
    amountHelperText: "",
    amountError: false,
    withdrawAddress: "",
    withdrawAddressHelperText: "",
    withdrawAddressError: false,
    withdrawAmount: "",
    withdrawAmountHelperText: "",
    withdrawAmountError: false,
    sendDialogOpen: false,
    withdrawDialogOpen: false,
    transactionListType: "sent",
    transactionDialogOpen: false,
    pendingConfirmation: false,
    pendingWithdrawal: false,
    isLoading: false,
    transactionType: EMAIL,
    receivedList: [],
    sentList: [],
    depositList: [],
    withdrawList: [],
    snackbarIsOpen: false,
    snackbarVariant: "success",
    snackbarMessage: "",
    growsurfId: "",
    referralUrl: "",
    completedDeposit: false,
    addFundsDialog: false,
    earns: []
  };

  componentWillReceiveProps(newProps) {
    const { address } = this.state;
    if (store.get("token") && address.length > 0) {
      currency = newProps.currency;
      this.getAllTransactions(store.get("token"), address);
    }
  }

  componentDidMount() {
    if (store.get("token")) {
      currency = this.props.currency;
      this.getWalletAddress(store.get("token"));
    }
    this.getEarns();
  }

  getEarns = () => {
    this.setState({ isLoading: true });
    var getEarn = Firebase.functions().httpsCallable("getEarn");
    return getEarn({ token: store.get("token") }).then(
      function(result) {
        if (result.data.success) {
          this.setState({
            earns: result.data.earns.sort((a, b) =>
              a.order > b.order ? 1 : -1
            )
          });
        }
        this.setState({ isLoading: false });
      }.bind(this)
    );
  };

  componentDidUnmount() {
    if (timerID) {
      clearInterval(timerID);
    }
  }

  handleClickLink = index => e => {
    const { earns } = this.state;

    window.open(earns[index].link, "_blank");
  };

  getWalletAddress = token => {
    var checkAddress = Firebase.functions().httpsCallable("checkAddress");
    checkAddress({ token: token }).then(
      function(result) {
        if (result.data.success) {
          this.getAllTransactions(token, result.data.address);
          this.setTransactionService(token, result.data.address);
        } else {
          this.displaySnackbar("error", result.data.error);
        }
      }.bind(this)
    );
  };

  setTransactionService = (token, address) => {
    timerID = setInterval(
      function() {
        this.getAllTransactions(token, address);
      }.bind(this),
      30000
    );
  };

  getAllTransactions = (token, address) => {
    var onChainTransactions = this.getOnchainTransactions(token, address);
    var sentTransactions = this.getSentTransactions(token);
    var receivedTransactions = this.getReceivedTransactions(token);
    var withdrawalTransactions = this.getWithdrawalTransactions(token);
    var currentRate = this.getRate();
    var getCurrentGrowsurfParticipant = this.getCurrentGrowsurfParticipant(
      token
    );

    Promise.all([
      onChainTransactions,
      sentTransactions,
      receivedTransactions,
      withdrawalTransactions,
      currentRate,
      getCurrentGrowsurfParticipant
    ]).then(responses => {
      const deposits = responses[0].transfers;
      const sentTransactions = responses[1];
      const receivedTransactions = responses[2];
      const withdrawalTransactions = responses[3];
      const currentRate = responses[4];

      var balance = 0;
      var updatedDeposits = [];

      deposits.map((deposit, index) => {
        if (deposit.state === "confirmed" && deposit.type === "receive") {
          balance += deposit.value;
          updatedDeposits.push(deposit);
        }
      });

      sentTransactions.map((sentTransaction, index) => {
        balance -= parseInt(sentTransaction.amount);
      });

      receivedTransactions.map((receivedTransaction, index) => {
        balance += parseInt(receivedTransaction.amount);
      });

      withdrawalTransactions.map((withdrawalTransaction, index) => {
        balance -= parseInt(withdrawalTransaction.amount);
      });

      this.setState({
        address: address,
        depositList: updatedDeposits,
        sentList: sentTransactions,
        receivedList: receivedTransactions,
        withdrawList: withdrawalTransactions,
        balance: balance,
        rate: parseFloat(currentRate)
      });
    });
  };

  getOnchainTransactions = (token, address) => {
    var getOnchainTransactions = Firebase.functions().httpsCallable(
      "getOnchainTransactions"
    );
    return getOnchainTransactions({ token: token, address: address }).then(
      function(result) {
        if (result.data.success) {
          return result.data.response;
        } else {
          return [];
        }
      }.bind(this)
    );
  };

  getSentTransactions = token => {
    var getSentTransactions = Firebase.functions().httpsCallable(
      "getSentTransactions"
    );
    return getSentTransactions({ token: token }).then(
      function(result) {
        if (result.data.success) {
          return result.data.transactions;
        } else {
          return [];
        }
      }.bind(this)
    );
  };

  getReceivedTransactions = token => {
    var getReceivedTransactions = Firebase.functions().httpsCallable(
      "getReceivedTransactions"
    );
    return getReceivedTransactions({ token: token }).then(
      function(result) {
        if (result.data.success) {
          return result.data.transactions;
        } else {
          return [];
        }
      }.bind(this)
    );
  };

  getWithdrawalTransactions = token => {
    var getWithdrawalTransactions = Firebase.functions().httpsCallable(
      "getWithdrawalTransactions"
    );
    return getWithdrawalTransactions({ token: token }).then(
      function(result) {
        if (result.data.success) {
          return result.data.withdrawals;
        } else {
          return [];
        }
      }.bind(this)
    );
  };

  getRate = () => {
    var getRate = Firebase.functions().httpsCallable("getRate");
    return getRate({ currency: currency }).then(
      function(result) {
        if (result.data.success) {
          return result.data.rate;
        } else {
          return [];
        }
      }.bind(this)
    );
  };

  getCurrentGrowsurfParticipant = token => {
    const { depositList } = this.state;

    var getGrowsurfParticipant = Firebase.functions().httpsCallable(
      "getGrowsurfParticipant"
    );
    return getGrowsurfParticipant({ token: token }).then(
      function(result) {
        console.log("Growsurf Get, ", result.data);
        if (result.data.success) {
          this.setState({
            growsurfId: result.data.growsurfId,
            referralUrl: result.data.referralUrl,
            completedDeposit: result.data.completedDeposit,
            referralCount: result.data.referralCount,
            referralRank: result.data.referralRank,
            referralMonthlyCount: result.data.referralMonthlyCount
          });
          return;
        } else {
          var hasCompletedDeposit = depositList.length > 0 ? true : false;
          var createGrowsurfParticipant = Firebase.functions().httpsCallable(
            "createGrowsurfParticipant"
          );
          return createGrowsurfParticipant({
            token: token,
            completedDeposit: hasCompletedDeposit,
            referId: store.get("referralID")
          }).then(
            function(result) {
              console.log("Growsurf Create, ", result.data);
              if (result.data.success) {
                this.setState({
                  growsurfId: result.data.growsurfId,
                  referralUrl: result.data.referralUrl,
                  completedDeposit: hasCompletedDeposit
                });
                return;
              } else {
                return;
              }
            }.bind(this)
          );
        }
      }.bind(this)
    );
  };

  displaySnackbar = (variant, message) => {
    this.setState({
      snackbarIsOpen: true,
      snackbarVariant: variant,
      snackbarMessage: message
    });
  };

  handleCopyCode = () => {
    this.setState({
      snackbarIsOpen: true,
      snackbarVariant: "success",
      snackbarMessage: "Your wallet address was successfully copied."
    });
  };

  handleCopyShareUrl = () => {
    this.setState({
      snackbarIsOpen: true,
      snackbarVariant: "success",
      snackbarMessage: "Your share link was successfully copied."
    });
  };

  onSnackBarClose = () => {
    this.setState({
      snackbarIsOpen: false
    });
  };

  handleChange = name => event => {
    event.preventDefault();

    this.setState({
      [name]: event.target.value,
      emailHelperText: "",
      emailError: false,
      amountHelperText: "",
      amountError: false,
      withdrawAddressError: false,
      withdrawAddressHelperText: "",
      withdrawAmountError: false,
      withdrawAmountHelperText: ""
    });
  };

  handleTransactionSwitch = (event, newTransactionListType) => {
    this.setState({ transactionListType: newTransactionListType });
  };

  handleSendDialogClose = () => {
    this.setState({
      sendDialogOpen: false
    });
  };

  handleWithdrawDialogClose = () => {
    this.setState({
      withdrawDialogOpen: false
    });
  };

  handleSendFunds = () => {
    this.setState({
      email: "",
      amount: "",
      sendDialogOpen: true
    });
  };

  handleWithdrawFunds = () => {
    this.setState({
      withdrawAddress: "",
      withdrawAmount: "",
      withdrawDialogOpen: true
    });
  };

  handleDownloadGiftReceipt = () => {
    this.validateForms(GIFT);
  };

  handleSendEmail = () => {
    this.validateForms(EMAIL);
  };

  handleCancelTransaction = () => {
    this.setState({ pendingConfirmation: false });
  };

  handleCancelWithdrawal = () => {
    this.setState({ pendingWithdrawal: false });
  };

  handleAddFundsModal = () => {
    this.setState({ addFundsOpen: !this.state.addFundsOpen });
  };

  handleViewTransactions = () => {
    this.setState({ transactionDialogOpen: true });
  };

  handleTransactionDialogClose = () => {
    this.setState({ transactionDialogOpen: false });
  };

  handleConfirmWithdrawal = () => {
    const { withdrawAddress, withdrawAmount, address } = this.state;
    const funds = Number(withdrawAmount) * 0.99;
    const fees = Number(withdrawAmount) * 0.01;

    this.setState({ isLoading: true });

    var withdrawFunds = Firebase.functions().httpsCallable("withdrawFunds");
    return withdrawFunds({
      token: store.get("token"),
      address: withdrawAddress,
      totalAmount: funds.toString()
    }).then(
      function(result) {
        if (result.data.success) {
          var postTransaction = Firebase.functions().httpsCallable(
            "postTransaction"
          );
          return postTransaction({
            token: store.get("token"),
            toEmail: "info@satstreet.com",
            amount: fees.toString(),
            type: "Fees"
          }).then(
            function(result) {
              this.displaySnackbar(
                "success",
                "Withdrawal successfully processed."
              );

              this.setState({
                withdrawDialogOpen: false,
                pendingWithdrawal: false,
                isLoading: false
              });

              this.getAllTransactions(store.get("token"), address);
            }.bind(this)
          );
        } else {
          this.displaySnackbar("error", result.data.error);

          this.setState({
            isLoading: false
          });
        }
      }.bind(this)
    );
  };

  handleConfirmTransaction = () => {
    const { transactionType, email, amount, address } = this.state;
    this.setState({ isLoading: true });

    var postTransaction = Firebase.functions().httpsCallable("postTransaction");
    return postTransaction({
      token: store.get("token"),
      toEmail: email,
      amount: amount,
      type: transactionType
    }).then(
      function(result) {
        if (result.data.success) {
          this.displaySnackbar("success", "Transaction successfully created.");

          if (transactionType === GIFT) {
            this.downloadGift();
          } else {
            this.sendEmail();
          }

          this.setState({
            sendDialogOpen: false,
            pendingConfirmation: false,
            isLoading: false
          });

          this.getAllTransactions(store.get("token"), address);
        } else {
          this.displaySnackbar("error", result.data.error);

          this.setState({
            isLoading: false
          });
        }
      }.bind(this)
    );
  };

  handleProcessWithdrawal = () => {
    const { withdrawAddress, withdrawAmount, balance } = this.state;

    var withdrawAddressHasError = false;
    var withdrawAddressErrorText = "";

    if (withdrawAddress === "" || withdrawAddress.length < 23) {
      withdrawAddressHasError = true;
      withdrawAddressErrorText = "Please enter a valid bitcoin address.";
    }

    var withdrawAmountHasError = false;
    var withdrawAmountErrorText = "";

    if (withdrawAmount === "") {
      withdrawAmountHasError = true;
      withdrawAmountErrorText = "Please enter an amount.";
    } else if (!/^\d+$/.test(withdrawAmount)) {
      withdrawAmountHasError = true;
      withdrawAmountErrorText = "This field should only contain numbers.";
    } else if (parseInt(withdrawAmount) > balance) {
      withdrawAmountHasError = true;
      withdrawAmountErrorText = "You cannot send more than your balance.";
    } else if (parseInt(withdrawAmount) < 3000) {
      withdrawAmountHasError = true;
      withdrawAmountErrorText = "The minimum withdrawal amount is 3000.";
    }

    if (withdrawAddressHasError || withdrawAmountHasError) {
      this.setState({
        withdrawAddressError: withdrawAddressHasError,
        withdrawAddressHelperText: withdrawAddressErrorText,
        withdrawAmountError: withdrawAmountHasError,
        withdrawAmountHelperText: withdrawAmountErrorText
      });
    } else {
      this.setState({
        pendingWithdrawal: true
      });
    }
  };

  sendEmail = () => {
    const { email, amount, growsurfId } = this.state;

    var referralID = "?grsf=" + growsurfId;

    var sendEmailReceipt = Firebase.functions().httpsCallable(
      "sendEmailReceipt"
    );
    return sendEmailReceipt({
      token: store.get("token"),
      toEmail: email,
      amount: amount,
      referralId: referralID
    }).then(
      function(result) {
        if (result.data.success) {
          this.displaySnackbar("success", "Your email receipt has been sent.");
        }
      }.bind(this)
    );
  };

  // Download the gift certificate
  downloadGift = async () => {
    const { email, amount } = this.state;
    const blob = await pdf(
      <Certificate email={email} amount={amount} />
    ).toBlob();
    saveAs(blob, "Certificate.pdf");
  };

  validateForms(type) {
    const { email, amount, balance } = this.state;

    var emailHasError = false;
    var emailErrorText = "";

    if (email === "") {
      emailHasError = true;
      emailErrorText = "Please enter a valid email.";
    }

    var amountHasError = false;
    var amountErrorText = "";

    if (amount === "") {
      amountHasError = true;
      amountErrorText = "Please enter an amount.";
    } else if (!/^\d+$/.test(amount)) {
      amountHasError = true;
      amountErrorText = "This field should only contain numbers.";
    } else if (parseInt(amount) > balance) {
      amountHasError = true;
      amountErrorText = "You cannot send more than your balance.";
    }

    if (emailHasError || amountHasError) {
      this.displayFormError(
        emailHasError,
        emailErrorText,
        amountHasError,
        amountErrorText
      );
    } else {
      this.setState({
        transactionType: type,
        pendingConfirmation: true
      });
    }
  }

  displayFormError(
    emailHasError,
    emailErrorText,
    amountHasError,
    amountErrorText
  ) {
    this.setState({
      emailError: emailHasError,
      emailHelperText: emailErrorText,
      amountError: amountHasError,
      amountHelperText: amountErrorText
    });
  }

  getTransactions() {
    const {
      transactionListType,
      sentList,
      receivedList,
      depositList,
      withdrawList
    } = this.state;
    const { classes } = this.props;

    if (transactionListType === "sent") {
      if (sentList.length === 0) {
        return (
          <div className={classes.listEmpty}>
            <img src={bitcoinIcon} className={classes.bitcoinIcon} alt="" />
            No sent transactions
          </div>
        );
      } else {
        return (
          <div className={classes.list}>
            {sentList.map((transaction, index) => (
              <Transaction key={index} transaction={transaction} />
            ))}
          </div>
        );
      }
    } else if (transactionListType === "received") {
      if (receivedList.length === 0) {
        return (
          <div className={classes.listEmpty}>
            <img src={bitcoinIcon} className={classes.bitcoinIcon} alt="" />
            No received transactions
          </div>
        );
      } else {
        return (
          <div className={classes.list}>
            {receivedList.map((transaction, index) => (
              <Transaction key={index} transaction={transaction} />
            ))}
          </div>
        );
      }
    } else if (transactionListType === "deposits") {
      if (depositList.length === 0) {
        return (
          <div className={classes.listEmpty}>
            <img src={bitcoinIcon} className={classes.bitcoinIcon} alt="" />
            No deposits
          </div>
        );
      } else {
        return (
          <div className={classes.list}>
            {depositList.map((deposit, index) => (
              <Deposit key={index} deposit={deposit} />
            ))}
          </div>
        );
      }
    } else if (transactionListType === "withdrawals") {
      if (withdrawList.length === 0) {
        return (
          <div className={classes.listEmpty}>
            <img src={bitcoinIcon} className={classes.bitcoinIcon} alt="" />
            No withdrawals
          </div>
        );
      } else {
        return (
          <div className={classes.list}>
            {withdrawList.map((withdrawal, index) => (
              <Withdraw key={index} withdrawal={withdrawal} />
            ))}
          </div>
        );
      }
    }
  }

  render() {
    const {
      address,
      balance,
      rate,
      email,
      emailHelperText,
      emailError,
      referralUrl,
      withdrawAddress,
      withdrawAddressError,
      withdrawAddressHelperText,
      withdrawAmount,
      withdrawAmountError,
      withdrawAmountHelperText,
      amount,
      amountHelperText,
      amountError,
      sendDialogOpen,
      withdrawDialogOpen,
      snackbarIsOpen,
      snackbarVariant,
      snackbarMessage,
      transactionListType,
      transactionDialogOpen,
      pendingConfirmation,
      pendingWithdrawal,
      isLoading,
      addFundsOpen,
      earns,
      referralCount,
      referralRank,
      referralMonthlyCount
    } = this.state;
    const { classes, type } = this.props;

    var btcBalance = bitcoinConverter(parseInt(balance), "satoshi").to("BTC");
    var formattedCurrency = currencyFormatter.format(rate * btcBalance, {
      code: currency
    });

    return (
      <div className={classes.holdingContainer}>
        {type === "Earn" ? (
          <Earn />
        ) : (
          <div className={classes.container}>
            {address !== "" ? (
              <Paper className={classes.paperOptions}>
                <div className={classes.contentContainer}>
                  <div className={classes.paddingContainer}>
                    <Typography variant="h4" gutterBottom>
                      {balance.toLocaleString()} Sats
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      {btcBalance.toLocaleString()} BTC - {formattedCurrency}
                    </Typography>
                    <Paper className={classes.referrals}>
                      <Typography variant="h6" component="h3">
                        Referrals
                      </Typography>
                      {!!referralCount ? (
                        <React.Fragment>
                          <Typography variant="body2" component="p">
                            {referralCount} total referrals
                          </Typography>
                          <Typography variant="body2" component="p">
                            {referralMonthlyCount} monthly referrals
                          </Typography>
                          <Typography variant="body2" component="p">
                            #{referralRank} rank on Satstreet
                          </Typography>
                        </React.Fragment>
                      ) : (
                        <Typography variant="body2" component="p">
                          No referrals yet. Try inviting some friends!
                        </Typography>
                      )}
                    </Paper>
                    <div className={classes.qrButtonContainer}>
                      <Button
                        className={classes.qrButton}
                        size="small"
                        variant={"contained"}
                        color="primary"
                        onClick={this.handleAddFundsModal}
                      >
                        Add funds
                      </Button>
                      <Button
                        className={classes.qrButton}
                        size="small"
                        variant={"contained"}
                        color="primary"
                        onClick={this.handleSendFunds}
                      >
                        Send
                      </Button>

                      <Button
                        className={classes.qrButton}
                        size="small"
                        variant={"contained"}
                        color="primary"
                        onClick={this.handleWithdrawFunds}
                      >
                        Withdraw
                      </Button>

                      <Button
                        className={classes.qrButton}
                        size="small"
                        variant={"contained"}
                        color="secondary"
                        onClick={this.handleViewTransactions}
                      >
                        View activity
                      </Button>

                      <CopyToClipboard text={referralUrl}>
                        <Button
                          className={classes.shareButton}
                          size="small"
                          variant={"contained"}
                          color="secondary"
                          onClick={this.handleCopyShareUrl}
                        >
                          Refer a friend
                        </Button>
                      </CopyToClipboard>
                    </div>
                  </div>
                  <Chart currency={currency} />
                </div>
              </Paper>
            ) : (
              <Paper className={classes.paperOptionsEmpty}>
                <CircularProgress
                  className={classes.circularProgress}
                  variant="indeterminate"
                  disableShrink
                  size={24}
                  thickness={4}
                />
              </Paper>
            )}

            <Paper className={classes.paperGrid}>
              {isLoading ? (
                <div className={classes.loadingHolder}>
                  <CircularProgress
                    className={classes.circularProgress}
                    variant="indeterminate"
                    disableShrink
                    size={24}
                    thickness={4}
                  />
                </div>
              ) : (
                earns.map((earn, index) => {
                  console.log(earn);
                  return (
                    <div className={classes.outerBox} key={index}>
                      <div className={classes.innerBox}>
                        <img
                          src={earn.imageUrl}
                          className={classes.image}
                          alt=""
                        />
                        <div className={classes.titleBox}>{earn.reward}</div>
                        <div className={classes.subtitleBox}>
                          {earn.preMessaging}
                          <span className={classes.bold}>
                            {" "}
                            {earn.satValue}{" "}
                          </span>
                          {earn.postMessaging}
                        </div>
                        <Button
                          className={classes.button}
                          size="small"
                          fullWidth
                          variant={"contained"}
                          color="primary"
                          onClick={this.handleClickLink(index)}
                        >
                          Earn
                        </Button>
                      </div>
                    </div>
                  );
                })
              )}
            </Paper>

            <Dialog open={addFundsOpen}>
              <div className={classes.dialogContent}>
                <div className={classes.dialogTitleContainer}>
                  Add Funds
                  <IconButton
                    aria-label="menu"
                    className={classes.closeIcon}
                    onClick={this.handleAddFundsModal}
                  >
                    <img
                      src={closeIcon}
                      className={classes.iconButton}
                      alt=""
                    />
                  </IconButton>
                </div>
                <Typography variant="h4" align="center">
                  Deposit Bitcoin
                </Typography>
                <div className={classes.dialogContentCentered}>
                  <img
                    src={bitgoLogo}
                    className={classes.bitgoImage}
                    alt="Bitgo logo"
                  />
                  <QRCode
                    className={classes.qrCode}
                    color={palette.blue[0]}
                    size={160}
                    value={address}
                  />
                  <div className={classes.address}>{address}</div>
                  <CopyToClipboard text={address}>
                    <a
                      className={classes.link}
                      href={"#"}
                      onClick={this.handleCopyCode}
                    >
                      Copy
                    </a>
                  </CopyToClipboard>
                </div>
                <Typography variant="h4" gutterBottom align="center">
                  Buy Bitcoin
                </Typography>
                <div className={classes.affiliateLinks}>
                  {earns.slice(0, 4).map((earn, index) => (
                    <div
                      className={classes.earnRow}
                      onClick={this.handleClickLink(index)}
                    >
                      <div className={classes.earnCell}>
                        <img
                          src={earn.imageUrl}
                          className={classes.image}
                          alt=""
                        />
                      </div>
                      <div className={classes.earnCell}>Earn {earn.reward}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Dialog>
            <Dialog
              onClose={this.handleWithdrawDialogClose}
              open={withdrawDialogOpen}
              disableBackdropClick
            >
              <div className={classes.dialogContent}>
                {pendingWithdrawal ? (
                  <div className={classes.dialogTitleContainer}>
                    Confirm withdrawal
                    <div />
                  </div>
                ) : (
                  <div className={classes.dialogTitleContainer}>
                    Withdraw
                    <IconButton
                      aria-label="close"
                      className={classes.closeIcon}
                      onClick={this.handleWithdrawDialogClose}
                    >
                      <img
                        src={closeIcon}
                        className={classes.iconButton}
                        alt=""
                      />
                    </IconButton>
                  </div>
                )}

                <TextField
                  fullWidth
                  disabled={pendingWithdrawal}
                  error={withdrawAddressError}
                  className={classes.textField}
                  id="outlined-withdraw-address"
                  label="Bitcoin Address"
                  type="text"
                  helperText={withdrawAddressHelperText}
                  value={withdrawAddress}
                  onChange={this.handleChange("withdrawAddress")}
                  variant="outlined"
                />

                <TextField
                  fullWidth
                  disabled={pendingWithdrawal}
                  error={withdrawAmountError}
                  className={classes.textField}
                  id="outlined-withdraw-amount"
                  label="Amount in Sats"
                  type="text"
                  helperText={withdrawAmountHelperText}
                  value={withdrawAmount}
                  onChange={this.handleChange("withdrawAmount")}
                  variant="outlined"
                />

                {pendingWithdrawal ? (
                  <div className={classes.currencySummary}>
                    All withdrawals are charged a 1% processing fee.
                  </div>
                ) : (
                  <div className={classes.currencySummary}>
                    {bitcoinConverter(parseInt(withdrawAmount), "satoshi")
                      .to("BTC")
                      .toString()}{" "}
                    BTC -{" "}
                    {currencyFormatter.format(
                      rate *
                        bitcoinConverter(
                          parseInt(withdrawAmount),
                          "satoshi"
                        ).to("BTC"),
                      { code: currency }
                    )}
                  </div>
                )}

                {pendingWithdrawal ? (
                  <div>
                    <Button
                      className={classes.confirmButton}
                      size="large"
                      variant={"contained"}
                      fullWidth
                      onClick={this.handleConfirmWithdrawal}
                    >
                      {isLoading ? (
                        <CircularProgress
                          variant="indeterminate"
                          disableShrink
                          size={24}
                          thickness={4}
                        />
                      ) : (
                        "Confirm withdrawal"
                      )}
                    </Button>

                    <Button
                      disabled={isLoading}
                      className={classes.cancelButton}
                      size="large"
                      variant={"contained"}
                      fullWidth
                      onClick={this.handleCancelWithdrawal}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Button
                      className={classes.sendButton}
                      size="large"
                      variant={"contained"}
                      color="primary"
                      fullWidth
                      onClick={this.handleProcessWithdrawal}
                    >
                      Withdraw
                    </Button>
                  </div>
                )}
              </div>
            </Dialog>

            <Dialog
              onClose={this.handleSendDialogClose}
              open={sendDialogOpen}
              disableBackdropClick
            >
              <div className={classes.dialogContent}>
                {pendingConfirmation ? (
                  <div className={classes.dialogTitleContainer}>
                    Confirm transaction
                    <div />
                  </div>
                ) : (
                  <div className={classes.dialogTitleContainer}>
                    Send
                    <IconButton
                      aria-label="menu"
                      className={classes.closeIcon}
                      onClick={this.handleSendDialogClose}
                    >
                      <img
                        src={closeIcon}
                        className={classes.iconButton}
                        alt=""
                      />
                    </IconButton>
                  </div>
                )}
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
                  onChange={this.handleChange("email")}
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
                  onChange={this.handleChange("amount")}
                  variant="outlined"
                />

                <div className={classes.currencySummary}>
                  {bitcoinConverter(parseInt(amount), "satoshi")
                    .to("BTC")
                    .toString()}{" "}
                  BTC -{" "}
                  {currencyFormatter.format(
                    rate *
                      bitcoinConverter(parseInt(amount), "satoshi").to("BTC"),
                    { code: currency }
                  )}
                </div>

                {pendingConfirmation ? (
                  <div>
                    <Button
                      className={classes.confirmButton}
                      size="large"
                      variant={"contained"}
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
                        "Confirm transaction"
                      )}
                    </Button>

                    <Button
                      disabled={isLoading}
                      className={classes.cancelButton}
                      size="large"
                      variant={"contained"}
                      fullWidth
                      onClick={this.handleCancelTransaction}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Button
                      className={classes.sendButton}
                      size="large"
                      variant={"contained"}
                      color="primary"
                      fullWidth
                      onClick={this.handleSendEmail}
                    >
                      Send email
                    </Button>

                    <div className={classes.textSeperator}>Or</div>

                    <Button
                      className={classes.sendButton}
                      size="large"
                      variant={"contained"}
                      color="primary"
                      fullWidth
                      onClick={this.handleDownloadGiftReceipt}
                    >
                      Download gift receipt
                    </Button>
                  </div>
                )}
              </div>
            </Dialog>

            <Dialog
              fullWidth
              onClose={this.handleTransactionDialogClose}
              open={transactionDialogOpen}
              disableBackdropClick
            >
              <div className={classes.dialogContent}>
                <div className={classes.dialogTitleContainer}>
                  Transactions
                  <IconButton
                    aria-label="menu"
                    className={classes.closeIcon}
                    onClick={this.handleTransactionDialogClose}
                  >
                    <img
                      src={closeIcon}
                      className={classes.iconButton}
                      alt=""
                    />
                  </IconButton>
                </div>

                <ToggleButtonGroup
                  value={transactionListType}
                  exclusive
                  onChange={this.handleTransactionSwitch}
                >
                  <ToggleButton className={classes.toggleButton} value="sent">
                    Sent
                  </ToggleButton>
                  <ToggleButton
                    className={classes.toggleButton}
                    value="received"
                  >
                    Received
                  </ToggleButton>
                  <ToggleButton
                    className={classes.toggleButton}
                    value="deposits"
                  >
                    Deposits
                  </ToggleButton>
                  <ToggleButton
                    className={classes.toggleButton}
                    value="withdrawals"
                  >
                    Withdrawals
                  </ToggleButton>
                </ToggleButtonGroup>

                {this.getTransactions()}
              </div>
            </Dialog>

            <CustomSnackbar
              variant={snackbarVariant}
              message={snackbarMessage}
              open={snackbarIsOpen}
              onSnackBarClose={this.onSnackBarClose}
            />
          </div>
        )}
      </div>
    );
  }
}

Wallet.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Wallet);
