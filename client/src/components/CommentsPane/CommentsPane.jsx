import "./CommentsPane.scss";
import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../utils/utils";
import {
  Box,
  List,
  Divider,
  ListItem,
  ListItemText,
  Typography,
  TextField,
  Button,
} from "@mui/material";

import { grey } from "@mui/material/colors";

export default class CommentsPane extends React.Component {
  render() {
    return (
      <Box
        flexDirection={"column"}
        display="flex"
        height="100%"
        borderLeft={`1px solid ${grey[400]}`}
      >
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            flex: "1 auto",
            overflowY: "scroll",
            height: "100%"
          }}
        >
          {this.props.comments.map((c) => {
            return (
              <>
                <Comment name={c.author} comment={c.comments} date={c.date} />
                <Divider component="li" />
              </>
            );
          })}
        </List>
        <AddComment postID={this.props.postID} />
      </Box>
    );
  }
}

export function Comment({ name, comment, date }) {
  return (
    <ListItem alignItems="flex-start">
      <ListItemText
        primary={
          <React.Fragment>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {name}
            </Typography>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.secondary"
            >
              {" — "}
              {comment}
            </Typography>
          </React.Fragment>
        }
        secondary={
          <Typography
            sx={{ display: "inline" }}
            component="span"
            variant="caption"
            color="text.secondary"
          >
            {date.toString()}
          </Typography>
        }
      />
    </ListItem>
  );
}

export function AddComment({ postID }) {
  const [comment, setComment] = useState("");

  const onEditCommentHandler = async (e) => {
    setComment(e.target.value);
  };

  const onSubmitCommentClickHandler = async (e) => {
    axios
      .post(`${API_URL}/posts/${postID}/comments`, {
        comments: comment,
        // TODO: Use the signed in account name
        author: "Ashley",
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box
      borderTop={`1px solid ${grey[400]}`}
      padding="0px 16px 16px 16px"
      width="100%"
      textAlign="right"
    >
      <TextField
        label="Add a comment for the reviewer here"
        variant="outlined"
        value={comment}
        fullWidth={true}
        margin="normal"
        multiline={true}
        rows={3}
        onChange={onEditCommentHandler}
      />
      <Button onClick={onSubmitCommentClickHandler} variant="contained">
        Add Comment
      </Button>
    </Box>
  );
}
