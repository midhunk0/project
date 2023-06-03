import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="bg-light border-right" id="sidebar-wrapper">
      <div className="sidebar-heading text-center">Admin Panel</div>
      <div className="list-group list-group-flush">
        <NavLink
          exact
          to="/admin/invitations"
          className="list-group-item list-group-item-action"
          activeClassName="active"
        >
          Invitations
        </NavLink>
        <NavLink
          exact
          to="/admin/recruiters"
          className="list-group-item list-group-item-action"
          activeClassName="active"
        >
          Recruiters
        </NavLink>
        <NavLink
          exact
          to="/admin/students"
          className="list-group-item list-group-item-action"
          activeClassName="active"
        >
          Students
        </NavLink>
        <NavLink
          exact
          to="/"
          className="list-group-item list-group-item-action"
          activeClassName="active"
        >
          Log Out
        </NavLink>
      </div>
    </div>
  );
};

export default AdminMenu;
