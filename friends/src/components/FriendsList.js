import React from "react";

import axiosWithAuth from "../utils/axiosWithAuth";
import { Container, LinearProgress } from "@material-ui/core";

import FriendCard from "./FriendCard";

export default function FriendsList() {
  const [friends, setFriends] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    axiosWithAuth
      .get("friends")
      .then(r => setFriends(r.data))
      .then(() => setIsLoading(false));
  }, []);

  return isLoading ? (
    <LinearProgress />
  ) : (
    <Container>
      {friends.map(friend => (
        <FriendCard key={friend.id} {...friend} />
      ))}
    </Container>
  );
}
