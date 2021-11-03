import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import { Divider, Typography } from "@mui/material";
import { AiOutlineFullscreenExit, AiOutlinePlus } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import { useAuth } from "../Hooks/useAuth";
import { useHistory } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { handleLogout, user } = useAuth();
  const history = useHistory();
  function handleLogOutAndJunpToIndex() {
    handleLogout();
    history.push("/");
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon onClick={() => setOpen(true)} />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Bem-vindo
          </Typography>

          <Box
            sx={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              bgcolor: "#64B5F6",
              display: "flex",
              color: "white",
              justifyContent: "center",
              alignItems: "center",
              border: "2px white solid",
              fontFamily: "Helvetica",
              fontSize: "14px",
              marginRight: "10px",
            }}
          >
            {user?.email.substr(0, 1).toUpperCase()}
          </Box>
          <MdLogout
            style={{ cursor: "pointer" }}
            size={20}
            onClick={handleLogOutAndJunpToIndex}
          />
        </Toolbar>
      </AppBar>
      <Drawer anchor={"left"} open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <AiOutlineFullscreenExit size={24} onClick={() => setOpen(false)} />
        </Box>
        <Divider />
        <Link
          to={"/profile"}
          style={{
            padding: "10px 40px",
            textDecoration: "none",
            fontFamily: "Helvetica",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center ",
              color: "black",
              gap: "10px",
            }}
          >
            <BiUser /> <span>Meus cadastros</span>
          </Box>
        </Link>
        <Link
          to={"/peoples"}
          style={{
            padding: "10px 40px",
            textDecoration: "none",
            fontFamily: "Helvetica",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center ",
              color: "black",
              gap: "10px",
            }}
          >
            <FiUsers /> <span>Todos os cadastros</span>
          </div>
        </Link>
        <Link
          to={"/create"}
          style={{
            padding: "10px 40px",
            textDecoration: "none",
            fontFamily: "Helvetica",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center ",
              color: "black",
              gap: "10px",
            }}
          >
            <AiOutlinePlus /> <span>Criar pessoa</span>
          </div>
        </Link>
      </Drawer>
    </Box>
  );
}
