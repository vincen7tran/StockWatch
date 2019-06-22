const user = {
  "stocks": [
      "TSLA",
      "MSFT",
      "AAPL",
      "WDAY"
  ],
  "_id": "5d0e981722fb16f9c06e07d9",
  "email": "vincen7.tran@gmail.com",
  "__v": 0
};

export default (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    case 'ADD_STOCK':
      return { ...state, stocks: [...state.stocks, action.payload] };
    default:
      return state;
  };
};
