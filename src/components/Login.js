import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent } from "@material-ui/core";
import axios from "axios";
import FlashMessage from "react-flash-message";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";

export default function Login() {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errors, setErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    const value = {
      email: userEmail,
      password: userPassword,
    };
    axios
      .post("http://localhost:4000/users/login", value)
      .then((response) => {
        console.log(response.data.foundUser.userId);
        alert("Logged in successfully");
        localStorage.setItem("userId", response.data.foundUser.userId);
        navigate("/home");
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
    <BoxContainer id="login-form">
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
          </FormContainer>
          <MutedLink href="#">Forget your password?</MutedLink>
          <MutedLink href="/home">
            <SubmitButton type="submit" onClick={handleSubmit}>
              Signin
            </SubmitButton>
          </MutedLink>
          <MutedLink href="/signup">
            Don't have an account?{" "}
            <BoldLink href="/signup" onClick={null}>
              Signup
            </BoldLink>
          </MutedLink>
        </CardContent>
      </Card>
    </BoxContainer>
  );
}
