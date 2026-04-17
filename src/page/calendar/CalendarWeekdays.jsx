import React from "react";
import { weekdays } from "./calendarUtils";

const CalendarWeekdays = () => {
  return (
    <div className="grid grid-cols-7 gap-4 mb-4">
      {weekdays.map((day) => (
        <div
          key={day}
          className="text-center py-2 text-xs font-bold text-slate-400 uppercase tracking-widest"
        >
          {day}
        </div>
      ))}
    </div>
  );
};

export default CalendarWeekdays;
