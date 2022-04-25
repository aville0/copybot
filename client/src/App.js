import React, { Component } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import InputCreate from "./components/InputCreate/InputCreate";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import EditContent from "./components/EditContent/EditContent";

import "./App.scss";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Switch>
          <Redirect exact from="/" to="/create" />
          <Route
            exact
            path="/create"
            render={(routerProps) => <InputCreate {...routerProps} />}
          />
          <Route
            path="/posts/:id"
            render={(routerProps) => <EditContent {...routerProps} />}
          />
        </Switch>
        <Footer />
      </BrowserRouter>
    );
  }
}
