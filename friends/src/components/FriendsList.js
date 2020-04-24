import React from "react";

import axiosWithAuth from "../utils/axiosWithAuth";
import { CancelToken, isCancel } from "axios";
import { Container, LinearProgress } from "@material-ui/core";

import FriendCard from "./FriendCard";

export default function FriendsList() {
  const [friends, setFriends] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    let unmounted = false;
    let source = CancelToken.source();

    axiosWithAuth()
      .get("friends", {
        cancelToken: source.token,
      })
      .then(r => {
        if (unmounted) return;
        setFriends(r.data);
        setIsLoading(false);
      })
      .catch(e => {
        !unmounted && setIsLoading(false);
        isCancel(e) ? console.log(e.message) : console.error(e);
      });
    return () => {
      unmounted = true;
      source.cancel("FriendsList data fetching cancelled.");
    };
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
