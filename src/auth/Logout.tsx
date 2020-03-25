import React, { useContext } from "react";
import AppContext from "./../AppState";
import { Redirect } from "react-router-dom";

const Logout: React.FC = () => {
  const { dispatch } = useContext(AppContext);
  dispatch({ type: "LOGOUT_SUCCESS" });
  return <Redirect to="/" />;
};

export default Logout;
