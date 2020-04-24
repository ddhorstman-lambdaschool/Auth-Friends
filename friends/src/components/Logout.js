import React from "react";
import TokenContext from "../contexts/TokenContext";
import { Redirect } from "react-router-dom";
export default function Logout() {
  const { setToken } = React.useContext(TokenContext);
  setToken(null);
  window.localStorage.clear();
  return <Redirect to="/login" />;
}
