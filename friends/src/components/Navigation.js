import React from "react";
import { List, ListItem } from "@material-ui/core";
import { NavLink } from "react-router-dom";

import "../scss/App.scss";
import TokenContext from "../contexts/TokenContext";

export default function Navigation() {
  const { token } = React.useContext(TokenContext);
  return (
    <List component="nav">
      <ListItem component={NavLink} to="/friends">
        Friends List
      </ListItem>
      <ListItem component={NavLink} to="/new">
        Add New Friend
      </ListItem>
      <ListItem component={NavLink} to={token ? "/logout" : "/login"}>
        {token ? "Log Out" : "Log In"}
      </ListItem>
    </List>
  );
}
