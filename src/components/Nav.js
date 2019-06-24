import React from 'react';
import { connect } from 'react-redux';
import { setDuration } from '../actions';

const span = {
  cursor: 'pointer',
  margin: '0 10px'
};

class Nav extends React.Component {
  handleClick = (e) => {
    const { setDuration } = this.props;
    const { textContent } = e.target;
    console.log(textContent);
    setDuration(textContent);
  }

  render() {
    return (
      <div>
        <span style={span} onClick={e => this.handleClick(e)}>1M</span>
        <span style={span} onClick={e => this.handleClick(e)}>6M</span>
        <span style={span} onClick={e => this.handleClick(e)}>1Y</span>
        <span style={span} onClick={e => this.handleClick(e)}>3Y</span>
      </div>
    );
  }
}

export default connect(null, {
  setDuration
})(Nav);