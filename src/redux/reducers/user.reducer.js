import { userActionTypes } from "../actions/user.action";

const initialState = {
  name: "",
  email: "",
  token: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userActionTypes.login:
      return {
        ...state,
        ...action.payload,
      };
      case userActionTypes.logout:
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
