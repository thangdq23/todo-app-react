import React from "react";

const priorityColorClass = (priority) => {
  switch (priority) {
    case "High":
      return "bg-error-container";
    case "Medium":
      return "bg-secondary-container";
    case "Low":
      return "bg-surface-container-highest";
    default:
      return "bg-slate-400";
  }
};

const CalendarDayCell = ({ day, tasks = [], onClick }) => {
  const today = new Date();
  const isToday = day.date.toDateString() === today.toDateString();
  const isCurrentMonth = day.monthType === "current";
  const containerClasses = isCurrentMonth
    ? "bg-surface-container-lowest"
    : "bg-surface-container-low/30 opacity-40";

  const dateClasses = isCurrentMonth
    ? "text-sm font-semibold"
    : "text-sm font-medium text-slate-400";

  const clickableClasses = onClick ? "cursor-pointer" : "";

  const handleKeyDown = (event) => {
    if (onClick && (event.key === "Enter" || event.key === " ")) {
      onClick();
    }
  };

  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={`h-32 rounded-xl p-3 transition-all hover:ring-2 hover:ring-primary/10 ${containerClasses} ${clickableClasses} ${isToday ? "ring-2 ring-primary/60 bg-primary/5" : ""}`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className={dateClasses}>{day.dayNumber}</span>
        {tasks.length > 0 && (
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
            {tasks.length}
          </span>
        )}
      </div>

      {tasks.length > 0 && (
        <div className="mt-2 space-y-1">
          {tasks.slice(0, 2).map((task) => (
            <div key={task.id} className="flex items-center gap-1.5">
              <span
                className={`${priorityColorClass(task.priority)} w-1.5 h-1.5 rounded-full`}
              />
              <span className="text-[10px] font-medium text-slate-600 truncate">
                {task.title}
              </span>
            </div>
          ))}
          {tasks.length > 2 && (
            <div className="text-[10px] text-slate-500">
              +{tasks.length - 2} more
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarDayCell;
