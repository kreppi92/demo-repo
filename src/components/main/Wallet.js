// React
import React, { Component } from "react";

// Dependencies
import { PDFDownloadLink } from "@react-pdf/renderer";

// Prop Types
import PropTypes from "prop-types";

// Material UI
import { withStyles } from "@material-ui/core/styles";

// Import Components
import Certificate from "./Certificate";

const styles = {
  container: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
    width: "100%"
  }
};

class Wallet extends Component {
  state = {};

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        Wallet
        <PDFDownloadLink
          document={<Certificate email="test@test.com" amount="1000"/>}
          fileName="certificate.pdf"
        >
          Download Your Certificate
        </PDFDownloadLink>
        {/* <img src="https://firebasestorage.googleapis.com/v0/b/satstreet-27396.appspot.com/o/assets%2Fsat-street-min%20(1).png?alt=media&token=2f2c3bfa-132f-470d-b65f-fc5f6c698097"/> */}
      </div>
    );
  }
}

Wallet.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Wallet);
