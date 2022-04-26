import "./EditContent.scss";
import React from "react";
import axios from "axios";
import { API_URL } from "../../utils/utils";
import { TextField, Box, Button } from "@mui/material";
const { v4: uuidv4 } = require("uuid");

export default class EditContent extends React.Component {
  state = {
    editContent: null,
    editedContent: null,
    comments: null,
    author: null,
  };

  // GET THE CONTENT FROM GPT-3
  fetchData() {
    axios
      .get(`${API_URL}/posts/${this.props.match.params.id}`)
      .then((response) => {
        this.setState({
          editContent: response.data.content,
          comments: response.data.comments,
        });
      });
  }

  // TO POST A COMMENT TO THE DATABASE
  onCommentClickHandler = async (e) => {
    await axios
      .post(`${API_URL}/posts/create/${this.props.match.params.id}/comments`, {
        comments: this.state.comments,
        author: this.state.author,
      })
      .then((response) => {
        window.alert("submitted");
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.fetchData();
  }

  onEditEventHandler = async (e) => {
    this.setState({
      editedContent: e.response.data.content,
    }).catch((err) => console.error(err));
  };

  render() {
    return (
      <>
        <h2>Edit Content </h2>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "100ch" },
          }}
        >
          <TextField
          // value={this.state.editContent}
          // onChange={this.state.editedContent}
          />
        </Box>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "100ch" },
          }}
        >
          <TextField
            label="Add a comment for the reviewer here"
            variant="outlined"
            onChange={this.state.comments}
          />
        </Box>
        <Button onClick={this.onCommentClickHandler} variant="contained">
          Send for Review
        </Button>
        <p>OR</p>
        <Button variant="contained">Share on Social Media</Button>
      </>
    );
  }
}
