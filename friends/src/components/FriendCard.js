import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Link,
  Fab,
  Button,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import FriendForm from "./FriendForm";
import axiosWithAuth from "../utils/axiosWithAuth";

export default function FriendCard(props) {
  const [editing, setEditing] = React.useState(false);
  const [state, setState] = React.useState(props);
  function toggleEditing() {
    setEditing(!editing);
  }

  function updateFriend({ name, age, email }) {
    axiosWithAuth()
      .put(`friends/${state.id}`, { name, age, email })
      .then(r => setState(r.data.find(x => x.id === state.id)))
      .catch(console.error);
  }

  function deleteFriend() {
    axiosWithAuth()
      .delete(`friends/${state.id}`)
      //.then(r => { console.log(r); return r; })
      .then(r => props.setFriends(r.data))
      .catch(console.error);
  }

  return (
    <Card className="friend-card">
      <CardContent>
        {editing ? (
          <>
            <FriendForm
              {...state}
              editingExisting={true}
              toggleEditing={toggleEditing}
              submitForm={updateFriend}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={deleteFriend}
            >
              Delete
            </Button>
          </>
        ) : (
          <>
            <Fab size="small" style={{ float: "right" }}>
              <EditIcon onClick={toggleEditing} />
            </Fab>
            <Typography variant="h3">{state.name}</Typography>
            <Typography>Age: {state.age}</Typography>
            <Link href={`mailto:${state.email}`}>{state.email}</Link>
          </>
        )}
      </CardContent>
    </Card>
  );
}
