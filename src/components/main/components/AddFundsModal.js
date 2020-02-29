import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: 400,
    margin: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));

const AddFundsModal = props => {
  const classes = useStyles();
  const { open, handleClose, children } = props;
  return (
    <Modal open={open} onClose={handleClose} className={classes.modal}>
      <Fade in={open}>
        <div className={classes.paper}>{children}</div>
      </Fade>
    </Modal>
  );
};

export default AddFundsModal;
