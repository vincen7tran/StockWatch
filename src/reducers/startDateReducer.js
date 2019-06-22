export default (state = '', action) => {
  switch (action.type) {
    case 'SET_STARTDATE':
      return action.payload;
    default:
      return state;
  };
};
