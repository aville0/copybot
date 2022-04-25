import "./EditContent.scss";
import React from "react";
import axios from "axios";
import { API_URL } from "../../utils/utils";
import { TextField, Box, Button } from "@mui/material";
const { v4: uuidv4 } = require("uuid");

export default class EditContent extends React.Component {
  state = {
    content: "",
    
  }

  render() {
    return (
      <>
        <p>blah blah</p>
      </>
    );
  }
}
