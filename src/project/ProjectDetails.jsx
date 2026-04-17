import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTasks } from "../context/useTasks";
import TaskDetailModal from "../page/tasks/TaskDetailModal";
import { getTaskDueNotice, dueNoticeClasses } from "../utils/dueUtils";

const computeProjectStatus = (tasks) => {
  if (!tasks || tasks.length === 0) return "To do";
  const statuses = new Set(tasks.map((task) => task.status));
  if (statuses.has("In Progress")) return "In Progress";
  if (statuses.size === 1 && statuses.has("Done")) return "Done";
  return "To do";
};

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

const ProjectDetails = () => {
  const { projectId } = useParams();
  const { tasks, projects, loading, error, updateTask, deleteTask } =
    useTasks();
  const navigate = useNavigate();
  const [showDetail, setShowDetail] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const id = Number(projectId);

  const project = useMemo(() => {
    if (id === 0) {
      return {
        id: 0,
        name: "General",
        description: "Các công việc chung chưa gắn vào project cụ thể.",
        status: "General",
      };
    }
    return projects.find((item) => item.id === id);
  }, [projects, id]);

  const projectTasks = useMemo(() => {
    if (id === 0) {
      return tasks.filter(
        (task) => !projects.some((project) => project.id === task.projectID),
      );
    }
    return tasks.filter((task) => task.projectID === id);
  }, [tasks, projects, id]);

  const projectStatus = computeProjectStatus(projectTasks);

  const handleOpenTask = (task) => {
    setSelectedTask(task);
    setShowDetail(true);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
    setSelectedTask(null);
  };

  const handleUpdateTask = async (taskId, updates) => {
    const payload = {
      ...updates,
      dueDate: updates.endDate || updates.dueDate,
    };
    await updateTask(taskId, payload);
    setSelectedTask((prev) =>
      prev && prev.id === taskId ? { ...prev, ...payload } : prev,
    );
  };

  const handleDeleteTask = async (taskId) => {
    await deleteTask(taskId);
    if (selectedTask?.id === taskId) {
      handleCloseDetail();
    }
  };

  if (loading) {
    return (
      <main className="ml-64 min-h-screen mt-16">
        <div className="p-10 max-w-7xl mx-auto rounded-3xl bg-surface-container-lowest text-center text-on-surface-variant">
          Đang tải dữ liệu...
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="ml-64 min-h-screen mt-16">
        <div className="p-10 max-w-7xl mx-auto rounded-3xl bg-surface-container-lowest text-center text-error-container">
          {error}
        </div>
      </main>
    );
  }

  if (id !== 0 && !project) {
    return (
      <main className="ml-64 min-h-screen mt-16">
        <div className="p-10 max-w-7xl mx-auto rounded-3xl bg-surface-container-lowest text-center text-on-surface-variant">
          Không tìm thấy project.
        </div>
      </main>
    );
  }

  return (
    <main className="ml-64 min-h-screen mt-16">
      <div className="p-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
          <div className="space-y-3">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              {projectStatus}
            </span>
            <div>
              <p className="text-xl uppercase tracking-[0.24em] text-on-surface-variant font-bold">
                {project.name}
              </p>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-on-surface-variant">
              {project.description}
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/dashboard/projects")}
            className="rounded-full border border-outline-variant bg-surface-container-high px-5 py-3 text-sm font-semibold text-on-surface hover:bg-surface-container-low transition-colors"
          >
            Back to projects
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projectTasks.length > 0 ? (
            projectTasks.map((task) => {
              const dueNotice = getTaskDueNotice(task);
              return (
                <article
                  key={task.id}
                  onClick={() => handleOpenTask(task)}
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
      </div>
      {showDetail && selectedTask && (
        <TaskDetailModal
          isOpen={showDetail}
          task={selectedTask}
          onClose={handleCloseDetail}
          onUpdate={handleUpdateTask}
          onDelete={handleDeleteTask}
        />
      )}
    </main>
  );
};

export default ProjectDetails;
