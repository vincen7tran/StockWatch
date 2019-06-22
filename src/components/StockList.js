import React from 'react';
import { connect } from 'react-redux';

const StockList = props => {
  const { stocks } = props.user;
  console.log(stocks);
  const stock = stocks.map(stock => {
    return (
      <div key={stock}>
        {stock}
      </div>
    );
  });

  return (
    <div>{stock}</div>
  );
};

const mapStateToProps = state => {
  const { user } = state;

  return {
    user
  };
};

export default connect(mapStateToProps)(StockList);