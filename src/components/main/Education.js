// React
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { palette } from "../../constants/styles";
import { Paper, CircularProgress } from "@material-ui/core";
import Firebase from "../../constants/firebase";
import store from "store";
import EducationCard from "./EducationCard";

const useStyles = makeStyles((theme) => ({
  paperOptions: {
    boxShadow: "none",
    borderRadius: "5px",
    minHeight: "652px",
    minWidth: "300px",
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    padding: 5,

    "@media (min-width:780px)": {
      border: "1px solid",
      borderColor: palette.gray[0],
    },
  },
  holdingContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    width: "100%",
    marginBottom: "100px",

    "@media (min-width:780px)": {
      width: "80%",
    },
  },
}));

const Education = () => {
  const classes = useStyles();
  const [state, setState] = useState({
    educations: [],
    isLoading: true,
  });

  const { isLoading, educations } = state;

  const getLearns = () => {
    setState({ isLoading: true });
    const getLearn = Firebase.functions().httpsCallable("getLearn");
    return getLearn({ token: store.get("token") }).then(function (result) {
      if (result.data.success) {
        setState({
          ...state,
          educations: result.data.educations.sort((a, b) =>
            a.order > b.order ? 1 : -1
          ),
          isLoading: false,
        });
      } else {
        setState({ ...state, isLoading: false });
      }
    });
  };

  useEffect(() => {
    getLearns();
  }, []);

  return (
    <div className={classes.holdingContainer}>
      <div className={classes.container}>
        <Paper className={classes.paperOptions}>
          {isLoading ? (
            <CircularProgress
              className={classes.circularProgress}
              variant="indeterminate"
              disableShrink
              size={24}
              thickness={4}
            />
          ) : (
            educations.map((education, index) => {
              return <EducationCard {...education} key={index} />;
            })
          )}
        </Paper>
      </div>
    </div>
  );
};

Education.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default Education;
