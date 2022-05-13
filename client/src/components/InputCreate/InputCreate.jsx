import "./InputCreate.scss";
import LoadingButton from "@mui/lab/LoadingButton";
import React from "react";
import axios from "axios";
import { API_URL } from "../../utils/utils";
import { TextField, Box, Button, Snackbar, Slide, Alert } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import RefreshIcon from "@mui/icons-material/Refresh";
import Refresh from "@mui/icons-material/Refresh";

export default class InputCreate extends React.Component {
  state = {
    prompt: null,
    result1: null,
    result2: null,
    result3: null,
    loading: false,
    textToCopy: false,
    postId: [],
  };

  onFillHandler = (e) => {
    this.setState({
      prompt: e.target.value,
    });
  };

  onGenerateClickHandler = async (e) => {
    this.setState({ loading: true });
    await axios
      .post(`${API_URL}/posts/generate`, { prompt: this.state.prompt })
      .then((response) =>
        this.setState({
          result1: response.data.choices[0].text,
          result2: response.data.choices[1].text,
          result3: response.data.choices[2].text,
          loading: false,
        })
      )
      .catch((err) => {
        this.setState({ loading: false });
        console.error(err);
      });
  };

  onSubmitClickHandler = async (result, e) => {
    e.preventDefault();
    await axios
      .post(`${API_URL}/posts/create`, { content: result })
      .then((response) => {
        this.props.history.push(`posts/${response.data.postId}/edit`);
      }, 2000)
      .catch((err) => console.log(err));
  };
  render() {
    const disableButton = !this.state.prompt;
    const TransitionDown = (props) => {
      return <Slide {...props} direction="down" />;
    };

    return (
      <>
        <section>
          <h1>Enter your text below</h1>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "100ch" },
            }}
          >
            <TextField
              id="outlined-multiline-static"
              label="Input"
              multiline
              rows={5}
              onChange={this.onFillHandler}
            />
          </Box>

          <LoadingButton
            onClick={this.onGenerateClickHandler}
            endIcon={<SendIcon />}
            loading={this.state.loading}
            loadingPosition="end"
            variant="contained"
            className={`input__submit ${
              disableButton ? "input__submit-disabled" : "input__submit-hover"
            }`}
            disabled={disableButton ? true : false}
          >
            Done
          </LoadingButton>
          <RefreshIcon />
        </section>

        <section>
          <h2>Results</h2>
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
              value={this.state.result1}
              disabled={true}
            />
            <div className="copy-button">
              <ContentCopyIcon
                onClick={() => {
                  navigator.clipboard.writeText(this.state.result1);
                }}
              />
              <Button
                onClick={(e) =>
                  this.onSubmitClickHandler(this.state.result1, e)
                }
                variant="contained"
              >
                Edit
              </Button>
              <Snackbar
                open={this.state.open}
                TransitionComponent={TransitionDown}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <Alert severity="success" sx={{ width: "100%" }}>
                  Great! You will be redirected in 2 seconds
                </Alert>
              </Snackbar>
            </div>
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={5}
              value={this.state.result2}
              disabled={true}
            />
            <div className="copy-button">
              <ContentCopyIcon
                onClick={() => {
                  navigator.clipboard.writeText(this.state.result2);
                }}
              />
              <Button
                onClick={(e) =>
                  this.onSubmitClickHandler(this.state.result2, e)
                }
                variant="contained"
              >
                Edit
              </Button>
              <Snackbar
                open={this.state.open}
                TransitionComponent={TransitionDown}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <Alert severity="success" sx={{ width: "100%" }}>
                  Great! You will be redirected in 2 seconds
                </Alert>
              </Snackbar>
            </div>
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={5}
              value={this.state.result3}
              disabled={true}
            />
            <div className="copy-button">
              <ContentCopyIcon
                onClick={() => {
                  navigator.clipboard.writeText(this.state.result3);
                }}
              />
              <Button
                onClick={(e) =>
                  this.onSubmitClickHandler(this.state.result3, e)
                }
                variant="contained"
              >
                Edit
              </Button>
              <Snackbar
                open={this.state.open}
                TransitionComponent={TransitionDown}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <Alert severity="success" sx={{ width: "100%" }}>
                  Great! You will be redirected in 2 seconds
                </Alert>
              </Snackbar>
            </div>
            <p>
              If you're happy with the results, select which one you'd like to
              start editing. Otherwise, run it again.
            </p>
            {/* <Button onClick={this.onSubmitClickHandler} variant="contained">
              Submit
            </Button> */}
            {/* <Snackbar
              open={this.state.open}
              TransitionComponent={TransitionDown}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert severity="success" sx={{ width: "100%" }}>
                Great! You will be redirected in 2 seconds
              </Alert>
            </Snackbar> */}
          </Box>
        </section>
      </>
    );
  }
}
