import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Login from "./components/Login";
import Logout from "./components/Logout";
import AddFriend from "./components/AddFriend";
import FriendsList from "./components/FriendsList";
import Navigation from "./components/Navigation";
import PrivateRoute from "./components/PrivateRoute";
import useLocalStorage from "./hooks/useLocalStorage";
import TokenContext from "./contexts/TokenContext";
import "./scss/App.scss";

export default function App() {
  const [token, setToken] = useLocalStorage("token");
  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <Router>
        <Navigation />
        <Switch>
          <PrivateRoute exact path="/friends" component={FriendsList} />
          <Route exact path="/new" component={AddFriend} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
          <Redirect to="/login" />
        </Switch>
      </Router>
    </TokenContext.Provider>
  );
}
