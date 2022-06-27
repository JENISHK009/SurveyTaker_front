import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import Sidebar from './Sidebar/Sidebar';

const HostView = () => (
  <div className="host-view-wrapper">
    <>
      <div className="row mx-0">
        <Sidebar />
        <div className="wrapper">
          <Switch>
            <Route exact path="/host" component={Dashboard} />
          </Switch>
        </div>
      </div>
    </>
  </div>
);

export default HostView;
