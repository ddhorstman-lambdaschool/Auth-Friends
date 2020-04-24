import React from "react";

import axiosWithAuth from "../utils/axiosWithAuth";
import { Container, LinearProgress } from "@material-ui/core";

import FriendCard from "./FriendCard";
import TokenContext from "../contexts/TokenContext";

export default function FriendsList() {
  const [friends, setFriends] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    axiosWithAuth()
      .get("friends")
      .then(r => setFriends(r.data))
      .then(() => setIsLoading(false))
      .catch(e => {
        console.error(e);
        setIsLoading(false);
      });
  }, []);

  return isLoading ? (
    <LinearProgress />
  ) : (
    <Container className="friends-list">
      {friends.map(friend => (
        <FriendCard key={friend.id} {...friend} setFriends={setFriends} />
      ))}
    </Container>
  );
}
