export default (state = null, action) => {
  switch (action.type) {
    case "FETCH_DAILY":
      return action.payload;
    default:
      return state;
  }
};