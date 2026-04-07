import React from "react";
import { NavLink } from "react-router-dom";

const NavItem = ({ to, icon, children, end = false }) => {
  return (
    <NavLink
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-l-xl transition-all duration-200 ${
          isActive
            ? "text-blue-700 font-bold border-r-4 border-blue-700 bg-slate-200/50"
            : "text-slate-500 hover:text-blue-600 hover:bg-slate-200/50"
        }`
      }
      to={to}
      end={end}
    >
      <span className="material-symbols-outlined" data-icon={icon}>
        {icon}
      </span>
      <span className="Inter uppercase text-xs tracking-wider">{children}</span>
    </NavLink>
  );
};

export default NavItem;
