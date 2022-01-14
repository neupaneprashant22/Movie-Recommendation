import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import Header from "./components/Header";
import Top from "./components/Top";

const useStyles = makeStyles((theme) => ({
  root: {},
}));
export default function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
      <Top />
    </div>
  );
}
