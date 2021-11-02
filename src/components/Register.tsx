import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import { useState } from "react";
import ButtonWithLoader from "./Button";
import * as Yup from "yup";
import { api } from "../services/api";
import { useHistory } from "react-router-dom";

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
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      email: "",
      senha: "",
      confirmPasswd: "",
    },
    validationSchema: userSchema,
    onSubmit: async (values) => {
      try {
        const response = await api.post("users", values);
        alert(`Seu ID de acesso: ${response.data.data.email}`);
        history.push("/users");
      } catch (err) {
        setSignInError(true);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <Box component="form" onSubmit={formik.handleSubmit}>
        <TextField
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          id="outlined-basic"
          label="E-mail"
          variant="outlined"
        />
        <TextField
          name="senha"
          onChange={formik.handleChange}
          value={formik.values.senha}
          id="outlined-basic"
          label="Senha"
          variant="outlined"
        />
        <TextField
          name="confirmPasswd"
          onChange={formik.handleChange}
          value={formik.values.confirmPasswd}
          id="outlined-basic"
          label="Confirma Senha"
          variant="outlined"
        />
        <ButtonWithLoader loader={loading}>Cadastrar</ButtonWithLoader>
      </Box>
    </Box>
  );
}
