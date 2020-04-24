import React from "react";

import axiosWithAuth from "../utils/axiosWithAuth";
import { Container } from "@material-ui/core";

import FriendCard from "./FriendCard";

export default class FriendsList extends React.Component {
    state = {
        friends: [],
    };
    componentDidMount() {
        axiosWithAuth
            .get("friends")
            .then(r => this.setState({ friends: r.data }));
    }

    render() {
        return (
            <Container>
                {this.state.friends.map(friend => (
                    <FriendCard key={friend.id} {...friend} />
                ))}
            </Container>
        );
    }
}
