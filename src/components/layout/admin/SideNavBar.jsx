import React from "react";
import { NavLink } from "react-router-dom";
import NavItem from "../../common/NavItem";

const SideNavBar = () => {
  return (
    <aside className="h-full w-64 fixed left-0 top-0 bg-slate-50 dark:bg-slate-900 flex flex-col py-8 pl-8 pr-4">
      <div className="mb-10">
        <h1 className="text-xl font-bold tracking-tight text-blue-700 dark:text-blue-400 font-headline">
          Velocity Flux
        </h1>
        <p className="text-[10px] Inter uppercase tracking-widest text-slate-400 mt-1">
          Kho lưu trữ
        </p>
      </div>
      <nav className="flex-1 space-y-2">
        <NavItem to="/dashboard" icon="dashboard" end>
          Dashboard
        </NavItem>
        <NavItem to="/dashboard/task" icon="checklist">
          Tasks
        </NavItem>
        <NavItem to="/dashboard/calendar" icon="calendar_today">
          Calendar
        </NavItem>
        <NavItem to="/dashboard/setting" icon="settings">
          Settings
        </NavItem>
      </nav>
      <div className="mt-auto space-y-4 pr-4">
        <button className="w-full bg-gradient-to-br from-primary to-primary-container text-white py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/10 active:scale-95 transition-transform">
          <span className="material-symbols-outlined text-sm" data-icon="add">
            add
          </span>
          <span>New Task</span>
        </button>
        <div className="pt-6 border-t border-slate-200/30 space-y-2">
          <a
            className="flex items-center gap-3 px-4 text-slate-400 hover:text-blue-600 transition-colors"
            href="#"
          >
            <span
              className="material-symbols-outlined text-sm"
              data-icon="help_outline"
            >
              help_outline
            </span>
            <span className="text-xs font-medium">Help</span>
          </a>
          <a
            className="flex items-center gap-3 px-4 text-slate-400 hover:text-blue-600 transition-colors"
            href="#"
          >
            <span
              className="material-symbols-outlined text-sm"
              data-icon="lock_open"
            >
              lock_open
            </span>
            <span className="text-xs font-medium">Privacy</span>
          </a>
        </div>
      </div>
    </aside>
  );
};

export default SideNavBar;
