import "./InputCreate.scss";
import LoadingButton from "@mui/lab/LoadingButton";
import React from "react";
import axios from "axios";
import { API_URL } from "../../utils/utils";
import {
  TextField,
  Container,
  Box,
  Grid,
  Button,
  Typography,
} from "@mui/material";

export default class InputCreate extends React.Component {
  state = {
    prompt: "",
    results: [],
    loading: false,
  };

  onFillHandler = (e) => {
    this.setState({
      prompt: e.target.value,
    });
  };

  onGenerateClickHandler = (e) => {
    this.setState({ loading: true });
    axios
      .post(`${API_URL}/posts/generate`, { prompt: this.state.prompt })
      .then((response) =>
        this.setState({
          results: response.data.choices.map((c) => c.text),
          loading: false,
        })
      )
      .catch((err) => {
        this.setState({ loading: false });
        console.error(err);
      });
  };

  render() {
    return (
      <React.Fragment>
        <Box
          display="flex"
          flexDirection="column"
          flex="1 auto"
          style={{
            height: "calc(100% - 60px - 30px)",
            width: "100%",
            overflowY: "scroll",
          }}
        >
          <Container style={{ paddingTop: "16px" }}>
            <Typography variant="h6">Create Post</Typography>
            <Box textAlign="right">
              <TextField
                fullWidth={true}
                margin="normal"
                multiline
                rows={5}
                onChange={this.onFillHandler}
              />
              <Typography
                variant="caption"
                paragraph={true}
                color="text.secondary"
              >
                If you're happy with the results, select which one you'd like to
                start editing. Otherwise, run it again.
              </Typography>
              <LoadingButton
                onClick={this.onGenerateClickHandler}
                loading={this.state.loading}
                variant="contained"
                disabled={this.state.prompt === ""}
              >
                Generate
              </LoadingButton>
            </Box>
          </Container>

          {this.state.results.length > 0 && (
            <Container style={{ paddingBottom: "16px" }}>
              <Typography variant="h6">Results</Typography>
              <Grid container spacing={2}>
                {this.state.results.map((r, idx) => (
                  <Grid item xs={12} key={idx}>
                    <ResultBox text={r} history={this.props.history} />
                  </Grid>
                ))}
              </Grid>
            </Container>
          )}
        </Box>
      </React.Fragment>
    );
  }
}

function ResultBox({ text, history }) {
  const onSubmitClickHandler = (result) => {
    axios
      .post(`${API_URL}/posts/create`, { content: result })
      .then((response) => {
        history.push(`posts/${response.data.postId}/edit`);
      }, 2000)
      .catch((err) => console.log(err));
  };

  return (
    <Box style={{ width: "100%", textAlign: "right" }}>
      <TextField
        multiline
        fullWidth
        margin="normal"
        rows={5}
        value={text}
        disabled={true}
      />
      <Button onClick={(e) => onSubmitClickHandler(text)} variant="contained">
        Edit
      </Button>
    </Box>
  );
}
