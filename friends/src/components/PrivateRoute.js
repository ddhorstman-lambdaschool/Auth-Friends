import React from "react";
import { Route, Redirect } from "react-router-dom";
/**
 * A Route that will redirect to the login page if a valid token isn't found in localStorage.
 * This version expects the token to be a JSON-encoded string.
 * @param {any} props Any valid React props
 */
export default function PrivateRoute(props) {
  const token = localStorage.getItem("token");
  const isLoggedIn = token !== null && token !== "null";
  return isLoggedIn ? <Route {...props} /> : <Redirect to="/login" />;
}
