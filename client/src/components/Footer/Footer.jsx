import * as React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Divider } from "@mui/material";

export default function Footer() {
  return (
    <Container disableGutters={true}>
      <Divider orientation="horizontal" />
      <Typography variant="caption" color="text.secondary" marginLeft={"16px"}>
        {"Made with ❤️ in Toronto"}
      </Typography>
    </Container>
  );
}
