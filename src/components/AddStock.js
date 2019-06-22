import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { addStock } from '../actions';

class AddStock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ticker: ''
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    const { user, addStock } = this.props;
    const { ticker } = this.state
    
    addStock(ticker);

    await axios.patch('/users', {
      user,
      ticker
    });

  }

  render() {
    const { ticker } = this.state;

    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <input name="ticker" type="text" value={ticker} onChange={e => this.handleChange(e)} placeholder="Add Ticker Symbol"></input>
        <button type="submit" >Add Stock</button>
      </form>
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
  addStock
})(AddStock);
