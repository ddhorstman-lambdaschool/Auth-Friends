import React from "react";
import FriendForm from "./FriendForm";
import axiosWithAuth from "../utils/axiosWithAuth";
import { Container } from "@material-ui/core";

export default function AddFriend(props) {
  const [error, setError] = React.useState(null);

  function addFriend({ name, age, email }) {
    axiosWithAuth()
      .post("friends", { name, age, email })
      //.then(console.log)
      .then(() => setError(null))
      .then(() => props.history.push("/friends"))
      .catch(({ message }) => setError(message));
  }

  return (
    <Container className="add-friend-form">
      <FriendForm submitForm={addFriend} error={error} />
    </Container>
  );
}
