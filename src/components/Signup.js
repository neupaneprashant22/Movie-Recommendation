import React, { useContext, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@material-ui/core";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { useNavigate } from "react-router";
import FlashMessage from "react-flash-message";

export default function Signup(props) {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPassword2, setUserPassword2] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  function handleSubmit(e) {
    var responsein;
    e.preventDefault();
    console.log("You clicked submit.");
    console.log(userName);
    const value = {
      name: userName,
      email: userEmail,
      password: userPassword,
      passwordConfirm: userPassword2,
    };
    console.log(value);
    axios
      .post("http://localhost:4000/users/register", value)
      .then((response) => {
        console.log(response);
        // this.setState({ value });
        alert("Data added");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        setErrors(err.response.data.errors);
        console.log(err.response.data.errors);
      });
  }
  let errorsRender;

  if (Object.keys(errors).length > 0) {
    errorsRender = Object.keys(errors).map((err) => {
      return (
        <FlashMessage key={err} duration={3000}>
          {errors[err]}
        </FlashMessage>
      );
    });
  }

  return (
    <BoxContainer>
      {errorsRender}

      <Card
        style={{
          width: "30%",
          marginTop: "10%",
          padding: "20px",
          backgroundColor: "black",
        }}
      >
        <CardContent>
          <FormContainer>
            <Input
              type="text"
              placeholder="Full Name"
              name="name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              style={{ marginBottom: "20px", borderRadius: "10px" }}
            />
            <Input
              type="email"
              placeholder="Email"
              name="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              style={{ marginBottom: "20px", borderRadius: "10px" }}
            />
            <Input
              type="password"
              placeholder="Password"
              name="password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              style={{ marginBottom: "20px", borderRadius: "10px" }}
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              name="confirmpassword"
              value={userPassword2}
              onChange={(e) => setUserPassword2(e.target.value)}
              style={{ marginBottom: "20px", borderRadius: "10px" }}
            />
          </FormContainer>
          <SubmitButton
            style={{ marginTop: "10px" }}
            type="submit"
            onClick={handleSubmit}
          >
            Signup
          </SubmitButton>
          <MutedLink href="/login">
            Already have an account?
            <BoldLink href="/login">Signin</BoldLink>
          </MutedLink>
        </CardContent>
      </Card>
    </BoxContainer>
  );
}
