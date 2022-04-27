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
    reviewer: null,
    review: null,
    check: false,
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

  onReviewClickHandler = async (e) => {
    await axios
      .post(`${API_URL}/posts/${this.props.match.params.id}/review`, {
        review: this.state.review,
        reviewer: this.state.reviewer,
      })
      .then((response) => {
        window.alert("your review has been submitted");
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.getDataComments();
  }

  onReviewEventHandler = async (e) => {
    this.setState((prevState) => ({
      check: !prevState.check,
    })).catch((err) => console.error(err));
  };

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
            label="Your name"
            variant="outlined"
            onChange={this.state.reviewer}
          />
        </Box>
        <Checkbox
          checked={checked}
          onChange={(e) =>
            this.setState({ check: !this.componentDidCatch.value })
          }
          {...label}
        />
        <Button onClick={this.onReviewClickHandler} variant="contained">
          Done
        </Button>
      </>
    );
  }
}
