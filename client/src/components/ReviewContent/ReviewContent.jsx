import "./ReviewContent.scss";
import React from "react";
import axios from "axios";
import { API_URL } from "../../utils/utils";
import { TextField, Box, Button, Snackbar } from "@mui/material";
const { v4: uuidv4 } = require("uuid");

export default class EditContent extends React.Component {
  state = {
    title: null,
    editedContent: null,
    createDate: null,
    comments: null,
    author: null,
  };

  // GET THE COMMENTS FROM FIREBASE SERVER
  getDataComments() {
    axios
      .get(`{API_URL}/posts/create/${this.props.match.params.id}`)
      .then((response) => {
        this.setState({
          title: response.data.title,
          editedContent: response.data.content,
          comments: response.data.comments,
          createDate: response.data.createDate,
        });
      });
  }

  // POST THE RESPONSE TO CONTENT (CHECKBOX, SIGNATURE & COMMENTS)

  
  render() {
    return (
      <>
        <h2>Review Content</h2>
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
        <Checkbox checked={checked} onChange={handleChange} {...label} />
        <Button onClick={this.onSomething} variant="contained">
          Return to Drafter
        </Button>
      </>
    );
  }
}
