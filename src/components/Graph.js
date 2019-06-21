import React from 'react';
import { connect } from 'react-redux';
import { getIntraday, getDaily } from '../actions';

class Graph extends React.Component {
  componentDidMount() {
    const { getIntraday, getDaily } = this.props;
    getIntraday('MSFT');
    getDaily('MSFT');
  }

  render() {
    console.log(this.props);
    return (
      <div>Graph</div>
    );
  };
}

const mapStateToProps = state => {
  const { daily, intraday } = state;

  return {
    daily,
    intraday,
  };
};

export default connect(mapStateToProps, { getIntraday, getDaily })(Graph);