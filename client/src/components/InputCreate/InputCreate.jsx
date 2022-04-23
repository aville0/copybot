import "./InputCreate.scss";
import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../utils/utils";
import { TextField, Box, Button } from "@mui/material";

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

  onClickHandler = async (e) => {
    await axios
      .post(`${API_URL}/create/create`, { prompt: this.state.prompt })
      .then((response) =>
        this.setState({
          result: response.data,
        })
      )
      .catch((err) => console.error(err));
  };

  
  render() {
    return (
      <>
        <section>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "100ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Enter text here"
              variant="outlined"
              onChange={this.onFillHandler}
            />
          </Box>
          <Button onClick={this.onClickHandler} variant="contained">
            Done
          </Button>
        </section>

        <section>
          <Box>
            <p>{this.state.result}</p>
          </Box>
        </section>
      </>
    );
  }
}
