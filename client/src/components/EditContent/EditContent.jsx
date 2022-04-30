import "./EditContent.scss";
import React from "react";
import axios from "axios";
import { API_URL } from "../../utils/utils";
import { TextField, Box, Button, Snackbar, Link } from "@mui/material";
const { v4: uuidv4 } = require("uuid");

export default class EditContent extends React.Component {
  state = {
    editContent: null,
    comments: null,
    author: null,
  };

  // GET THE CONTENT FROM GPT-3
  fetchData() {
    axios
      .get(`${API_URL}/posts/${this.props.match.params.id}`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          editContent: response.data.content,
        });
      });
  }

  // TO POST A COMMENT TO THE DATABASE
  onCommentClickHandler = async (e) => {
    await axios
      .post(`${API_URL}/posts/${this.props.match.params.id}/comments`, {
        comments: this.state.comments,
        author: this.state.author,
      })
      .then((response) => {
        this.props.history.push(
          `/posts/${this.props.match.params.id}/review`
        );
      }, 2000)
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.fetchData();
  }

  onEditEventHandler = async (e) => {
    // TODO Update server
    this.setState({
      editContent: e.target.value,
    }).catch((err) => console.error(err));
  };

  render() {
    return (
      <>
        <h2>Edit Content </h2>
        <h3>Results</h3>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "100ch" },
          }}
        >
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={5}
            defaultValue={this.state.editContent}
            onChange={this.onEditEventHandler}
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
        <Button
          component={Link}
          variant="contained"
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
            this.state.editContent
          )}`}
        >
          Share to Twitter
        </Button>
      </>
    );
  }
}
