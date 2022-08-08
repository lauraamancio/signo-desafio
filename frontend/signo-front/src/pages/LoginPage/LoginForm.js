import React from "react";
import { InputsContainer } from "./styled";
import TextField from "@material-ui/core/TextField";
import useForm from "../../hooks/UseForm";
import { Button } from "@material-ui/core";

const LoginForm = () => {
  const { form, onChange, clear } = useForm({ nickname: "", password: "" });

  const onSubmitForm = (event) => {
    event.preventDefault();
  };

  return (
    <InputsContainer>
      <form onSubmit={onSubmitForm}>
        <TextField
          name={"nickname"}
          value={form.nickname}
          onChange={onChange}
          label={"nickname"}
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
          label={"password"}
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
          Fazer Login
        </Button>
      </form>
    </InputsContainer>
  );
};

export default LoginForm;
