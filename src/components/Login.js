import React from 'react';
import { connect } from 'react-redux';
import { setUser } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: ''
    };
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { setUser } = this.props;
    const { email } = this.state;

    setUser(email);
  }

  handleChange = (e) => {
    const { value, name } = e.target;

    this.setState({ [name]: value });
  }

  render() {
    const { email } = this.state;

    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <input name="email" type="email" placeholder="email" value={email} onChange={this.handleChange}></input>
        <button type="submit">Login</button>
      </form>
    );
  }
}

export default connect(null, {
  setUser,
})(Login);