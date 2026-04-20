import React from "react";
import { getTaskDueNotice, dueNoticeClasses } from "../../utils/dueUtils";

const priorityClasses = {
  High: "bg-error-container text-on-error-container",
  Medium: "bg-secondary-container text-on-secondary-container",
  Low: "bg-surface-container-highest text-outline",
};

const statusClasses = {
  "To Do": "bg-primary-container text-on-primary-container",
  "In Progress": "bg-tertiary-container text-on-tertiary-container",
  Done: "bg-surface-container-highest text-outline",
};

const DashboardTaskCard = ({ task, projectName, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full text-left flex items-start gap-4 bg-surface-container-lowest p-5 rounded-xl border border-transparent hover:border-outline-variant/30 transition-all hover:translate-x-1"
    >
      <div className="flex-1">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h4 className="font-bold text-on-surface">{task.title}</h4>
          <span
            className={`rounded-full px-3 py-1 text-[10px] font-semibold ${statusClasses[task.status] || "bg-surface-container-highest text-outline"}`}
          >
            {task.status}
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-3 text-[11px] text-on-surface-variant">
          <span className="inline-flex items-center gap-2 rounded-full bg-surface-container-high px-3 py-1">
            <span className="material-symbols-outlined text-[14px]">
              folder
            </span>
            {projectName || "Chung"}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-surface-container-high px-3 py-1">
            <span className="material-symbols-outlined text-[14px]">
              schedule
            </span>
            {task.endTime || task.dueDate || "No time"}
          </span>
          <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold ${priorityClasses[task.priority] || "bg-surface-container-highest text-outline"}`}
          >
            {task.priority}
          </span>
        </div>
        {getTaskDueNotice(task) && (
          <div className="mt-3">
            <span
              className={
                dueNoticeClasses[getTaskDueNotice(task).variant] ||
                dueNoticeClasses.normal
              }
            >
              <span className="material-symbols-outlined text-[14px]">
                {getTaskDueNotice(task).icon}
              </span>
              {getTaskDueNotice(task).label}
            </span>
          </div>
        )}
      </div>
    </button>
  );
};

export default DashboardTaskCard;
