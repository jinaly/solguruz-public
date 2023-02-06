export const userActionTypes = {
  login: "LOGIN",
  logout: "LOGOUT"
};
export const loginAction = (data) => ({
  type: userActionTypes.login,
  payload: data,
});
export const logoutAction = () => ({
  type: userActionTypes.logout,
});
