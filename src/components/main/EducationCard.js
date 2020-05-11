import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { palette } from "../../constants/styles";

const useStyles = makeStyles({
  root: {
    width: "30%",
    maxWidth: "100%",
    margin: 5,
    flexGrow: 1,
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
      width: "calc(100% / 2 - 10px)",
    },

    "@media (max-width:500px)": {
      width: "100%",
    },
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
    height: "100%",
  },

  image: {
    maxWidth: "125px",
    height: "75px",
    margin: "10px",
    objectFit: "scale-down",
  },

  titleBox: {
    fontSize: "16px",
    fontWeight: 600,
    padding: 20,
    margin: "5px 10px 10px 10px",
  },

  button: {
    height: "50px",
    boxSizing: "border-box",
    width: "90%",
    marginBottom: 10,
  },
});

const EducationCard = (props) => {
  const classes = useStyles();

  const { imageUrl, title, link, ...otherProps } = props;

  const handleClickLink = (link) => {
    window.open(link, "_blank");
  };

  return (
    <div className={classes.outerBox} {...otherProps}>
      <div className={classes.innerBox}>
        <img src={imageUrl} className={classes.image} alt="" />
        <div className={classes.titleBox}>{title}</div>
        <Button
          className={classes.button}
          fullWidth
          variant={"contained"}
          color="primary"
          onClick={() => handleClickLink(link)}
        >
          Learn More
        </Button>
      </div>
    </div>
  );
};

export default EducationCard;
