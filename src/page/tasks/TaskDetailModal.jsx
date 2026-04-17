import React, { useEffect, useState } from "react";
import { useTasks } from "../../context/useTasks";
import { getTaskDueNotice, dueNoticeClasses } from "../../utils/dueUtils";

const priorityStyles = {
  High: "bg-error-container text-on-error-container",
  Medium: "bg-secondary-container text-on-secondary-container",
  Low: "bg-surface-container-highest text-outline",
};

const statusStyles = {
  "To Do": "bg-primary text-on-primary",
  "In Progress": "bg-tertiary text-on-tertiary",
  Done: "bg-surface-container-highest text-outline",
};

const TaskDetailModal = ({ isOpen, task, onClose, onUpdate, onDelete }) => {
  const { projects } = useTasks();
  const [editMode, setEditMode] = useState(false);
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    endTime: "",
    projectID: 0,
    priority: "Medium",
    status: "To Do",
  });
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (task) {
      setFormState({
        title: task.title || "",
        description: task.description || "",
        startDate: task.startDate || task.dueDate || "",
        endDate: task.endDate || task.dueDate || "",
        endTime: task.endTime || "",
        projectID: task.projectID || projects[0]?.id || 0,
        priority: task.priority || "Medium",
        status: task.status || "To Do",
      });
      setFormError("");
      setEditMode(false);
    }
  }, [task, projects]);

  if (!isOpen || !task) {
    return null;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({
      ...prev,
      [name]: name === "projectID" ? Number(value) : value,
    }));
  };

  const handleSave = async (event) => {
    event.preventDefault();
    if (!formState.title.trim()) {
      setFormError("Tiêu đề không được để trống.");
      return;
    }
    if (!formState.startDate || !formState.endDate) {
      setFormError("Cần có ngày bắt đầu và ngày kết thúc.");
      return;
    }
    if (!formState.endTime) {
      setFormError("Cần có giờ kết thúc.");
      return;
    }
    if (formState.startDate > formState.endDate) {
      setFormError("Ngày kết thúc phải bằng hoặc sau ngày bắt đầu.");
      return;
    }

    await onUpdate(task.id, {
      ...formState,
      description: formState.description.trim() || "Không có mô tả",
    });
    setEditMode(false);
  };

  const currentProject = projects.find(
    (project) => project.id === task.projectID,
  );
  const dueNotice = getTaskDueNotice(task);
  const dateRangeLabel = formState.startDate
    ? formState.startDate === formState.endDate
      ? formState.startDate
      : `${formState.startDate} → ${formState.endDate}`
    : task.dueDate;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-2xl rounded-3xl bg-surface p-6 shadow-2xl shadow-black/20">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-start mb-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-on-surface">
                {task.title}
              </h2>
              <div className="flex flex-wrap items-center gap-2 text-sm text-on-surface-variant">
                {currentProject && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-surface-container-high px-3 py-1 font-semibold">
                    <span className="material-symbols-outlined text-[14px]">
                      folder
                    </span>
                    {currentProject.name}
                  </span>
                )}
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
            </div>
            <div className="flex flex-wrap gap-2">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[task.status] || "bg-surface-container-highest text-outline"}`}
              >
                {task.status}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityStyles[task.priority] || "bg-surface-container-highest text-outline"}`}
              >
                {task.priority}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap justify-start gap-3 lg:justify-end">
            <button
              type="button"
              onClick={() => setEditMode((prev) => !prev)}
              className="rounded-full border border-outline-variant px-4 py-2 text-sm font-semibold hover:bg-surface-container-highest"
            >
              {editMode ? "Cancel" : "Edit"}
            </button>
            <button
              type="button"
              onClick={() => {
                if (window.confirm("Xác nhận thay đổi trạng thái task này?")) {
                  const nextStatus =
                    task.status === "To Do"
                      ? "In Progress"
                      : task.status === "In Progress"
                        ? "Done"
                        : "To Do";
                  onUpdate(task.id, { status: nextStatus });
                }
              }}
              className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-on-primary hover:bg-primary/90"
            >
              Next status
            </button>
            <button
              type="button"
              onClick={() => {
                if (window.confirm("Bạn có chắc chắn muốn xóa task này?")) {
                  onDelete(task.id);
                  onClose();
                }
              }}
              className="rounded-full bg-error-container px-4 py-2 text-sm font-semibold text-on-error-container hover:bg-error-container/90"
            >
              Delete
            </button>
          </div>
        </div>

        {editMode ? (
          <form className="grid gap-4" onSubmit={handleSave}>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-on-surface-variant">
                  Title
                </label>
                <input
                  name="title"
                  value={formState.title}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-outline-variant bg-surface-container-high px-3 py-3 text-sm focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-on-surface-variant">
                  Project
                </label>
                <select
                  name="projectID"
                  value={formState.projectID}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-outline-variant bg-surface-container-high px-3 py-3 text-sm focus:ring-1 focus:ring-primary"
                >
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-on-surface-variant">
                  Priority
                </label>
                <select
                  name="priority"
                  value={formState.priority}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-outline-variant bg-surface-container-high px-3 py-3 text-sm focus:ring-1 focus:ring-primary"
                >
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-on-surface-variant">
                  Status
                </label>
                <select
                  name="status"
                  value={formState.status}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-outline-variant bg-surface-container-high px-3 py-3 text-sm focus:ring-1 focus:ring-primary"
                >
                  <option>To Do</option>
                  <option>In Progress</option>
                  <option>Done</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-on-surface-variant">
                  End time
                </label>
                <input
                  type="time"
                  name="endTime"
                  value={formState.endTime}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-outline-variant bg-surface-container-high px-3 py-3 text-sm focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-on-surface-variant">
                  Start date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formState.startDate}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-outline-variant bg-surface-container-high px-3 py-3 text-sm focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-on-surface-variant">
                  End date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formState.endDate}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-outline-variant bg-surface-container-high px-3 py-3 text-sm focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-on-surface-variant">
                Description
              </label>
              <textarea
                name="description"
                rows={5}
                value={formState.description}
                onChange={handleChange}
                className="w-full min-h-[10rem] rounded-2xl border border-outline-variant bg-surface-container-high px-3 py-3 text-sm focus:ring-1 focus:ring-primary"
              />
            </div>

            {formError && (
              <p className="text-sm text-error-container">{formError}</p>
            )}

            <div className="flex flex-wrap gap-3 justify-end">
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="rounded-full border border-outline-variant px-4 py-2 text-sm font-semibold hover:bg-surface-container-highest"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary hover:bg-primary/90"
              >
                Save changes
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl bg-surface-container-lowest p-4">
                <p className="text-sm text-on-surface-variant">Date range</p>
                <p className="mt-2 font-semibold text-on-surface">
                  {dateRangeLabel}
                </p>
              </div>
              <div className="rounded-3xl bg-surface-container-lowest p-4">
                <p className="text-sm text-on-surface-variant">End time</p>
                <p className="mt-2 font-semibold text-on-surface">
                  {task.endTime || "Not set"}
                </p>
              </div>
            </div>
            <div className="rounded-3xl bg-surface-container-lowest p-4 max-h-56 overflow-y-auto">
              <p className="text-sm font-semibold text-on-surface-variant">
                Description
              </p>
              <p className="mt-2 text-sm leading-6 text-on-surface">
                {task.description}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDetailModal;
