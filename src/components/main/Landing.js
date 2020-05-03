// React
import React from "react";
import { Link } from "react-router-dom";

// Prop Types
import PropTypes from "prop-types";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";

// Motion SVG
import { motion } from "framer-motion";

// Assets
import Text from "../../assets/satstreet-text.svg";
import Screen from "../../assets/iphone-mask.png";
import Screenshot from "../../assets/screenshot.png";
import Laptop from "../../assets/dashboard.png";
import Referral from "../../assets/referral.jpg";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Footer from "./Footer";

const icon = {
  hidden: {
    opacity: 0,
    pathLength: 0,
    fill: "url(#white)"
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    fill: "url(#gradient)"
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minHeight: "100vh",
    minWidth: "100vw",
    alignItems: "center",
    overflowX: "hidden",
    background: "#eef2f3"
  },
  container: {
    width: "100%",
    minHeight: "95vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    flexGrow: 1,
    background: "linear-gradient(0deg, #eef2f3, #fff)"
  },
  container2: {
    width: "100%",
    minHeight: "600px",
    marginTop: -50,
    marginBottom: 100,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    flexGrow: 1
  },
  container3: {
    width: "100%",
    minHeight: "400px",
    marginTop: -50,
    marginBottom: 100,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    flexGrow: 1,
    backgroundImage: `linear-gradient(to bottom right, #0F2027 0%, #2C5364 100%)`
  },
  container4: {
    width: "100%",
    minHeight: "400px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    flexGrow: 1
  },
  container5: {
    width: "100%",
    minHeight: "400px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    flexGrow: 1,
    padding: 50,
    backgroundImage: `linear-gradient(to bottom right, #0F2027 0%, #2C5364 100%)`
  },
  textField: {
    width: "350px",
    background: "#fff",
    textAlign: "center"
  },
  title: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    padding: "10px 50px",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column"
    }
  },
  bodyTitle: {
    fontWeight: 500,
    lineHeight: 1.2,
    fontSize: "calc(1.125rem + 1.5vw)",
    marginBottom: "0.8rem"
  },
  bodyTitleWhite: {
    fontWeight: 500,
    lineHeight: 1.2,
    fontSize: "calc(1.125rem + 1.5vw)",
    marginBottom: "0.8rem",
    color: "#fff"
  },
  bodySubTitle: {
    opacity: 0.5
  },
  bodySubTitleWhite: {
    color: "#fff",
    opacity: 0.75
  },
  bodySubTitleBold: {
    fontWeight: 700,
    color: "#fff"
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    flexDirection: "column",
    zIndex: 5,
    padding: "0 50px"
  },
  copyLeft: {
    display: "flex",
    justifyContent: "center",
    alignItems: "left",
    textAlign: "left",
    flexDirection: "column",
    zIndex: 5,
    padding: "50px 150px 50px 50px",
    marginBottom: 50,
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      padding: "50px 25px",
      marginBottom: 0
    }
  },
  copyRight: {
    display: "flex",
    justifyContent: "center",
    alignItems: "left",
    textAlign: "left",
    flexDirection: "column",
    zIndex: 5,
    padding: "50px 50px 50px 150px",
    marginBottom: 50,
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
      textAlign: "center",
      alignItems: "center",
      padding: "50px 25px",
      marginBottom: 0
    }
  },
  videoSectionLeft: {
    display: "flex",
    justifyContent: "left",
    alignItems: "left",
    textAlign: "left",
    flexDirection: "column",
    zIndex: 5,
    padding: "0 50px",
    minHeight: 575,
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
      textAlign: "center",
      padding: 0
    }
  },
  mainSubtitle: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "2rem"
    }
  },
  videoSectionRight: {
    display: "flex",
    justifyContent: "right",
    alignItems: "right",
    textAlign: "right",
    flexDirection: "column",
    zIndex: 5,
    padding: "0 50px",
    minHeight: 575,
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
      textAlign: "center",
      padding: 0
    }
  },
  left: {
    display: "flex",
    justifyContent: "left",
    alignItems: "left",
    textAlign: "left",
    zIndex: 5,
    padding: "0 50px"
  },
  right: {
    display: "flex",
    justifyContent: "right",
    alignItems: "right",
    textAlign: "right",
    zIndex: 5,
    padding: "0 50px"
  },
  submit: {
    width: "350px",
    height: 56,
    background: "#fff"
  },
  particles: {
    color: "#000"
  },
  footer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    position: "relative",
    left: 0,
    bottom: 0,
    width: "100%",
    padding: 30,
    flexShrink: 0,
    marginTop: "auto"
  },
  image: {
    maxWidth: "100%",
    minWidth: 250,
    [theme.breakpoints.up("md")]: {
      marginRight: 50
    }
  },
  icon: {
    margin: 5,
    opacity: 0.3,
    transition: "opacity .3s linear",
    "&:hover": {
      opacity: 0.8
    }
  },
  text: {
    margin: 5,
    opacity: 0.3
  },
  iconContainer: {
    width: 150,
    height: 150,
    display: "flex",
    justifyContent: "center",
    overflow: "hidden"
  },
  footer: { width: "100%" },
  flexgrow: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  iphone: {
    width: 300,
    maxWidth: "75vw"
  },
  screenshot: {
    width: 240,
    maxWidth: "60vw",
    borderRadius: 25
  },
  overlayContainer: {
    maxWidth: "75vw",
    display: "block",
    position: "relative",
    margin: "auto",
    padding: "auto"
  },
  iphoneOverlay: {
    position: "absolute",
    maxWidth: "75vw",
    zIndex: 10,
    display: "block",
    margin: "0 auto",
    right: -30,
    top: -30
  },
  videoUnderlay: {
    position: "relative",
    maxWidth: "75vw",
    zIndex: 9,
    display: "block",
    padding: "auto",
    margin: "0 auto"
  },
  laptopContainer: {
    margin: "auto",
    padding: 10
  },
  laptopOverlay: {
    position: "absolute",
    maxWidth: "75vw",
    zIndex: 10,
    display: "block",
    margin: "0 auto",
    right: -30,
    top: -30
  },
  laptopUnderlay: {
    position: "relative",
    maxWidth: "75vw",
    zIndex: 9,
    display: "block",
    padding: "auto",
    margin: "0 auto"
  },
  laptop: {
    maxWidth: "100%"
  },
  laptopScreen: {
    width: "70%"
  },
  bodyLink: {
    textDecoration: "none",
    color: theme.palette.primary
  },
  link: {
    width: 150
  },
  textContainer: {
    width: 600,
    maxWidth: "80vw",
    [theme.breakpoints.up("md")]: {
      marginTop: 50
    }
  },
  whiteText: {
    color: "#fff"
  },
  titleContainer: {
    width: "100%"
  },
  referral: {
    maxHeight: 300,
    maxWidth: "40vw"
  },
  spacer: {
    margin: 50
  }
}));

const Landing = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Grid container>
          <Grid item xs={12} className={classes.title}>
            <div className={classes.iconContainer}>
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 203.25 288.84"
                className="item"
              >
                <linearGradient id="white">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>
                <linearGradient id="gradient">
                  <stop offset="0%" stopColor="#00C8FF">
                    <animate
                      attributeName="stop-color"
                      values="#FFFFFF; #00C8FF"
                      dur="3s"
                      ease="easeIn"
                    />
                  </stop>
                  <stop offset="100%" stopColor="#0064FF">
                    <animate
                      attributeName="stop-color"
                      values="#FFFFFF; #0064FF"
                      dur="3s"
                      ease="easeIn"
                    />
                  </stop>
                </linearGradient>
                <motion.path
                  d="M123,96.28H80.75c-8.84,0-16.43,6.92-16.57,15.76a16,16,0,0,0,16,16.33H123a48.19,48.19,0,0,1,48.12,49.32c-.63,26.28-22.75,47-49,47h-90a16.06,16.06,0,0,0-16,16v16.05H85.56v32.09h24.07a8,8,0,0,0,8-8V256.75h4.15c44,0,80.75-34.95,81.43-79A80.32,80.32,0,0,0,123,96.28Z"
                  variants={icon}
                  initial="hidden"
                  animate="visible"
                  transition={{
                    default: { duration: 2, ease: "easeInOut" },
                    fill: { duration: 2, ease: "easeIn" }
                  }}
                />
                <motion.path
                  d="M80.21,192.56h42.27c8.83,0,16.4-6.91,16.57-15.74A16,16,0,0,0,123,160.47H81.11c-26.28,0-48.39-20.68-49-47A48.2,48.2,0,0,1,80.2,64.19h90.93a16,16,0,0,0,16.05-16v-16H117.65V0H93.58a8,8,0,0,0-8,8V32.09H81.43c-44,0-80.78,35-81.43,79A80.32,80.32,0,0,0,80.21,192.56Z"
                  variants={icon}
                  initial="hidden"
                  animate="visible"
                  transition={{
                    default: { duration: 2, ease: "easeInOut" },
                    fill: { duration: 2, ease: "easeIn" }
                  }}
                />
              </motion.svg>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 2,
                ease: "easeInOut"
              }}
            >
              <img
                src={Text}
                alt="Satstreet"
                fill="red"
                height={60}
                className={classes.image}
              />
            </motion.div>
          </Grid>
          <Grid item xs={12} className={classes.center}>
            <Typography
              variant="h3"
              className={classes.mainSubtitle}
              gutterBottom
            >
              Bitcoin made simple.
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.center}>
            <Typography variant="subtitle1" gutterBottom>
              Send and gift Bitcoin to any email address.
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.center}>
            <div className={classes.spacer}>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                className={classes.link}
                component={Link}
                to={"/create_account"}
              >
                SIGN UP
              </Button>
              <Button
                // variant="outlined"
                color="primary"
                size="large"
                className={classes.link}
                component={Link}
                to={"/signin"}
              >
                LOG IN
              </Button>
            </div>
            <br /> <br /> <br />
            <ExpandMoreIcon />
          </Grid>
        </Grid>
      </div>

      <div className={classes.container2}>
        <Grid container>
          <Grid item xs={12} md={6} className={classes.videoSectionRight}>
            <div className={classes.overlayContainer}>
              <div className={classes.videoUnderlay}>
                <img
                  src={Screenshot}
                  alt="iphone"
                  className={classes.screenshot}
                />
              </div>
              <div className={classes.iphoneOverlay}>
                <img src={Screen} alt="iphone" className={classes.iphone} />
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={6} className={classes.copyLeft}>
            <div className={classes.titleContainer}>
              <Typography variant="h5" className={classes.bodyTitle}>
                Gift Bitcoin to any email address
              </Typography>
            </div>
            <Typography
              variant="subtitle1"
              gutterBottom
              className={classes.bodySubTitle}
            >
              Deposit Bitcoin to a secure wallet address and then you can send
              Bitcoin to any email address. You will be prompted to enter an
              email and an amount and that is all you need!
            </Typography>
            <Button
              // variant="outlined"
              color="primary"
              className={classes.link}
              component={Link}
              to={"/home"}
            >
              Find Out More
            </Button>
          </Grid>
        </Grid>
      </div>

      <div className={classes.container3}>
        <Grid container>
          <Grid item xs={12} className={classes.center}>
            <div className={classes.textContainer}>
              <Typography variant="h5" className={classes.bodyTitleWhite}>
                We are on a mission to get Bitcoin in the hands of millions of
                people around the world.
              </Typography>
              <Button
                // variant="outlined"
                color="primary"
                className={classes.link}
                component={Link}
                to={"/home"}
              >
                Find Out More
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>

      <div className={classes.container2}>
        <Grid container>
          <Grid item xs={12} md={6} className={classes.copyRight}>
            <div className={classes.titleContainer}>
              <Typography variant="h5" className={classes.bodyTitle}>
                Earn Bitcoin. Stack Sats.
              </Typography>
            </div>
            <Typography
              variant="subtitle1"
              gutterBottom
              className={classes.bodySubTitle}
            >
              We've made it easy for you to earn Bitcoin by signing up with
              exchanges, buying a hardware wallet, earning interest, and making
              online purchases!
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className={classes.laptopContainer}>
              <img src={Laptop} alt="laptop" className={classes.laptop} />
            </div>
          </Grid>
        </Grid>
      </div>

      <div className={classes.container2}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <div className={classes.center}>
              <img src={Referral} alt="Referral" className={classes.referral} />
            </div>
          </Grid>
          <Grid item xs={12} md={6} className={classes.copyLeft}>
            <Typography variant="h5" className={classes.bodyTitle}>
              Earn by Giving.
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              className={classes.bodySubTitle}
            >
              We will reward you with 25% commissions for every friend you refer
              that earns Bitcoin through Satstreet!
            </Typography>
          </Grid>

          <Grid item xs={12} className={classes.center}>
            <div className={classes.textContainer}>
              <div className={classes.spacer}>
                <Typography variant="h5" className={classes.bodyTitle}>
                  Let's get started.
                </Typography>
                <Button
                  color="primary"
                  component={Link}
                  to={"/home"}
                  className={classes.link}
                >
                  Start Now
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>

      <div className={classes.container5}>
        <Grid container>
          <Grid item xs={12} className={classes.center}>
            <div className={classes.textContainer}>
              <Typography variant="h5" className={classes.bodyTitleWhite}>
                COMING SOON!
              </Typography>
              <Typography
                variant="subtitle1"
                gutterBottom
                className={classes.bodySubTitleBold}
              >
                Satstreet App (Android & iOS)
              </Typography>
              <Typography
                variant="subtitle1"
                gutterBottom
                className={classes.bodySubTitleWhite}
              >
                Making it easy to send to any contact on your phone!
              </Typography>
              <Typography
                variant="subtitle1"
                gutterBottom
                className={classes.bodySubTitleBold}
              >
                Learn Bitcoin
              </Typography>
              <Typography
                variant="subtitle1"
                gutterBottom
                className={classes.bodySubTitleWhite}
              >
                Explore our educational resources. A simple guide to explain
                Bitcoin and interactive webinars.
              </Typography>
            </div>
          </Grid>
        </Grid>
      </div>

      <div className={classes.footer}>
        <Footer />
      </div>
    </div>
  );
};

Landing.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Landing;
