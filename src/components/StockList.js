import React from 'react';
import { connect } from 'react-redux';
import { selectStock } from '../actions';

const container = {
  textAlign: 'center'
};

const span = {
  cursor: 'pointer'
};

class StockList extends React.Component {
  handleClick = (e) => {
    console.log(e.target.textContent);
  }

  render() {
    const { stocks } = this.props.user;
    const stock = stocks.map(stock => {
      return (
        <div key={stock} style={container}>
          <span name={stock} style={span} onClick={(e) => this.handleClick(e)}>
            {stock}
          </span>
        </div>
      );
    });
  
    return (
      <div>{stock}</div>
    );
  }
};

const mapStateToProps = state => {
  const { user } = state;

  return {
    user
  };
};

export default connect(mapStateToProps)(StockList);