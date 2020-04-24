import React from 'react';
import {BrowserRouter as Router, Switch,Route,Redirect} from "react-router-dom";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import FriendsList from './components/FriendsList';

export default function App() {
return (
  <Router>
    <Switch>
      <PrivateRoute exact path ="/friends" component={FriendsList} />
      <Route exact path="/login" component={Login} />
      <Redirect to="/login" />
    </Switch>
  </Router>
);
}
