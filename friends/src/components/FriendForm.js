import React from "react";
import { TextField, Button, ButtonGroup } from "@material-ui/core";

const initialState = {
  name: "",
  age: "",
  email: "",
  editingExisting: false,
  id: null,
};

export default class FriendForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.editingExisting ? props : initialState;
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleReset = (e) => {
    e && e.preventDefault();
    this.state.editingExisting
      ? this.props.toggleEditing()
      : this.setState(initialState);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.submitForm(this.state);
    this.handleReset();
  };

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        onReset={this.handleReset}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <TextField
          required
          label="Name"
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <TextField
          required
          label="Age"
          name="age"
          value={this.state.age}
          onChange={this.handleChange}
        />
        <TextField
          required
          label="Email address"
          name="email"
          value={this.state.email}
          onChange={this.handleChange}
        />
        <ButtonGroup>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
          <Button variant="contained" type="reset">
            {this.props.editingExisting ? "Cancel" : "Reset"}
          </Button>
        </ButtonGroup>
      </form>
    );
  }
}
