export default (state = null, action) => {
  switch (action.type) {
    case "FETCH_INTRADAY":
      return action.payload;
    default:
      return state;
  }
};