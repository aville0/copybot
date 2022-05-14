import "./ReviewContent.scss";
import React from "react";
import axios from "axios";
import CommentsPane from "../CommentsPane/CommentsPane";
import { API_URL } from "../../utils/utils";
import {
  TextField,
  Grid,
  Typography,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Collapse,
  Alert,
  IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default class ReviewContent extends React.Component {
  state = {
    showAlert: false,
    post: {
      content: "",
      title: "",
    },
    comments: [],

    // Your name and if you approved
    reviewerName: "",
    reviewerApproved: false,
  };

  fetchPost() {
    axios
      .get(`${API_URL}/posts/${this.props.match.params.id}`)
      .then((response) => {
        this.setState({
          post: { title: response.data.title, content: response.data.content },
          comments: response.data.comments,
          content: response.data.content,
        });
      });
  }

  onReviewClickHandler = (e) => {
    if (this.state.reviewerName === "") return

    this.setState({ showAlert: true });
    axios
      .post(`${API_URL}/posts/${this.props.match.params.id}/review`, {
        reviewerApproved: this.state.reviewerApproved,
        reviewerName: this.state.reviewerName,
      })
      .catch((err) => console.log(err));
  };

  onReviewCheckHandler = (e) => {
    this.setState((prevState) => ({
      reviewerApproved: !prevState.reviewerApproved,
    }));
  };

  onReviewNameHandler = (e) => {
    this.setState({ reviewerName: e.target.value });
  };

  componentDidMount() {
    this.fetchPost();
  }

  render() {
    return (
      <React.Fragment>
        <Collapse in={this.state.showAlert}>
          <Alert
            style={{
              marginBottom: "4px",
            }}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  this.setState({ showAlert: false });
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            Review submitted!
          </Alert>
        </Collapse>
        <Box
          display="flex"
          flex="1 auto"
          style={{ height: "calc(100% - 60px - 30px)" }}
        >
          <Grid container spacing={2}>
            <Grid
              item
              xs={8}
              style={{ paddingLeft: "32px", paddingTop: "32px" }}
            >
              <Typography variant="h6">Review Post</Typography>
              <Box textAlign="right">
                <TextField
                  fullWidth={true}
                  margin="normal"
                  multiline
                  rows={5}
                  disabled={true}
                  value={this.state.post.content}
                />
              </Box>

              <Box marginTop={"32px"}>
                <Typography variant="h6">Your Review</Typography>
                <Box>
                  <FormControlLabel
                    value="approved"
                    control={<Checkbox onChange={this.onReviewCheckHandler} />}
                    label="Approve"
                    labelPlacement="start"
                  />
                </Box>
                <Grid container={true}>
                  <TextField
                    value={this.state.reviewerName}
                    label="Your name"
                    size="small"
                    style={{ marginRight: "8px" }}
                    onChange={this.onReviewNameHandler}
                  />
                  <Button
                    onClick={this.onReviewClickHandler}
                    variant="contained"
                  >
                    Submit
                  </Button>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={4} height="100%">
              <CommentsPane
                comments={this.state.comments}
                postID={this.props.match.params.id}
                onCommentAdded={(comment) => {
                  this.setState((state) => ({
                    comments: state.comments.concat([comment]),
                  }));
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </React.Fragment>
    );
  }
}
