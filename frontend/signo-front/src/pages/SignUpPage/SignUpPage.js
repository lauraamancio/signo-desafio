import React from "react";
import { useNavigate } from "react-router-dom";
import { MainContainer } from "./styled";
import logo from "../../assets/logo.png";
import SignUpForm from "./SignUpForm";
import { Button } from "@material-ui/core";
import {goBack} from "../../routes/coordinator"
import useUnprotectedPage from "../../hooks/UseUnprotectedPage"

const SignUpPage = () => {
  useUnprotectedPage()
  const navigate = useNavigate();
  return (
    <MainContainer>
      <img src={logo} alt="Logo do Ministério da Magia" />
      <h2>Cadastre-se</h2>
      <SignUpForm />
      <Button
        onClick={() => goBack(navigate)}
        type={"submit"}
        fullWidth
        variant={"text"}
        color={"primary"}
      >
        Voltar
      </Button>
    </MainContainer>
  );
};

export default SignUpPage;
