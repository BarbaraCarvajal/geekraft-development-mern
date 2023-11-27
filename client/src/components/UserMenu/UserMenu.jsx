import React from "react";
import { NavLink } from "react-router-dom";
import "./UserMenu.css";


const UserMenu = () => {
  return (
    <div>
      <div className="text-center">
        <div className="list-group">
          <h4>Dashboard</h4>
          <NavLink
            to="/dashboard/user/profile"
            className="list-group-item list-group-item-action purple-link"
          >
            Perfil
          </NavLink>
          <NavLink
            to="/dashboard/user/orders"
            className="list-group-item list-group-item-action purple-link"
          >
            Pedidos
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;