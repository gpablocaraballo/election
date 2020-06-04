import React from 'react';
import { Switch, Route } from "react-router-dom";
import Home from "./home";
import GeneralResults from "../generalresults/generalresults.jsx";
import FilterResults from "../filterresults/filterresults.jsx";
import {IncidentsResults} from "../incidentsresults/incidentsresults.jsx";
import TableResults from "../tableresults/tableresults.jsx";

function MainContent() {
    
    return (
        <div className="container is-fluid">
          <div className="notification">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/generalresults" component={GeneralResults} />
              <Route path="/filterresults" component={FilterResults} />
              <Route path="/incidentsresults" component={IncidentsResults} />
              <Route path="/tableresults" component={TableResults} />
            </Switch>
          </div>
        </div>
        
    );

}
export default MainContent;