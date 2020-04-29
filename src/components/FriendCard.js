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
  function toggleEditing() {
    setEditing(!editing);
  }

  function updateFriend({ name, age, email }) {
    axiosWithAuth()
      .put(`friends/${props.id}`, { name, age, email })
      .then(r => props.setFriends(r.data))
      .catch(console.error);
  }

  function deleteFriend() {
    axiosWithAuth()
      .delete(`friends/${props.id}`)
      //.then(r => { console.log(r); return r; })
      .then(r => props.setFriends(r.data))
      .catch(console.error);
  }

  return (
    <Card className='friend-card'>
      <CardContent>
        {editing ? (
          <>
            <FriendForm
              {...props}
              editingExisting={true}
              toggleEditing={toggleEditing}
              submitForm={updateFriend}
            />
            <Button
              variant='contained'
              color='secondary'
              onClick={deleteFriend}
            >
              Delete
            </Button>
          </>
        ) : (
          <>
            <Fab
              size='small'
              style={{ float: "right" }}
              onClick={toggleEditing}
            >
              <EditIcon />
            </Fab>
            <Typography variant='h3'>{props.name}</Typography>
            <Typography>Age: {props.age}</Typography>
            <Link href={`mailto:${props.email}`} target='_blank'>
              {props.email}
            </Link>
          </>
        )}
      </CardContent>
    </Card>
  );
}
