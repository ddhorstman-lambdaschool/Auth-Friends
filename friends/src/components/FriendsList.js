import React from "react";

import { axiosWithAuthCancellable } from "../utils/axiosWithAuth";
import { Container, LinearProgress } from "@material-ui/core";

import FriendCard from "./FriendCard";

export default class FriendsList extends React.Component {
  state = {
    friends: [],
    isLoading: true,
  };

  componentDidMount() {
    const {
      unmounted,
      isCancel,
      axiosWithAuth,
      cancelAPICall,
    } = axiosWithAuthCancellable();
    this.cancelAPICall = cancelAPICall.bind(this);

    axiosWithAuth()
      .get("friends")
      .then(r => {
        if (unmounted()) return;
        this.setState({ friends: r.data });
        this.setState({ isLoading: false });
      })
      .catch(e => {
        !unmounted() && this.setState({ isLoading: false });
        isCancel(e) ? console.log(e.message) : console.error(e);
      });
  }

  componentWillUnmount() {
    this.cancelAPICall();
  }

  render() {
    return this.state.isLoading ? (
      <LinearProgress />
    ) : (
      <Container className="friends-list">
        {this.state.friends.map(friend => (
          <FriendCard
            key={friend.id}
            {...friend}
            setFriends={friends => this.setState({ friends })}
          />
        ))}
      </Container>
    );
  }
}
