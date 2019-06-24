import React from 'react';
import { connect } from 'react-redux';
import { setUser } from '../actions';

const loginStyle = {
  position: 'absolute',
  width: '100%',
  margin: 'auto',
  top: '50%',
};

const centered = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const input = {
  width: '15%'
};

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
      <form style={loginStyle} onSubmit={e => this.handleSubmit(e)}>
        <div style={centered}>
          <input style={input} name="email" type="email" placeholder="email" value={email} onChange={this.handleChange}></input>
          <button type="submit">Login</button>
        </div>
      </form>
    );
  }
}

export default connect(null, {
  setUser,
})(Login);