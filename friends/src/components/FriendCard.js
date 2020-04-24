import React from "react";
import { Card, CardContent, Typography, Link } from "@material-ui/core";
export default function FriendCard(props) {
    const [editing, setEditing] = React.useState(false);

    return (
        <Card style={{ margin: "5px" }}>
            <CardContent>
                <Typography variant="h3">{props.name}</Typography>
                <Typography>Age: {props.age}</Typography>
                <Link href={`mailto:${props.email}`}>{props.email}</Link>
            </CardContent>
        </Card>
    );
}
