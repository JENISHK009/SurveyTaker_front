/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { useEffect } from 'react';
import { Switch, Route, useHistory, Redirect } from 'react-router-dom';
import NotFoundPage from '../NotFoundPage/Loadable';

import 'react-datepicker/dist/react-datepicker.css';
import '../../assets/scss/style.scss';
import AdminPortal from '../../components/AdminPortal';
import HostView from '../../components/HostView';
import Login from '../../components/Login/Login';
import Preview from '../../components/AdminPortal/RegistrationForm/RegistrationFormBuilder/Preview';
// import Signup from '../../components/Signup';
// import Meeting from '../../components/AdminPortal/Meetings';

export default function App() {
  const history = useHistory();
  useEffect(() => {
    if (
      history.location.pathname.includes('/user-survey/') &&
      history.location.pathname.includes('/survey-share/') &&
      !window.sessionStorage.getItem('userToken')
    ) {
      history.push('/login');
    }
  }, [window.sessionStorage.getItem('userToken')]);

  useEffect(() => {
    if (
      history.location.pathname === '/login' &&
      window.sessionStorage.getItem('userToken')
    ) {
      history.push('/admin');
    }
  }, [history]);
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route path="/admin" component={AdminPortal} />
        <Route exact path="/host" component={HostView} />
        <Route path="/user-survey/:id" component={Preview} />
        <Route path="/survey-share/:id" component={Preview} />
        {/* <Route exact path="/signup" component={Signup} /> */}
        <Route exact path="/login" component={Login} />
        <Route component={NotFoundPage} />
      </Switch>
    </>
  );
}
