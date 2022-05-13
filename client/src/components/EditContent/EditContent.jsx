import "./EditContent.scss";
import React from "react";
import axios from "axios";
import { API_URL } from "../../utils/utils";
import { TextField, Box, Button, Snackbar, Link } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
const { v4: uuidv4 } = require("uuid");

export default class EditContent extends React.Component {
  state = {
    editContent: null,
    comments: null,
    author: null,
    content: null,
    reviews: [],
  };

  // GET THE CONTENT FROM SERVER
  fetchData() {
    axios
      .get(`${API_URL}/posts/${this.props.match.params.id}`)
      .then((response) => {
        this.setState({
          editContent: response.data.content,
          reviews: response.data.reviews,
        });
      });
  }

  // EDIT THE CONTENT IN THE TEXT FIELD
  onEditEventHandler = async (e) => {
    this.setState({
      editContent: e.target.value,
    }).catch((err) => console.error(err));
  };

  // ADD A COMMENT FOR THE REVIEWER
  onEditCommentHandler = async (e) => {
    this.setState({
      comments: e.target.value,
    }).catch((err) => console.error(err));
  };

  // SEND THE EDITED CONTENT TO THE REVIEWER
  onSubmitClickHandler = async (e) => {
    axios
      .post(`${API_URL}/posts/${this.props.match.params.id}/edit`, {
        content: this.state.editContent,
      })
      .then((response) => {
        this.props.history.push(`/posts/${this.props.match.params.id}/review`);
      }, 2000)
      .catch((err) => console.log(err));
  };

  // SEND THE COMMENT TO THE REVIEWER WITH YOUR NAME
  onSubmitCommentClickHandler = async (e) => {
    axios
      .post(`${API_URL}/posts/${this.props.match.params.id}/comments`, {
        comments: this.state.comments,
        author: this.state.author,
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.fetchData();
  }

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
        <Button onClick={this.onSubmitClickHandler} variant="contained">
          Send for Review
        </Button>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "100ch" },
          }}
        >
          <TextField
            label="Add a comment for the reviewer here"
            variant="outlined"
            onChange={this.onEditCommentHandler}
          />
        </Box>
        <Button onClick={this.onSubmitCommentClickHandler} variant="contained">
          Add Comment
        </Button>

        <p>OR</p>
        <Button
          component={Link}
          variant="contained"
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
            this.state.editContent
          )}`}
          endIcon={<TwitterIcon />}
        >
          Tweet it now!
        </Button>

        <section className="review-response">
          <p>{this.state.comments}</p>
          <p>{this.state.author}</p>

          {this.state.reviews.map((r, idx) => (
            <p key={idx}>
              {r.author} has {r.approved ? "approved" : "rejected"} on {r.date}.
            </p>
          ))}
        </section>
      </>
    );
  }
}
