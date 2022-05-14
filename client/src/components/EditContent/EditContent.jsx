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
  ListItemButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Typography,
} from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";

export default class EditContent extends React.Component {
  state = {
    editContent: null,
    content: null,
    reviews: [],
    comments: [],
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

  onEditEventHandler = async (e) => {
    this.setState({
      editContent: e.target.value,
    }).catch((err) => console.error(err));
  };

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

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <Box display="flex" flex="1 auto">
        <Grid container spacing={2}>
          <Grid item xs={8} style={{ paddingLeft: "32px", paddingTop: "32px" }}>
            <Typography variant="h6">Edit Post</Typography>

            <Box textAlign="right">
              <TextField
                fullWidth={true}
                margin="normal"
                id="outlined-multiline-static"
                multiline
                rows={5}
                defaultValue={this.state.editContent}
                onChange={this.onEditEventHandler}
              />
              <ButtonGroup variant="contained">
                <Button
                  onChange={() => {
                    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      this.state.editContent
                    )}`;
                    this.props.history.push(url);
                  }}
                  endIcon={<TwitterIcon />}
                >
                  Share to Twitter
                </Button>
                <Button onClick={this.onSubmitClickHandler}>
                  Send for Review
                </Button>
              </ButtonGroup>
            </Box>
            <Box marginTop={"32px"}>
              <Typography variant="h6">Approvals</Typography>
              <ApprovalList reviews={this.state.reviews} />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <CommentsPane
              comments={this.state.comments}
              postID={this.props.match.params.id}
            />
          </Grid>
        </Grid>
      </Box>
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
              <ListItemIcon sx={{minWidth: "40px"}}>
                <Checkbox
                  disabled
                  checked={r.approved}
                  edge="start"
                />
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