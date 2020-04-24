import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute(props) {
  const token = localStorage.getItem("token");
  const isLoggedIn = token !== null && token !== "null";
  return isLoggedIn ? <Route {...props} /> : <Redirect to="/login" />;
}
