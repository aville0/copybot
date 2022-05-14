import React from "react";
import { BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import InputCreate from "./components/InputCreate/InputCreate";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import EditContent from "./components/EditContent/EditContent";
import ReviewContent from "./components/ReviewContent/ReviewContent";
import Home from "./components/Home/Home";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.scss";
import {
  Box,

} from "@mui/material";

export default function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <RouterApp />
    </React.Fragment>
  );
}

function RouterApp() {
  return (
    <BrowserRouter>
      <Box height="100%" display="flex" flexDirection="column">
      <Header />
        <Switch>
          <Route
            exact
            path="/"
            render={(routerProps) => <Home {...routerProps} />}
          />
          <Route
            path="/create"
            render={(routerProps) => <InputCreate {...routerProps} />}
          />
          <Route
            path="/posts/:id/review"
            render={(routerProps) => <ReviewContent {...routerProps} />}
          />
          <Route
            path="/posts/:id/edit"
            render={(routerProps) => <EditContent {...routerProps} />}
          />
          <Redirect exact from="*" to="/" />
        </Switch>
        <Footer />
      </Box>
    </BrowserRouter>
  );
}
