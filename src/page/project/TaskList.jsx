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

const TaskList = ({ projectTasks, project, onOpenTask }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {projectTasks.length > 0 ? (
        projectTasks.map((task) => {
          const dueNotice = getTaskDueNotice(task);
          return (
            <article
              key={task.id}
              onClick={() => onOpenTask(task)}
              className="group rounded-3xl border border-outline-variant bg-surface-container-lowest p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <div className="flex flex-wrap justify-between gap-3 mb-4">
                <span className="inline-flex items-center gap-2 rounded-full bg-surface-container-high px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-on-surface-variant">
                  <span className="material-symbols-outlined text-[14px]">
                    folder
                  </span>
                  {project?.name || "General"}
                </span>
                {dueNotice && (
                  <span
                    className={
                      dueNoticeClasses[dueNotice.variant] ||
                      dueNoticeClasses.normal
                    }
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      {dueNotice.icon}
                    </span>
                    {dueNotice.label}
                  </span>
                )}
              </div>

              <h2 className="text-xl font-bold text-on-surface mb-4 truncate">
                {task.title}
              </h2>

              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span
                  className={
                    statusStyles[task.status] ||
                    "bg-surface-container-highest text-outline"
                  }
                >
                  {task.status}
                </span>
                <span
                  className={
                    priorityStyles[task.priority] ||
                    "bg-surface-container-highest text-outline"
                  }
                >
                  {task.priority}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-on-surface-variant">
                <span className="inline-flex items-center gap-2 rounded-full bg-surface-container-high px-3 py-1">
                  <span className="material-symbols-outlined text-[14px]">
                    calendar_month
                  </span>
                  {task.startDate} → {task.endDate}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-surface-container-high px-3 py-1">
                  <span className="material-symbols-outlined text-[14px]">
                    schedule
                  </span>
                  {task.endTime || "--"}
                </span>
              </div>
            </article>
          );
        })
      ) : (
        <div className="col-span-full rounded-3xl bg-surface-container-high p-10 text-center text-on-surface-variant">
          Không có task thuộc project này.
        </div>
      )}
    </div>
  );
};

export default TaskList;
