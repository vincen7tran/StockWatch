export default (state = { interval: 1, unit: 'M'}, action) => {
  switch (action.type) {
    case 'SET_DURATION':
      return action.payload;
    default:
      return state;
  };
};
