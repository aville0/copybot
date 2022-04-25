import "./InputCreate.scss";
import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../utils/utils";
import { TextField, Box, Button } from "@mui/material";
const { v4: uuidv4 } = require("uuid");

export default class InputCreate extends React.Component {
  state = {
    prompt: null,
    result: null,
  };

  onFillHandler = (e) => {
    this.setState({
      prompt: e.target.value,
    });
  };

  onGenerateClickHandler = async (e) => {
    await axios
      .post(`${API_URL}/posts/generate`, { prompt: this.state.prompt })
      .then((response) =>
        this.setState({
          result: response.data,
        })
      )
      .catch((err) => console.error(err));
  };

  onSubmitClickHandler = async (e) => {
    await axios
      .post(`${API_URL}/posts/create`, { content: this.state.result })
      .then((response) => {
        window.alert("submitted");
      })
      .catch((err) => console.log(err));
  };
  render() {
    const disableButton = !this.state.prompt;

    return (
      <>
        <section>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "100ch" },
            }}
          >
            <TextField
              id="outlined-basic"
              label="Enter text here"
              variant="outlined"
              onChange={this.onFillHandler}
            />
          </Box>
          <Button
            className={`input__submit ${
              disableButton ? "input__submit-disabled" : "input__submit-hover"
            }`}
            disabled={disableButton ? true : false}
            onClick={this.onGenerateClickHandler}
            variant="contained"
          >
            Done
          </Button>
        </section>

        <section>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "100ch" },
            }}
          >
            <TextField value={this.state.result} />
            <Button onClick={this.onSubmitClickHandler} variant="contained">
              Submit
            </Button>
          </Box>
        </section>
      </>
    );
  }
}
