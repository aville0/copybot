import "./CommentsPane.scss";
import React from "react";
import axios from "axios";
import { API_URL } from "../../utils/utils";
import { TextField, Box, Button, Snackbar } from "@mui/material";
const { v4: uuidv4 } = require("uuid");

export default class CommentsPane extends React.Component {
  state = {
    comments: null,
    author: null,
    reviews: [],
  };

  // GET THE REVIEWS FROM SERVER
  fetchReview() {
    axios
      .get(`${API_URL}/posts/${this.props.match.params.id}`)
      .then((response) => {
        this.setState({
          reviews: response.data.reviews,
        });
      });
  }

  // ADD A COMMENT FOR THE REVIEWER
  onEditCommentHandler = async (e) => {
    this.setState({
      comments: e.target.value,
    }).catch((err) => console.error(err));
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
    this.fetchReview();
  }

  render() {
    return (
      <>
        <h3 className="page-subheader">Send a comment for the reviewer</h3>
        <TextField
          label="Add a comment for the reviewer here"
          variant="outlined"
          onChange={this.onEditCommentHandler}
        />
        <Button onClick={this.onSubmitCommentClickHandler} variant="contained">
          Add Comment
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
