export const signIN = (data) => {
  return {
    type: "SIGN_IN",
    payload: {
      data,
    },
  };
};

export const signOUT = () => {
  return {
    type: "SIGN_OUT",
  };
};

export const updateCart = (data) => {
  return {
    type: "UPDATE_CART",
    payload: {
      data,
    },
  };
};
