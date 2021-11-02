import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import ButtonWithLoader from "./Button";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { api } from "../services/api";

export function Login() {
  const [loading, setLoading] = useState(false);
  const [signInError, setSignInError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      nome: "",
      senha: "",
    },

    onSubmit: async (values) => {
      try {
        const response = await api.post("users", values);
        history.push("/login");
      } catch (err) {
        //   setErrorMessage(err.response.data)
        setSignInError(true);
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
        <TextField id="outlined-basic" label="E-mail" variant="outlined" />
        <TextField id="outlined-basic" label="Senha" variant="outlined" />
        <ButtonWithLoader loader={loading}>Entrar</ButtonWithLoader>
      </Box>
    </Box>
  );
}
