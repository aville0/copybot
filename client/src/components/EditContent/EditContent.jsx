import "./EditContent.scss";
import React from "react";
import CommentsPane from "../CommentsPane/CommentsPane";
import axios from "axios";
import { API_URL } from "../../utils/utils";
import {
  TextField,
  Box,
  Button,
  ButtonGroup,
  Grid,
  List,
  Alert,
  IconButton,
  ListItemButton,
  Collapse,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Typography,
} from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import ShareIcon from "@mui/icons-material/Share";
import CloseIcon from "@mui/icons-material/Close";

export default class EditContent extends React.Component {
  state = {
    editContent: null,
    content: null,
    reviews: [],
    comments: [],
    showShareAlert: false,
  };

  fetchData() {
    axios
      .get(`${API_URL}/posts/${this.props.match.params.id}`)
      .then((response) => {
        this.setState({
          editContent: response.data.content,
          reviews: response.data.reviews,
          comments: response.data.comments,
        });
      });
  }

  onEditEventHandler(e) {
    this.setState({
      editContent: e.target.value,
    });
  }

  onSubmitClickHandler(e) {
    this.setState({ showShareAlert: true });
    axios
      .post(`${API_URL}/posts/${this.props.match.params.id}/edit`, {
        content: this.state.editContent,
      })
      .catch((err) => console.log(err));

    const url = new URL(
      `posts/${this.props.match.params.id}/review`,
      window.location.origin
    ).href;
    navigator.clipboard.writeText(url);
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <React.Fragment>
        <Collapse in={this.state.showShareAlert}>
          <Alert
            style={{
              marginBottom: "4px",
            }}
            severity="info"
            iconMapping={{
              info: <ShareIcon fontSize="inherit" />,
            }}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  this.setState({ showShareAlert: false });
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            Link copied to clipboard!
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
              <Typography variant="h6">Edit Post</Typography>

              <Box textAlign="right">
                <TextField
                  fullWidth={true}
                  margin="normal"
                  style={{ marginBottom: "16px" }}
                  multiline
                  rows={5}
                  defaultValue={this.state.editContent}
                  onChange={this.onEditEventHandler.bind(this)}
                />
                <ButtonGroup variant="contained">
                  <Button
                    onClick={() => {
                      const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                        this.state.editContent
                      )}`;
                      window.location.href = url;
                    }}
                    endIcon={<TwitterIcon />}
                  >
                    Share to Twitter
                  </Button>
                  <Button
                    onClick={this.onSubmitClickHandler.bind(this)}
                    endIcon={<ShareIcon />}
                  >
                    Share with Team
                  </Button>
                </ButtonGroup>
              </Box>
              <Box marginTop={"32px"}>
                <Typography variant="h6">Approvals</Typography>
                {this.state.reviews.length > 0 ? (
                  <ApprovalList reviews={this.state.reviews} />
                ) : (
                  <Typography color="text.secondary" marginTop={"8px"}>
                    No reviews yet...
                  </Typography>
                )}
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

function ApprovalList({ reviews }) {
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }} disablePadding>
      {reviews.map((r, idx) => {
        return (
          <ListItem key={idx} disablePadding>
            <ListItemButton role={undefined} dense disableRipple>
              <ListItemIcon sx={{ minWidth: "40px" }}>
                <Checkbox disabled checked={r.approved} edge="start" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {r.author}
                    </Typography>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.secondary"
                    >
                      &nbsp;— {r.date}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
