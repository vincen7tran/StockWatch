import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { addStock, selectStock } from '../actions';

const container = {
  padding: '5px 5px',
  borderColor: '#0e0d0d',
  borderBottom: 'solid 1px',
  textAlign: 'center',
};

class AddStock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ticker: ''
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value.toUpperCase() });
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    const { user, addStock, selectStock } = this.props;
    const { ticker } = this.state
    
    addStock(ticker);
    selectStock(ticker);

    await axios.patch('/users', {
      user,
      ticker
    });

  }

  render() {
    const { ticker } = this.state;

    return (
      <div style={container}>
        <form onSubmit={e => this.handleSubmit(e)}>
          <input name="ticker" type="text" value={ticker} onChange={e => this.handleChange(e)} placeholder="Add Ticker Symbol"></input>
          <button type="submit" >Add Stock</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state;

  return {
    user
  };
};

export default connect(mapStateToProps, {
  addStock,
  selectStock
})(AddStock);
