import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Collapse, Button } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link as Scroll } from "react-scroll";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    minHeight: "100vh",
    backgroundImage: `url(${"/assets/test.jpg"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  appbar: {
    background: "none",
  },
  appbarWrapper: {
    width: "80%",
    margin: "0 auto",
  },
  appbarTitle: {
    flexGrow: "1",
  },
  icon: {
    color: "#fff",
    fontSize: "2rem",
  },
  colorText: {
    color: "#F4B400",
  },
  container: {
    textAlign: "center",
    color: "fff",
  },
  title: {
    color: "#fff",
    fontSize: "4.5rem",
  },
  goDown: {
    color: "white",
    fontSize: "4rem",
  },
  card: {
    background: "#000",
    borderRadius: "40px",
  },
  buttons: {
    position: "absolute",
    top: "0px",
    right: "0px",
  },
  loginButton: {
    backgroundColor: "red",
    color: "#FFFFFF",
  },
  signupButton: {
    backgroundColor: "red",
    color: "#FFFFFF",
    margin: "10px",
  },
}));

export default function Header() {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
  }, []);
  return (
    <div className={classes.root} id="header">
      <div className={classes.buttons}>
        <Button
          className={classes.loginButton}
          variant="contained"
          href="/login"
        >
          Login
        </Button>
        <Button
          className={classes.signupButton}
          variant="contained"
          href="/signup"
        >
          Sign up
        </Button>
      </div>
      <Collapse
        in={checked}
        {...(checked ? { timeout: 1000 } : {})}
        collapsedHeight={50}
      >
        <div className={classes.container}>
          {/* <Card className={classes.card} variant="outline">
            <CardContent> */}
          <h1 className={classes.title}>
            We recommend you <br />
            <span className={classes.colorText}>YOUR MOVIES</span>
          </h1>
          {/* </CardContent>
          </Card> */}
          <Scroll to="top" smooth={false}>
            <IconButton>
              <ExpandMoreIcon className={classes.goDown} />
            </IconButton>
          </Scroll>
        </div>
      </Collapse>
    </div>
  );
}
