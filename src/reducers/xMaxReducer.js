export default (state = 0, action) => {
  switch (action.type) {
    case 'SET_XMAX':
      return action.payload;
    default:
      return state;
  };
};