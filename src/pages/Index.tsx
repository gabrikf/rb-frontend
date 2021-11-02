import { Box } from "@mui/system";
import { useState } from "react";
import BoxForm from "../components/BoxForm";
import { Login } from "../components/Login";
import { Register } from "../components/Register";

export function Index() {
  const [current, setCurrent] = useState("login");
  return (
    <BoxForm height={"500px"}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: "20px",
          gap: "30px",
          fontFamily: "Helvetica",
        }}
      >
        <Box
          onClick={() => setCurrent("login")}
          sx={{
            borderBottom: `solid  ${current === "login" ? "2px" : 0} #29B6F6`,
            height: "20px",
            cursor: "pointer",
            color: "#37474F",
          }}
        >
          Entrar
        </Box>
        <Box
          onClick={() => setCurrent("register")}
          sx={{
            borderBottom: `solid  ${
              current === "register" ? "2px" : 0
            } #29B6F6`,
            height: "20px",
            cursor: "pointer",
            color: "#37474F",
          }}
        >
          Cadastrar
        </Box>
      </Box>
      <Box sx={{ padding: "20px", marginTop: "50px" }}>
        {current === "login" ? <Login /> : <Register />}
      </Box>
    </BoxForm>
  );
}
