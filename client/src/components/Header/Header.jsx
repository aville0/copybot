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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <div className="hero__logo">
          <RobotLogo />
          </div>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Copybot
          </Typography>

          <Box
            sx={{ flexGrow: 1, display: "flex", flexDirection: "row-reverse" }}
          >
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={() => {
                history.push("/home");
              }}
            >
              Home
            </Button>
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={() => {
                history.push("/create");
              }}
            >
              Build
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
