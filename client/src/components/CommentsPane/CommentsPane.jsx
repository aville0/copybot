import "./CommentsPane.scss";
import React, { useEffect, useRef, useState } from "react";
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

export default function CommentsPane(props) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current === null) return;
    ref.current.scrollTop = ref.current.scrollHeight;
  }, [props.comments.length]);
  return (
    <Box
      flexDirection={"column"}
      display="flex"
      height="100%"
      borderLeft={`1px solid ${grey[400]}`}
    >
      <List
        ref={ref}
        sx={{
          width: "100%",
          maxWidth: 360,
          flex: "1 auto",
          overflowY: "scroll",
          height: "100%",
        }}
      >
        {props.comments.map((c, idx) => {
          return (
            <React.Fragment key={idx}>
              <Comment name={c.author} comment={c.comments} date={c.date} />
              {idx < props.comments.length - 1 && <Divider component="li" />}
            </React.Fragment>
          );
        })}
      </List>
      <AddComment postID={props.postID} onCommentAdded={props.onCommentAdded} />
    </Box>
  );
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
            {date}
          </Typography>
        }
      />
    </ListItem>
  );
}

export function AddComment({ postID, onCommentAdded }) {
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");

  const onEditCommentHandler = (e) => {
    setComment(e.target.value);
  };

  const onSubmitCommentClickHandler = (e) => {
    if (name === "") return;

    const data = {
      comments: comment,
      date: new Date().toDateString(),
      // TODO: Use the signed in account name
      author: name,
    };
    onCommentAdded(data);
    axios
      .post(`${API_URL}/posts/${postID}/comments`, data)
      .catch((err) => console.log(err));
    setComment("");
  };

  const onEditNameHandler = (e) => {
    setName(e.target.value);
  };

  return (
    <Box
      borderTop={`1px solid ${grey[400]}`}
      padding="16px 16px 16px 16px"
      width="100%"
      textAlign="right"
    >
      <TextField
        label="Full Name"
        variant="outlined"
        value={name}
        fullWidth={true}
        size="small"
        onChange={onEditNameHandler}
      />
      <TextField
        label="Write a comment to your team..."
        variant="outlined"
        style={{ marginTop: "8px" }}
        value={comment}
        fullWidth={true}
        size="small"
        multiline={true}
        rows={3}
        onChange={onEditCommentHandler}
      />
      <Button
        onClick={onSubmitCommentClickHandler}
        variant="contained"
        style={{ marginTop: "8px" }}
      >
        Add Comment
      </Button>
    </Box>
  );
}
