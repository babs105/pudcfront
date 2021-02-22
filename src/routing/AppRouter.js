import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PrivateRoutes from "./PrivateRoutes";
import AuthenticatedRoute from "./AuthenticatedRoute";

import Login from "../components/FormLogin";

class AppRouter extends Component {
  render() {
    return (
      <>
        <Router>
          <Switch>
            <Route path="/" exact component={Login} />
            <AuthenticatedRoute path="/" component={PrivateRoutes} />
            {/* <Route path="/" component={PrivateRoutes} /> */}
          </Switch>
        </Router>
      </>
    );
  }
}

export default AppRouter;
