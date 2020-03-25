import { Route, Switch } from "react-router-dom";
import React, { useContext } from "react";
import AppContext from "./AppState";
import Home from "./home/Home";
import Login from "./auth/Login";
import Logout from "./auth/Logout";
import User from "./user/User";
import UserAdd from "./user/UserAdd";
import UserEdit from "./user/UserEdit";
import Sidebar from "./sidebar/Sidebar";

const Routes: React.FC = () => {
  const { state } = useContext(AppContext);

  // Routes for the not-logged in state
  // Will take any routue and send to Login when not logged in
  const unAuthenticatedRoutes = () => {
    return (
      <Switch>
        <Route component={Login} />
      </Switch>
    );
  };

  const authenticatedRoutes = () => {
    return (
      <>
        <Sidebar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/user/add" component={UserAdd} />
          <Route exact path="/user/:id" component={UserEdit} />
          <Route exact path="/user" component={User} />
        </Switch>
      </>
    );
  };

  return state.isLoggedIn ? authenticatedRoutes() : unAuthenticatedRoutes();
};

export default Routes;
