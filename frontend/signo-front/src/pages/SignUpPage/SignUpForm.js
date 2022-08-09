import React from "react";
import { InputsContainer } from "./styled";
import TextField from "@material-ui/core/TextField";
import useForm from "../../hooks/UseForm";
import { Button } from "@material-ui/core";
import {useNavigate} from "react-router-dom"
import {signup} from "../../services/user"

const SignUpForm = ({setRightButtonText}) => {
  const { form, onChange, clear } = useForm({ nickname: "", password: "" })
  const navigate = useNavigate()

  const onSubmitForm = (event) => {
    event.preventDefault()
    signup(form, clear(), navigate, setRightButtonText())
  }

  return (
    <InputsContainer>
      <form onSubmit={onSubmitForm}>
        <TextField
          name={"nickname"}
          value={form.nickname}
          onChange={onChange}
          label={"nome de usuário"}
          required
          type={"text"}
          variant={"outlined"}
          fullWidth
          margin={"normal"}
        />
        <TextField
          name={"password"}
          value={form.password}
          onChange={onChange}
          label={"senha"}
          required
          type={"password"}
          variant={"outlined"}
          fullWidth
          margin={"normal"}
        />
        <Button
          type={"submit"}
          fullWidth
          variant={"contained"}
          color={"primary"}
        >
          Cadastrar
        </Button>
      </form>
    </InputsContainer>
  );
};

export default SignUpForm;
