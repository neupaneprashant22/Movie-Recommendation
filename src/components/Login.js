import React from "react";
import { Card, CardContent } from "@material-ui/core";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";

export default function Login() {
  return (
    <BoxContainer id="login-form">
      <Card style={{ width: "50%" }}>
        <CardContent>
          <FormContainer>
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Password" />
          </FormContainer>
          <MutedLink href="#">Forget your password?</MutedLink>
          <MutedLink href="/home">
            <SubmitButton type="submit">Signin</SubmitButton>
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
