const cart = (state = [], action) => {
  switch (action.type) {
    case "UPDATE_CART":
      return action.payload.data;
    default:
      return state;
  }
};

export default cart;
