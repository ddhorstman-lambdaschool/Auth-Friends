import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Typography } from "@material-ui/core";

import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import FriendsList from "./components/FriendsList";

export default function App() {
    return (
        <>
            <Typography variant="h1">Friends!</Typography>
            <Router>
                <Switch>
                    <PrivateRoute exact path="/friends" component={FriendsList} />
                    <Route exact path="/login" component={Login} />
                    <Redirect to="/login" />
                </Switch>
            </Router>
        </>
    );
}
