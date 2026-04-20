import React from "react";
import { getTaskDueNotice, dueNoticeClasses } from "../../utils/dueUtils";

const priorityStyles = {
  High: "bg-error text-on-error px-2.5 py-1 rounded-full text-[10px] font-bold",
  Medium:
    "bg-secondary text-on-secondary px-2.5 py-1 rounded-full text-[10px] font-bold",
  Low: "bg-slate-600 text-white px-2.5 py-1 rounded-full text-[10px] font-bold",
};

const statusStyles = {
  "To Do":
    "bg-primary text-on-primary px-2.5 py-1 rounded-full text-[10px] font-bold",
  "In Progress":
    "bg-tertiary text-on-tertiary px-2.5 py-1 rounded-full text-[10px] font-bold",
  Done: "bg-surface-container-highest text-outline px-2.5 py-1 rounded-full text-[10px] font-bold",
};

const TaskCard = ({
  task,
  projectName,
  onOpenDetail,
  onToggleStatus,
  onDelete,
}) => {
  const dueNotice = getTaskDueNotice(task);

  return (
    <article
      key={task.id}
      onClick={() => onOpenDetail(task)}
      className={`group border border-gray-200 rounded-3xl p-6 transition-all duration-300 ${
        task.status === "Done"
          ? "bg-surface-dim opacity-90"
          : "bg-surface-container-lowest hover:shadow-2xl hover:shadow-on-surface/50"
      } flex flex-col cursor-pointer`}
    >
      {projectName && (
        <span className="mb-3 inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em]">
          {projectName}
        </span>
      )}
      <div className="mb-3 flex flex-col gap-3">
        <h3
          className={`text-2xl font-bold leading-tight ${
            task.status === "Done"
              ? "line-through text-outline"
              : "group-hover:text-primary transition-colors"
          }`}
        >
          {task.title}
        </h3>
        <div className="flex flex-wrap items-center gap-3 text-xs text-on-surface-variant">
          <span
            className={
              priorityStyles[task.priority] ||
              "bg-surface-container-highest text-outline"
            }
          >
            {task.priority.toUpperCase()}
          </span>
          <span
            className={
              statusStyles[task.status] ||
              "bg-surface-container-highest text-outline"
            }
          >
            {task.status}
          </span>
          {dueNotice && (
            <span className={dueNoticeClasses[dueNotice.variant]}>
              <span className="material-symbols-outlined text-[14px]">
                {dueNotice.icon}
              </span>
              {dueNotice.label}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3 text-on-surface-variant text-xs mb-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">
            calendar_month
          </span>
          <span>
            {new Date(task.startDate || task.dueDate).toLocaleDateString()}
          </span>
          <span>→</span>
          <span>
            {new Date(task.endDate || task.dueDate).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">schedule</span>
          <span>{task.endTime || "--"}</span>
        </div>
      </div>
      <div className="mt-auto flex flex-wrap gap-2">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onToggleStatus(task);
          }}
          className="rounded-full bg-primary/10 text-primary px-3 py-1 text-[11px] font-semibold hover:bg-primary/20 transition-colors"
        >
          Next status
        </button>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onDelete(task.id);
          }}
          className="rounded-full bg-error-container/30 text-red-500 px-3 py-1 text-[11px] font-semibold hover:bg-error-container/60 transition-colors"
        >
          Delete
        </button>
      </div>
    </article>
  );
};

export default TaskCard;
