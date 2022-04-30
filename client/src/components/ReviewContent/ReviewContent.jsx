import "./ReviewContent.scss";
import React from "react";
import axios from "axios";
import { API_URL } from "../../utils/utils";
import { TextField, Box, Button, Checkbox } from "@mui/material";

export default class EditContent extends React.Component {
  state = {
    post: {
      content: "",
      title: "",
    },
    comments: [],
    reviewerName: null,
    reviewerApproved: false,
  };

  // GET THE COMMENTS FROM FIREBASE SERVER
  getDataComments() {
    axios
      .get(`${API_URL}/posts/${this.props.match.params.id}`)
      .then((response) => {
        this.setState({
          post: { title: response.data.title, content: response.data.content },
          comments: response.data.comments,
        });
      });
  }

  // POST THE RESPONSE TO CONTENT (CHECKBOX, SIGNATURE)

  onReviewClickHandler = async (e) => {
    await axios
      .post(`${API_URL}/posts/${this.props.match.params.id}/review`, {
        reviewerApproved: this.state.reviewerApproved,
        reviewerName: this.state.reviewerName,
      })
      .then((response) => {
        window.alert("your review has been submitted");
        this.props.history.push(`/`);
      }, 2000)
      .catch((err) => console.log(err));
  };

  onReviewCheckHandler = async (e) => {
    this.setState((prevState) => ({
      reviewerApproved: !prevState.reviewerApproved,
    }));
  };

  onReviewNameHandler = (e) => {
    this.setState({ reviewerName: e.target.value });
  };

  componentDidMount() {
    this.getDataComments();
  }
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
            id="outlined-multiline-static"
            multiline
            rows={5}
            value={this.state.post.content}
            disabled={true}
          />
        </Box>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "100ch" },
          }}
        >
          {/* TODO: Rename comment.comments to comment.message in FS */}
          {this.state.comments.map((c, idx) => (
            <p key={idx}>{c.comments}</p>
          ))}
        </Box>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "100ch" },
          }}
        >
          <TextField
            label="Your name"
            variant="outlined"
            onChange={this.onReviewNameHandler}
          />
        </Box>
        <Checkbox onChange={this.onReviewCheckHandler} />
        <Button onClick={this.onReviewClickHandler} variant="contained">
          Done
        </Button>
      </>
    );
  }
}
