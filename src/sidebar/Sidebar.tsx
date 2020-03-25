import React, { useContext } from "react";
import { Icon, Menu, Divider } from "semantic-ui-react";
import { Link } from "react-router-dom";
import AppContext from "./../AppState";
import logo from "./../assets/images/logo.svg";
import "./Sidebar.css";

const Sidebar: React.FC = () => {
  const { state } = useContext(AppContext);
  return (
    <Menu vertical stackable secondary className="side-nav">
      <div className="sidebar-header">
        <img src={logo} alt="Logo" />
      </div>

      {state.isLoggedIn && (
        <>
          <Divider />

          <Link to={{ pathname: "/" }}>
            <Menu.Item>
              <div className="sidebar-item-alignment-container">
                <span>
                  <Icon size="large" name={"home"} />
                </span>
                <span>Home</span>
              </div>
            </Menu.Item>
          </Link>

          <Divider />

          <Link to={{ pathname: "/user" }}>
            <Menu.Item>
              <div className="sidebar-item-alignment-container">
                <span>
                  <Icon size="large" name={"users"} />
                </span>
                <span>Users</span>
              </div>
            </Menu.Item>
          </Link>

          <Divider />

          <Link to={{ pathname: "/logout" }}>
            <Menu.Item>
              <div className="sidebar-item-alignment-container">
                <span>
                  <Icon size="large" name={"cog"} />
                </span>
                <span>Logout</span>
              </div>
            </Menu.Item>
          </Link>

          <Divider />
        </>
      )}
    </Menu>
  );
};
export default Sidebar;
