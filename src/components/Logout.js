import React from "react";
import TokenContext from "../contexts/TokenContext";
import { Redirect, Link } from "react-router-dom";
import { Typography, LinearProgress } from "@material-ui/core";

export default function Logout() {
  const { setToken } = React.useContext(TokenContext);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setToken(null);
    const timeout = window.setTimeout(() => setLoading(false), 1500);
    return () => window.clearTimeout(timeout);
  }, [setToken]);

  return loading ? (
    <>
      <LinearProgress />
      <Typography variant="h4">
        You have been logged out. Redirecting to <Link to="/login">Login</Link>.
      </Typography>
    </>
  ) : (
    <Redirect to="/login" />
  );
}
