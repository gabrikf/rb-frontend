import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import { Divider, Typography } from "@mui/material";
import { RiArrowRightSLine } from "react-icons/ri";
import { BiUser } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";

export default function Header() {
  const [open, setOpen] = useState(true);
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
            }}
          >
            G
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer anchor={"right"} open={open} onClose={() => setOpen(false)}>
        <div
          style={{ display: "flex", justifyContent: "center", padding: "25px" }}
        >
          <RiArrowRightSLine size={24} />
        </div>
        <Divider />
        <Link
          to={"/"}
          style={{
            padding: "10px 40px",
            textDecoration: "none",
            fontFamily: "Roboto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center ",
              color: "black",
              gap: "10px",
            }}
          >
            <BiUser /> <span>Meus cadastros</span>
          </Box>
        </Link>
        <Link
          to={"/"}
          style={{
            padding: "10px 40px",
            textDecoration: "none",
            fontFamily: "Roboto",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center ",
              color: "black",
              gap: "10px",
            }}
          >
            <FiUsers /> <span>Todos os cadastros</span>
          </div>
        </Link>
      </Drawer>
    </Box>
  );
}
