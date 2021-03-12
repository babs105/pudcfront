import React from "react";
import { Route, Switch } from "react-router-dom";
import Navigation from "../components/Navigation";
import ComiteList from "../components/Comite/ComiteList";
import Comite from "../components/Comite/Comite";
import ComiteDetails from "../components/Comite/ComiteDetails";
import EquipementsByComite from "../components/Equipement/EquipementsByComite";
import AddEquipment from "../components/Equipement/AddEquipement";
import Equipements from "../components/Equipement/EquipementAll";
import FormationsByComite from "../components/Formation/FormationsByComite";
import AddFormation from "../components/Formation/AddFormation";
import Pannes from "../components/Panne/PanneAll";

const PrivateRoutes = () => (
  <div>
    <Navigation />
    <Switch>
      <Route exact path="/comiteList" component={ComiteList} />
      <Route exact path="/comite" component={Comite} />
      <Route exact path="/comite-show/:id" component={ComiteDetails} />


      <Route exact path="/equipement-all" component={Equipements} />
      <Route exact path="/equipement/:comiteParam" component={EquipementsByComite} />
      <Route exact path="/add-equipment/:idComite" component={AddEquipment} />

      <Route exact path="/panne-all" component={Pannes} />

      <Route exact path="/formation/:comiteParam" component={FormationsByComite} />
      <Route exact path="/add-formation/:idComite" component={AddFormation} />
    </Switch>
  </div>
);

export default PrivateRoutes;
