import React, { useContext } from "react";
import { Card, CardContent } from "@material-ui/core";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";

export default function Signup(props) {
  return (
    <BoxContainer>
      <h2>Form</h2>
      <Card style={{ width: "50%" }}>
        <CardContent>
          <FormContainer>
            <Input type="text" placeholder="Full Name" />
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Password" />
            <Input type="password" placeholder="Confirm Password" />
          </FormContainer>
          <SubmitButton style={{ marginTop: "10px" }} type="submit">
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
