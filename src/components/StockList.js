import React from 'react';
import { connect } from 'react-redux';
import { deleteStock, selectStock } from '../actions';
import axios from 'axios';

const container = {
  display: 'flex',
  justifyContent: 'space-between',
  textAlign: 'center',
  padding: '2px 60px'
};

const span = {
  cursor: 'pointer'
};

class StockList extends React.Component {
  handleClick = (e) => {
    const { selectStock } = this.props;
    const { textContent } = e.target;

    selectStock(textContent);
  }

  handleDelete = (e) => {
    const { deleteStock, user } = this.props;
    const { name } = e.target;
    let { stocks } = user;

    stocks = stocks.filter(stock => stock !== name);

    deleteStock(name);

    axios.patch('/users', {
      user,
      stocks
    });
  }

  render() {
    const { stocks } = this.props.user;
    const stock = stocks.map(stock => {
      return (
        <div key={stock} style={container}>
          <span name={stock} style={span} onClick={(e) => this.handleClick(e)}>
            {stock}
          </span>
          <button name={stock} type="button" onClick={e => this.handleDelete(e)}>X</button>
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

export default connect(mapStateToProps, {
  selectStock,
  deleteStock
})(StockList);