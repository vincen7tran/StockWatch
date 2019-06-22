import React from 'react';
import { connect } from 'react-redux';
import Login from './Login';
import UserCard from './UserCard';
import Graph from './Graph';

const bodyStyle = {
  fontFamily: '"DIN Pro", -apple-system, BlinkMacSystemFont, sans-serif',
  width: '100%',
};

const container = {
  width: '1024px',
  margin: '0 auto',
  paddingTop: '36px'  
};

const flex = {
  display: 'flex',
  justifyContent: 'space-between',
  margin: '0 -6px',
};

const App = (props) => {
  const { user } = props;

  if (!user) {
    return (
      <Login />
    );
  }

  else {
    return (
      <div style={bodyStyle}>
        <div style={container}>
          <div style={flex}>
            <UserCard />
            <Graph />
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => {
  const { user } = state;

  return {
    user
  };
};

export default connect(mapStateToProps)(App);


