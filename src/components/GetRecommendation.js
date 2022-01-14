import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import App from "./../app";
import Icon from "@material-ui/core/Icon";
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));
const GetRecommendation = () => {
  const classes = useStyles();
  return (
    <Button variant="contained" color="primary" className={classes.button}>
      Similar Movies
    </Button>
  );
};

export default GetRecommendation;
