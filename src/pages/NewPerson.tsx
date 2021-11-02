import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import { FormEvent, useState } from "react";
import BoxForm from "../components/BoxForm";
import { useHistory } from "react-router-dom";
import ButtonWithLoader from "../components/Button";
import Alert from "../components/Alert";
import InputMask from "react-input-mask";

import axios from "axios";

type Address = {
  cidade: string;
  uf: string;
};

export function NewPerson() {
  const [loading, setLoading] = useState(false);
  const [signInError, setSignInError] = useState(false);
  const [address, setAddress] = useState<Address>();
  const [errMesasge, setErrMessage] = useState(
    "Erro, por favor tente novamente!"
  );
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      nome: "",
      dataNascimento: "",
      idade: "",
      cep: "",
      cidade: address?.cidade,
      uf: address?.uf,
    },
    onSubmit: async (values) => {
      setLoading(true);
      console.log(values);
      const formatedDate = values.dataNascimento.split("-");
      const dd = formatedDate[0];
      const mm = formatedDate[1];
      const aaaa = formatedDate[2];
      const newValues = {
        ...values,
        dataNascimento: `${aaaa}-${mm}-${dd}`,
      };
      try {
        const response = await axios.post("http://localhost:6660/person", {
          ...newValues,
          ...address,
        });

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

  function callCepApi(e: FormEvent) {
    console.log();

    axios
      .get(`https://ws.apicep.com/cep/${String(e)}.json`)
      .then((response) => {
        console.log(response.data);
        setAddress({
          cidade: response.data.city,
          uf: response.data.state,
        });
      });
  }

  function setErrorToFalse() {
    if (signInError === true) {
      setSignInError(false);
    }
  }
  return (
    <BoxForm height={"600px"}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginTop: "20px",
          padding: "20px",
          gap: "30px",
          fontFamily: "Helvetica",
        }}
        component="form"
        onSubmit={formik.handleSubmit}
        onChange={setErrorToFalse}
      >
        <TextField
          name="nome"
          value={formik.values.nome}
          onChange={formik.handleChange}
          id="outlined-basic"
          label="Nome"
          type={"text"}
          variant="outlined"
        />
        <InputMask
          mask="99-99-9999"
          name="dataNascimento"
          onChange={formik.handleChange}
          value={formik.values.dataNascimento}
        >
          {(inputProps: any) => (
            <TextField
              {...inputProps}
              name="dataNascimento"
              id="outlined-basic"
              label="Data de Nascimento"
              type={"text"}
              variant="outlined"
            />
          )}
        </InputMask>
        <InputMask
          mask="99999-999"
          name="cep"
          onChange={formik.handleChange}
          value={formik.values.cep}
          onBlur={(e: any) => callCepApi(e.target.value)}
        >
          {(inputProps: any) => (
            <TextField
              {...inputProps}
              id="outlined-basic"
              label="CEP"
              type={"text"}
              variant="outlined"
            />
          )}
        </InputMask>

        <TextField
          name="cidade"
          value={address?.cidade ? address?.cidade : formik.values.cidade}
          onChange={formik.handleChange}
          id="outlined-basic"
          label={address?.cidade ? "" : "Cidade"}
          type={"text"}
          variant="outlined"
        />
        <TextField
          name="UF"
          value={address?.uf ? address?.uf : formik.values.uf}
          onChange={formik.handleChange}
          id="outlined-basic"
          label={address?.uf ? "" : "UF"}
          type={"text"}
          variant="outlined"
        />
        <ButtonWithLoader loader={loading}>Criar</ButtonWithLoader>
        <ButtonWithLoader onClickHere={() => history.goBack()}>
          Voltar
        </ButtonWithLoader>
        {signInError && (
          <Alert>
            <strong>Erro! </strong>
            {errMesasge}
          </Alert>
        )}
      </Box>
    </BoxForm>
  );
}
