import React from "react";
import { Card, CardContent, Typography, Link, Fab } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
export default function FriendCard(props) {
  const [editing, setEditing] = React.useState(false);

  function toggleEditing() {
    setEditing(!editing);
  }

  return (
    <Card style={{ margin: "5px" }}>
      <CardContent>
        {editing ? (
          <div />
        ) : (
          <>
            {/*<Fab size="small" style={{ float: "right" }}>
              <EditIcon onClick={toggleEditing} />
            </Fab>*/}
            <Typography variant="h3">{props.name}</Typography>
            <Typography>Age: {props.age}</Typography>
            <Link href={`mailto:${props.email}`}>{props.email}</Link>
          </>
        )}
      </CardContent>
    </Card>
  );
}
