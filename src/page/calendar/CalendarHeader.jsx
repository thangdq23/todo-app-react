import React from "react";
import { getMonthLabel } from "./calendarUtils";

const CalendarHeader = ({ month, year, onPrevMonth, onNextMonth }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h2 className="text-3xl font-extrabold text-on-surface tracking-tight">
          {getMonthLabel(month, year)}
        </h2>
        <p className="text-sm font-medium text-on-secondary-container uppercase tracking-widest mt-1">
          Curated Schedule
        </p>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onPrevMonth}
          className="p-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-slate-600 transition-colors"
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <button
          type="button"
          onClick={onNextMonth}
          className="p-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-slate-600 transition-colors"
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;
