import React from "react";

const badgeClass = (variant) => {
  switch (variant) {
    case "primary":
      return "text-primary uppercase tracking-wider bg-primary-fixed px-2 py-0.5 rounded";
    case "tertiary":
      return "text-tertiary uppercase tracking-wider bg-tertiary-fixed px-2 py-0.5 rounded";
    case "secondary-container":
      return "text-on-secondary-container uppercase tracking-wider bg-secondary-container px-2 py-0.5 rounded";
    default:
      return "text-slate-600 uppercase tracking-wider bg-surface-container-low px-2 py-0.5 rounded";
  }
};

const DeadlineSidebar = ({ tasks = [] }) => {
  const upcomingTasks = tasks
    .filter((task) => task.status !== "Done" && (task.endDate || task.dueDate))
    .sort((a, b) => {
      // Sort by due date first (soonest deadline first)
      const dateA = a.endDate || a.dueDate;
      const dateB = b.endDate || b.dueDate;
      const dateDiff = dateA.localeCompare(dateB);
      if (dateDiff !== 0) return dateDiff;

      // Then by status
      const statusOrder = { "In Progress": 0, "To Do": 1, Done: 2 };
      const statusDiff =
        (statusOrder[a.status] || 3) - (statusOrder[b.status] || 3);
      if (statusDiff !== 0) return statusDiff;

      // Finally by priority
      const priorityOrder = { High: 0, Medium: 1, Low: 2 };
      const priorityDiff =
        (priorityOrder[a.priority] || 3) - (priorityOrder[b.priority] || 3);
      return priorityDiff;
    })
    .slice(0, 5);

  return (
    <aside className="w-80 flex flex-col gap-8">
      <div className="bg-surface-container-low rounded-2xl p-6">
        <h3 className="text-lg font-bold text-on-surface mb-6">
          Upcoming Deadlines
        </h3>
        <div className="space-y-4">
          {upcomingTasks.length > 0 ? (
            upcomingTasks.map((task) => (
              <div
                key={task.id}
                className="p-4 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10"
              >
                <div className="flex justify-between items-start mb-2 gap-3">
                  <span
                    className={badgeClass(
                      task.status === "In Progress"
                        ? "tertiary"
                        : task.priority === "High"
                          ? "primary"
                          : "secondary-container",
                    )}
                  >
                    {task.status}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {task.endDate || task.dueDate}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-on-surface mb-2">
                  {task.title}
                </h4>
              </div>
            ))
          ) : (
            <div className="rounded-3xl bg-surface-container-lowest p-6 text-sm text-on-surface-variant">
              Không có deadline nhiệm vụ nào đang chờ.
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default DeadlineSidebar;
