import React from 'react';
import { connect } from 'react-redux';
import AddStock from './AddStock';
import StockList from './StockList';

const flexContainer = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const container = {
  width: '100%',
  position: 'relative',
  borderColor: '#0e0d0d',
  border: 'solid 1px',
};

const header = {
  borderColor: '#0e0d0d',
  borderBottom: 'solid 1px',
  padding: '4px 24px 0',
  flex: '0, 0, 27.77778%',
  height: '26px',
};

const title = {
  fontSize: '16px',
  fontWeight: '500',
  letterSpacing: '0',
  lineHeight: '22px',
  margin: '0',
};

class UserCard extends React.Component {

  render() {
    const { user } = this.props;
    const { email } = user;

    return (
      <div style={flexContainer}>
        <div style={container}>
          <header style={header}>
            <h3 style={title}>{email}</h3>
          </header>
          <AddStock />
          <StockList />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { user } = state;

  return {
    user
  };
};

export default connect(mapStateToProps)(UserCard);