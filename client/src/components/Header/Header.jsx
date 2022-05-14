import React from "react";
import { useHistory } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ReactComponent as RobotLogo } from "../../assets/icons/robot-logo.svg";

export default function Header() {
  const history = useHistory();

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar>
        <div className="hero__logo">
          <RobotLogo
            onClick={() => {
              history.push("/");
            }}
          />
        </div>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          copybot
        </Typography>

        <Box
          sx={{ flexGrow: 1, display: "flex", flexDirection: "row-reverse" }}
        >
          <Button
            color="inherit"
            onClick={() => {
              history.push("/create");
            }}
          >
            Create
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
