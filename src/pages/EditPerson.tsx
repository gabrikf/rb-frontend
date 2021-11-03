import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import { FormEvent, useEffect, useState } from "react";
import BoxForm from "../components/BoxForm";
import { useHistory } from "react-router-dom";
import ButtonWithLoader from "../components/Button";
import Alert from "../components/Alert";
import InputMask from "react-input-mask";
import { useParams } from "react-router-dom";

import axios from "axios";

type Address = {
  cidade: string;
  uf: string;
};
type Editarams = {
  id: string;
};

export type PersonType = {
  id: number;
  nome: string;
  dataNascimento: string;
  idade: number;
  cep: string;
  cidade: string;
  uf: string;
};

export function EditPerson() {
  const [content, setContent] = useState<PersonType>();
  const [loading, setLoading] = useState(false);
  const [signInError, setSignInError] = useState(false);
  const [address, setAddress] = useState<Address>();
  const [age, setAge] = useState(content?.idade);
  const [errMesasge, setErrMessage] = useState(
    "Erro, por favor tente novamente!"
  );
  const { id } = useParams<Editarams>();
  useEffect(() => {
    axios
      .get<PersonType>(`http://localhost:6660/person/${id}`)
      .then((response) => {
        setContent(response.data);
      });
  });
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      nome: content?.nome,
      dataNascimento: content?.dataNascimento,
      idade: content?.dataNascimento,
      cep: content?.cep,
      cidade: content?.cidade,
      uf: content?.uf,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      setLoading(true);

      try {
        const response = await axios.put(`http://localhost:6660/person/${id}`, {
          ...values,
          idade: age,
        });

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
    // a api que você solicitou me deu problema de cors, por isso estou usando essa outra.
    axios
      .get(`https://ws.apicep.com/cep/${String(e)}.json`)
      .then((response) => {
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
          disabled={loading}
          value={formik.values.nome}
          onChange={formik.handleChange}
          id="outlined-basic"
          label={content?.nome ? "" : "Nome"}
          type={"text"}
          variant="outlined"
        />
        <InputMask
          mask="99/99/9999"
          disabled={loading}
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
              label={content?.dataNascimento ? "" : "Data de Nascimento"}
              type={"text"}
              variant="outlined"
            />
          )}
        </InputMask>
        <InputMask
          mask="99999-999"
          disabled={loading}
          name="cep"
          onChange={formik.handleChange}
          value={formik.values.cep}
          onBlur={(e: any) => callCepApi(e.target.value)}
        >
          {(inputProps: any) => (
            <TextField
              {...inputProps}
              id="outlined-basic"
              label={content?.cep ? "" : "CEP"}
              type={"text"}
              variant="outlined"
            />
          )}
        </InputMask>

        <TextField
          name="cidade"
          value={address?.cidade ? address?.cidade : formik.values.cidade}
          disabled={loading}
          onChange={formik.handleChange}
          id="outlined-basic"
          label={content?.cidade ? "" : "Cidade"}
          type={"text"}
          variant="outlined"
        />
        <TextField
          name="UF"
          disabled={loading}
          value={address?.uf ? address?.uf : formik.values.uf}
          onChange={formik.handleChange}
          id="outlined-basic"
          label={content?.uf ? "" : "UF"}
          type={"text"}
          variant="outlined"
        />
        <ButtonWithLoader loader={loading}>Salvar</ButtonWithLoader>
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
