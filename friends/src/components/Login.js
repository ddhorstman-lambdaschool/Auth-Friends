import React from "react";
import {
  Container,
  Card,
  Button,
  TextField,
  Typography,
  ButtonGroup,
} from "@material-ui/core";

import axiosWithAuth from "../utils/axiosWithAuth";
import TokenContext from "../contexts/TokenContext";

const initialState = {
  username: "",
  password: "",
  error: null,
};

export default class Login extends React.Component {
  static contextType = TokenContext;
  state = initialState;

  componentDidMount() {
    const { setToken } = this.context;
    this.setToken = setToken;
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
    this.setState({ error: null });
  };

  handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("login", this.state)
      //.then(r => {console.log(r); return r;})
      .then(res => this.setToken(res.data.payload))
      .then(() => this.props.history.push("/friends"))
      .catch(({ message }) => this.setState({ error: message }));
  };

  handleReset = e => {
    e && e.preventDefault();
    this.setState(initialState);
  };
  render() {
    return (
      <Container>
        <Card className="login-form">
          <form onSubmit={this.handleSubmit} onReset={this.handleReset}>
            <Typography variant="h3">Log in</Typography>
            <TextField
              required
              error={!!this.state.error}
              label="Username"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
            <TextField
              required
              error={!!this.state.error}
              label="Password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
              helperText={this.state.error && "Incorrect username or password"}
            />
            <ButtonGroup>
              <Button variant="contained" type="submit" color="primary">
                Submit
              </Button>
              <Button variant="contained" type="reset">
                Reset
              </Button>
            </ButtonGroup>
          </form>
        </Card>
      </Container>
    );
  }
}
