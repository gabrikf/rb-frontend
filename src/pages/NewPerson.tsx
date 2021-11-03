import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import { FormEvent, useState } from "react";
import BoxForm from "../components/BoxForm";
import { useHistory } from "react-router-dom";
import ButtonWithLoader from "../components/Button";
import Alert from "../components/Alert";
import InputMask from "react-input-mask";
import * as Yup from "yup";

import axios from "axios";

type Address = {
  cidade: string;
  uf: string;
};

const personSchema = Yup.object().shape({
  nome: Yup.string()
    .min(3, "Por favor informe um nome com no mínimo 3 caracteres")
    .required("Por favor, informe um nome."),
  dataNascimento: Yup.string().required(
    "Por favor, informe uma data de nascimento."
  ),
  cep: Yup.string().required("Por favor, informe um e-mail."),
});

export function NewPerson() {
  const [loading, setLoading] = useState(false);
  const [signInError, setSignInError] = useState(false);
  const [address, setAddress] = useState<Address>();
  const [age, setAge] = useState(0);
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
    validationSchema: personSchema,
    onSubmit: async (values) => {
      setLoading(true);
      console.log(age);
      try {
        const response = await axios.post("http://localhost:6660/person", {
          ...values,
          ...address,
          idade: age,
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
  function getYears(date: string) {
    const fullDate = date.split("/");
    const day = fullDate[0];
    const month = fullDate[1];
    const year = fullDate[2];

    var d = new Date();
    const thisYear = d.getFullYear();
    const thisMonth = d.getMonth() + 1;
    const thisDay = d.getDate();

    let howOld = thisYear - Number(year);

    if (
      Number(thisMonth) < Number(month) ||
      (Number(thisMonth) === Number(month) && Number(thisDay) < Number(day))
    ) {
      howOld--;
    }
    setAge(howOld);
    return howOld < 0 ? 0 : howOld;
  }
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
    <BoxForm height={"750px"}>
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
        {formik.errors.nome && formik.touched.nome && (
          <Box component="span" sx={{ fontStyle: "italic", color: "#EF5350" }}>
            {formik.errors.nome}
          </Box>
        )}
        <InputMask
          mask="99/99/9999"
          name="dataNascimento"
          onChange={formik.handleChange}
          value={formik.values.dataNascimento}
          onBlur={(e: any) => getYears(e.target.value)}
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
        {formik.errors.dataNascimento && formik.touched.dataNascimento && (
          <Box component="span" sx={{ fontStyle: "italic", color: "#EF5350" }}>
            {formik.errors.dataNascimento}
          </Box>
        )}
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
        {formik.errors.cep && formik.touched.cep && (
          <Box component="span" sx={{ fontStyle: "italic", color: "#EF5350" }}>
            {formik.errors.cep}
          </Box>
        )}
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
