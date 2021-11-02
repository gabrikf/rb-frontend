import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import { useState } from "react";
import ButtonWithLoader from "./Button";
import * as Yup from "yup";

import { useHistory } from "react-router-dom";
import Alert from "./Alert";
import { useAuth } from "../Hooks/useAuth";
import axios from "axios";

export type UserLoginSuccess = {
  email: string;
  token: string;
};

const userSchema = Yup.object().shape({
  email: Yup.string()
    .email("Por favor, digite um e-mail válido")
    .required("Por favor, informe um e-mail."),

  senha: Yup.string()
    .min(8, "Por favor, informe uma senha com pelo menos 8 caracteres.")
    .required("Por favor, informe uma senha."),
  confirmPasswd: Yup.string()
    .required("Por favor, confirme a senha")
    .oneOf([Yup.ref("senha"), null], "As senhas devem ser iguais."),
});

export function Register() {
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
      confirmPasswd: "",
    },
    validationSchema: userSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await axios.post<UserLoginSuccess>(
          "http://localhost:6660/users",
          values
        );
        handleSetLogin(response.data.token);
        console.log(response.data);
        history.push("/profile");
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
        onChange={formik.handleChange}
        value={formik.values.email}
        id="outlined-basic"
        label="E-mail"
        variant="outlined"
      />
      {formik.errors.email && formik.touched.email && (
        <Box component="span" sx={{ fontStyle: "italic", color: "#EF5350" }}>
          {formik.errors.email}
        </Box>
      )}
      <TextField
        name="senha"
        onChange={formik.handleChange}
        value={formik.values.senha}
        id="outlined-basic"
        label="Senha"
        type={"password"}
        variant="outlined"
      />
      {formik.errors.senha && formik.touched.senha && (
        <Box component="span" sx={{ fontStyle: "italic", color: "#EF5350" }}>
          {formik.errors.senha}
        </Box>
      )}
      <TextField
        name="confirmPasswd"
        onChange={formik.handleChange}
        value={formik.values.confirmPasswd}
        id="outlined-basic"
        label="Confirma Senha"
        type={"password"}
        variant="outlined"
      />
      {formik.errors.confirmPasswd && formik.touched.confirmPasswd && (
        <Box component="span" sx={{ fontStyle: "italic", color: "#EF5350" }}>
          {formik.errors.confirmPasswd}
        </Box>
      )}
      <ButtonWithLoader loader={loading}>Cadastrar</ButtonWithLoader>
      {signInError && (
        <Alert>
          <strong>Erro! </strong>
          {errMesasge}
        </Alert>
      )}
    </Box>
  );
}
