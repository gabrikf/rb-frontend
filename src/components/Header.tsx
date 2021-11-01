import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import { Divider } from "@mui/material";
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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center ",
              color: "black",
              gap: "10px",
            }}
          >
            <BiUser /> <span>Meus cadastros</span>
          </div>
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
