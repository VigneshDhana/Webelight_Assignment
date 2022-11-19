const currentUser = (state = {}, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return action.payload.data;
    case "SIGN_OUT":
      return {};
    default:
      return state;
  }
};

export default currentUser;
