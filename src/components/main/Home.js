import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useMediaQuery } from "react-responsive";
import { withStyles } from "@material-ui/core/styles";
import { palette } from "../../constants/styles";
import logoIcon from "../../images/logo-full.png";
import menuIcon from "../../images/menu.svg";
import closeIcon from "../../images/close.svg";
import CustomSnackbar from "../shared/CustomSnackbar";
import Footer from "./Footer";
import Wallet from "./Wallet";
import axios from 'axios'


var store = require("store");

const options = ["Currency", "Wallet", "Education", "Sign out"];

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? children : null;
};

const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 });
  return isNotMobile ? children : null;
};

const styles = {
  appBarContainer: {
    alignItems: "center",
    background: palette.black[-1],
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    height: "80px",
    width: "100%",
  },

  button: {
    color: palette.gray[1],
    padding: "0 15px 0 15px",
    textDecoration: "none",
  },

  container: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  },

  divider: {
    width: "100%",
  },

  footer: {
    width: "100%",
  },

  logoIcon: {
    margin: "0 0 0 30px",
    objectFit: "contain",
    height: "30px",
  },

  menuOptionsContainer: {
    margin: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  iconButton: {
    height: "30px",
    width: "30px",
  },

  menuIcon: {
    color: palette.blue[0],
    margin: "0 20px 0 0",
  },

  expandedOption: {
    alignItems: "center",
    background: palette.black[-1],
    cursor: "pointer",
    display: "flex",
    flexDirection: "row",
    height: "60px",
    width: "100vw",
  },

  expandedOptionTextUnselected: {
    color: palette.gray[1],
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "700",
    padding: "0 20px 0 20px",
  },

  expandedOptionTextSelected: {
    color: palette.blue[0],
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "700",
    padding: "0 20px 0 20px",
  },

  mainContent: {
    alignItems: "center",
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column",
    width: "100%",
    "@media (min-width:780px)": {
      marginTop: "100px",
    },
  },

  selectedButton: {
    color: palette.blue[0],
    padding: "0 15px 0 15px",
    textDecoration: "underline",
  },

  select: {
    margin: "12px 5px 0 0",
    verticalAlign: "center",
    background: palette.black[-1],
    fontSize: "15px",
  },

  selectMobile: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: 0,
    verticalAlign: "center",
    background: palette.black[-1],
    height: "20px",
    width: "100vw",
  },
};

const currencies = ["USD", "CAD", "EUR"];


class Home extends Component {
  componentWillMount() {
    if (!store.get("token")) {
      window.location = "/signin";
    }
  }

  state = {
    isExpanded: false,
    selectedOption: options[1],
    currency: null,
    currencyOption: null,
    snackbarIsOpen: false,
  };

  componentDidMount() {
    const getUserCountry = async () => {
      const locale = (await axios.get('https://ipapi.co/json/')).data
      if (locale.in_eu === true) {
        this.setState({
          currencyOption: 2,
          currency: currencies[2],
        });
      } else if (locale.country === "CA") {
        this.setState({
          currencyOption: 1,
          currency: currencies[1],
        });
      } else {
        this.setState({
          currencyOption: 0,
          currency: currencies[0],
        });
      }
    }
    getUserCountry()
  }

  handleCurrencyChange = (name) => (event) => {
    this.setState({
      currencyOption: event.target.value,
      currency: currencies[event.target.value],
    });
  };

  onSnackBarClose = () => {
    this.setState({
      snackbarIsOpen: false,
    });
  };

  handleOptionChange = (option) => {
    if (option === "Sign out") {
      store.clearAll();
      window.location = "/signin";
    } else if (option === "Education") {
      this.setState({
        snackbarIsOpen: true,
      });
    } else {
      this.setState({ selectedOption: option });
    }

    this.setState({
      isExpanded: false,
    });
  };

  handleMenuClick = () => {
    const { isExpanded } = this.state;

    this.setState({
      isExpanded: !isExpanded,
    });
  };

  render() {
    const {
      currency,
      currencyOption,
      isExpanded,
      selectedOption,
      snackbarIsOpen,
    } = this.state;
    const { classes } = this.props;

    return (
      <div>
        {store.get("token") ? (
          <div className={classes.container}>
            <div className={classes.appBarContainer}>
              <img src={logoIcon} className={classes.logoIcon} alt="" />
              <Mobile>
                {isExpanded ? (
                  <IconButton
                    aria-label="menu"
                    className={classes.menuIcon}
                    onClick={this.handleMenuClick}
                  >
                    <img
                      src={closeIcon}
                      className={classes.iconButton}
                      alt=""
                    />
                  </IconButton>
                ) : (
                    <IconButton
                      aria-label="menu"
                      className={classes.menuIcon}
                      onClick={this.handleMenuClick}
                    >
                      <img src={menuIcon} className={classes.iconButton} alt="" />
                    </IconButton>
                  )}
              </Mobile>
              <Default>
                <div className={classes.menuOptionsContainer}>
                  {options.map(
                    function (option, i) {
                      if (i === 0) {
                        return (
                          <FormControl>
                            <Select
                              disableUnderline
                              value={currencyOption}
                              onChange={this.handleCurrencyChange("currency")}
                            >
                              {currencies.map((currency, index) => (
                                <MenuItem value={index}>{currency}</MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        );
                      } else {
                        return (
                          <Button
                            key={option}
                            className={
                              option === selectedOption
                                ? classes.selectedButton
                                : classes.button
                            }
                            onClick={() => this.handleOptionChange(option)}
                          >
                            {option}
                          </Button>
                        );
                      }
                    }.bind(this)
                  )}
                </div>
              </Default>
            </div>
            <Mobile>
              {isExpanded ? (
                options.map(
                  function (option, i) {
                    if (i === 0) {
                      return (
                        <div className={classes.selectMobile}>
                          <Select
                            disableUnderline
                            value={currencyOption}
                            onChange={this.handleCurrencyChange("currency")}
                          >
                            {currencies.map((currency, index) => (
                              <MenuItem value={index}>{currency}</MenuItem>
                            ))}
                          </Select>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={option}
                          onClick={() => this.handleOptionChange(option)}
                        >
                          <div className={classes.expandedOption}>
                            <div
                              className={
                                option === selectedOption
                                  ? classes.expandedOptionTextSelected
                                  : classes.expandedOptionTextUnselected
                              }
                            >
                              {option}
                            </div>
                          </div>
                          <Divider />
                        </div>
                      );
                    }
                  }.bind(this)
                )
              ) : (
                  <Divider className={classes.divider} />
                )}
            </Mobile>
            <Default>
              <Divider className={classes.divider} />
            </Default>

            <div className={classes.mainContent}>
              {currency && <Wallet currency={currency} type={selectedOption} />}
            </div>

            <div className={classes.footer}>
              <Footer />
            </div>
          </div>
        ) : (
            <div />
          )}
        <CustomSnackbar
          variant={"info"}
          message={"Coming soon!"}
          open={snackbarIsOpen}
          onSnackBarClose={this.onSnackBarClose}
        />
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
