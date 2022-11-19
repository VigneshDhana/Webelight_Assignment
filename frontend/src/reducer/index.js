import currentUser from "./currentUser";
import cart from "./cart";
import { combineReducers } from "redux";

const reducers = combineReducers({
  isLogged: currentUser,
  items: cart,
});

export default reducers;
