import React from 'react';
import { connect } from 'react-redux';
import { setDuration } from '../actions';

class Nav extends React.Component {
  handleClick = (e) => {
    const { setDuration } = this.props;
    const split = e.target.textContent.split('');

    setDuration({
      interval: split[0],
      unit: split[1]
    });
  }

  render() {
    const { duration, data } = this.props;

    const span = {
      cursor: 'pointer',
      margin: '0 10px'
    };

    const selected = {
      cursor: 'pointer',
      margin: '0 10px',
      fontWeight: '500'
    };

   if (!!data.length) selected.color = data[data.length - 1].y > data[0].y ? '#21ce99': '#f45351';

    const current = '' + duration.interval + duration.unit;

    return (
      <div>
        <span style={current === '1M' ? selected : span} onClick={e => this.handleClick(e)}>1M</span>
        <span style={current === '6M' ? selected : span} onClick={e => this.handleClick(e)}>6M</span>
        <span style={current === '1Y' ? selected : span} onClick={e => this.handleClick(e)}>1Y</span>
        <span style={current === '3Y' ? selected : span} onClick={e => this.handleClick(e)}>3Y</span>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { duration, data } = state;

  return {
    duration,
    data
  };
};

export default connect(mapStateToProps, {
  setDuration
})(Nav);