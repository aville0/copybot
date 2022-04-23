import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import InputCreate from "./components/InputCreate/InputCreate";

import "./App.scss";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <InputCreate />
      </BrowserRouter>
    );
  }
}
