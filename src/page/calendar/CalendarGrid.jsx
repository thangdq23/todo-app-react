import React, { useMemo } from "react";
import { formatDateKey } from "./calendarUtils";
import CalendarDayCell from "./CalendarDayCell";

const CalendarGrid = ({ days, tasks = [], onDayClick }) => {
  const taskMap = useMemo(() => {
    return tasks.reduce((acc, task) => {
      const key = task.dueDate;
      if (!acc[key]) acc[key] = [];
      acc[key].push(task);
      return acc;
    }, {});
  }, [tasks]);

  return (
    <div className="grid grid-cols-7 gap-4">
      {days.map((day) => {
        const dateKey = formatDateKey(day.date);
        return (
          <CalendarDayCell
            key={day.id}
            day={day}
            tasks={taskMap[dateKey] || []}
            onClick={() => onDayClick(day)}
          />
        );
      })}
    </div>
  );
};

export default CalendarGrid;
