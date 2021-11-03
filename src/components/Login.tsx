import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import ButtonWithLoader from "./Button";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";

import Alert from "./Alert";
import { UserLoginSuccess } from "./Register";
import { useAuth } from "../Hooks/useAuth";
import axios from "axios";

export function Login() {
  const [loading, setLoading] = useState(false);
  const [signInError, setSignInError] = useState(false);
  const [errMesasge, setErrMessage] = useState(
    "Erro, por favor tente novamente!"
  );
  const { handleSetLogin } = useAuth();
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      email: "",
      senha: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await axios.post<UserLoginSuccess>(
          "http://localhost:6660/login",
          values
        );
        handleSetLogin(response.data.token);
        history.push("/peoples");
      } catch (error: any) {
        setErrMessage(error.response.data.error);
        setSignInError(true);
      } finally {
        setLoading(false);
      }
    },
  });

  function setErrorToFalse() {
    if (signInError === true) {
      setSignInError(false);
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
      component="form"
      onSubmit={formik.handleSubmit}
      onChange={setErrorToFalse}
    >
      <TextField
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        id="outlined-basic"
        label="E-mail"
        variant="outlined"
      />
      <TextField
        name="senha"
        value={formik.values.senha}
        onChange={formik.handleChange}
        id="outlined-basic"
        label="Senha"
        type={"password"}
        variant="outlined"
      />
      <ButtonWithLoader loader={loading}>Entrar</ButtonWithLoader>
      {signInError && (
        <Alert>
          <strong>Erro! </strong>
          {errMesasge}
        </Alert>
      )}
    </Box>
  );
}
