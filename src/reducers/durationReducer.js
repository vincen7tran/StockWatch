export default (state = '1M', action) => {
  switch (action.type) {
    case 'SET_DURATION':
      return action.payload;
    default:
      return state;
  };
};
