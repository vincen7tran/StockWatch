export default (state = '', action) => {
  switch (action.type) {
    case 'SELECT_STOCK':
      return action.payload;
    default:
      return state;
  };
};