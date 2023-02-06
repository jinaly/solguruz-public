import { combineReducers, createStore } from "redux";
import userReducer from "./reducers/user.reducer";

const reducer = combineReducers({
  user: userReducer,
});
const store = createStore(reducer);

export default store;
