import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";
import Firebase from "../../constants/firebase";
import { withStyles } from "@material-ui/core/styles";
import { palette } from "../../constants/styles";

var store = require("store");

// Styles
const styles = {
  bold: {
    fontSize: "16px",
    fontWeight: 700
  },

  circularProgress: {
    color: palette.blue[0]
  },

  button: {
    height: "50px",
    margin: "15px 0 25px 0",
    width: "80%"
  },

  container: {
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
    margin: "10px 0 10px 0",
    width: "calc(100% / 4)",

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
    justifyContent: "flex-start",
    width: "90%"
  },

  image: {
    width: "60%",
    height: "100px",
    margin: "10px 10px 5px 10px",
    objectFit: "scale-down"
  },

  title: {
    fontSize: "16px",
    fontWeight: 600,
    margin: "5px 10px 10px 10px"
  },

  subtitle: {
    color: palette.gray[2],
    fontSize: "15px",
    fontWeight: 500,
    textAlign: "center",
    margin: "10px 10px 10px 10px"
  }
};

class Earn extends Component {
  state = {
    earns: [],
    isLoading: false
  };

  componentDidMount() {
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

  handleClickLink = index => e => {
    const { earns } = this.state;

    window.open(earns[index].link, "_blank");
  };

  render() {
    const { earns, isLoading } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.container}>
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
            return (
              <div className={classes.outerBox} key={index}>
                <div className={classes.innerBox}>
                  <img src={earn.imageUrl} className={classes.image} alt="" />
                  <div className={classes.title}>{earn.reward}</div>
                  <div className={classes.subtitle}>
                    {earn.preMessaging}
                    <span className={classes.bold}> {earn.satValue} </span>
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
      </div>
    );
  }
}

Earn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Earn);
