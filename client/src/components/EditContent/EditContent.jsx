import "./EditContent.scss";
import React from "react";
import axios from "axios";
import { API_URL } from "../../utils/utils";
import { TextField, Box, Button } from "@mui/material";
const { v4: uuidv4 } = require("uuid");

export default class EditContent extends React.Component {
  state = {
    editContent: null,
  };

  fetchData() {
    axios
      .get(`${API_URL}/posts/${this.props.match.params.id}`)
      .then((response) => {
        this.setState({ editContent: response.data.content });
      });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    console.log(this.state.editContent);
    return (
      <>
        <p>{this.state.editContent}</p>
      </>
    );
  }
}
