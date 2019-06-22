export default (state = '', action) => {
  switch (action.type) {
    case 'SET_ENDDATE':
      return action.payload;
    default:
      return state;
  };
};
