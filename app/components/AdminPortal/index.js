import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Sidebar from './Sidebar';
import SurveyView from './Survey/SurveyView';
import RegistrationForm from './RegistrationForm/RegistrationForm';
import Preview from './RegistrationForm/RegistrationFormBuilder/Preview';
import NotFoundPage from '../../containers/NotFoundPage';
import SurveyFolderView from './Survey/SurveyFolderView';

const AdminPortal = () => (
  <BrowserRouter basename="/admin">
    <div className="">
      <Sidebar />
      <div className="wrapper">
        <Switch>
          {/* <Route exact path="/"> */}
          <Route exact Route path="/surveys" component={SurveyFolderView} />
          {/* </Route> */}
          <Route
            exact
            Route
            path="/surveys/registration-form/:id"
            component={RegistrationForm}
          />
          <Route
            Route
            exact
            path="/surveys/registration-form/preview/:id"
            component={Preview}
          />
          <Route exact Route path="/surveys/list/:id" component={SurveyView} />

          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </div>
  </BrowserRouter>
);

export default AdminPortal;
