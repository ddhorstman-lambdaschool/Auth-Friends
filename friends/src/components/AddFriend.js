import React from "react";
import FriendForm from "./FriendForm";
import axiosWithAuth from "../utils/axiosWithAuth";
import { Container } from "@material-ui/core";
export default function AddFriend(props) {
  function addFriend({ name, age, email }) {
    axiosWithAuth
      .post("friends", { name, age, email })
      .then(console.log)
      .then(() => props.history.push("/friends"))
      .catch(console.error);
  }
  return (
    <Container className="add-friend-form">
      <FriendForm submitForm={addFriend} />
    </Container>
  );
}
