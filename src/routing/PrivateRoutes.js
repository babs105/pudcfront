import React from "react";
import { Route, Switch } from "react-router-dom";
import Navigation from "../components/Navigation";
import ComiteList from "../components/Comite/ComiteList";
import Comite from "../components/Comite/Comite";
import ComiteDetails from "../components/Comite/ComiteDetails";

const PrivateRoutes = () => (
  <div>
    <Navigation />
    <Switch>
      <Route exact path="/comiteList" component={ComiteList} />
      <Route exact path="/comite" component={Comite} />
      <Route exact path="/comite-show/:id" component={ComiteDetails} />
    </Switch>
  </div>
);

export default PrivateRoutes;
