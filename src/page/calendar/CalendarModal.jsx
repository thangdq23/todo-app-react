import React, { useEffect, useMemo, useState } from "react";
import { useTasks } from "../../context/useTasks";
import { formatDateKey } from "./calendarUtils";

const defaultFormState = {
  title: "",
  description: "",
  startDate: "",
  endDate: "",
  endTime: "",
  priority: "Medium",
  status: "To Do",
};

const priorityOptions = ["High", "Medium", "Low"];
const statusOptions = ["To Do", "In Progress", "Done"];

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

const CalendarModal = ({
  isOpen,
  selectedDate,
  tasks = [],
  onClose,
  onAddTask,
}) => {
  const { projects } = useTasks();
  const [showForm, setShowForm] = useState(false);
  const [formState, setFormState] = useState(defaultFormState);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setShowForm(false);
      setFormState(defaultFormState);
      setFormError("");
    } else if (selectedDate) {
      const selectedDateKey = formatDateKey(selectedDate);
      setFormState((prev) => ({
        ...defaultFormState,
        startDate: selectedDateKey,
        endDate: selectedDateKey,
      }));
    }
  }, [isOpen, selectedDate]);

  const selectedDateKey = selectedDate ? formatDateKey(selectedDate) : "";
  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  const tasksForDate = useMemo(
    () => tasks.filter((task) => task.dueDate === selectedDateKey),
    [tasks, selectedDateKey],
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
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

    try {
      setSaving(true);
      setFormError("");
      await onAddTask({
        title: formState.title.trim(),
        description: formState.description.trim() || "Không có mô tả",
        startDate: formState.startDate,
        endDate: formState.endDate,
        endTime: formState.endTime,
        priority: formState.priority,
        status: formState.status,
        dueDate: formState.endDate,
      });
      setFormState(defaultFormState);
      setShowForm(false);
    } catch (error) {
      setFormError("Không thể thêm nhiệm vụ, vui lòng thử lại.");
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen || !selectedDate) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-3xl rounded-3xl bg-surface p-6 shadow-2xl shadow-black/20">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-on-secondary-container">
              Selected Day
            </p>
            <h2 className="mt-2 text-2xl font-bold text-on-surface">
              {formattedDate}
            </h2>
            <p className="text-sm text-on-surface-variant mt-1">
              {tasksForDate.length} task{tasksForDate.length === 1 ? "" : "s"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-outline-variant px-4 py-2 text-sm font-semibold hover:bg-surface-container-highest"
          >
            Close
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-[1fr_260px]">
          <div
            className={`space-y-4 ${
              tasksForDate.length >= 3 ? "max-h-140 overflow-y-auto pr-2" : ""
            }`}
          >
            {tasksForDate.length > 0 ? (
              tasksForDate.map((task) => {
                const project = projects.find(
                  (proj) => proj.id === task.projectID,
                );

                return (
                  <article
                    key={task.id}
                    className="group rounded-3xl border border-outline-variant bg-surface-container-lowest p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-on-surface/5"
                  >
                    {project && (
                      <span className="mb-3 inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em]">
                        {project.name}
                      </span>
                    )}
                    <div className="mb-3 flex flex-col gap-3">
                      <h3 className="text-xl font-bold leading-tight text-on-surface">
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
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-on-surface-variant">
                      <span className="inline-flex items-center gap-1 rounded-full bg-surface-container-high px-3 py-1">
                        <span className="material-symbols-outlined text-[14px]">
                          calendar_month
                        </span>
                        {task.startDate || task.dueDate} →{" "}
                        {task.endDate || task.dueDate}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-surface-container-high px-3 py-1">
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
              <div className="rounded-3xl border border-dashed border-outline-variant bg-surface-container-lowest p-8 text-center text-sm text-on-surface-variant">
                Không có nhiệm vụ cho ngày này.
              </div>
            )}
          </div>

          <div className="rounded-3xl bg-surface-container-low p-4 border border-outline-variant">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-on-surface">Actions</h3>
              <button
                type="button"
                onClick={() => setShowForm((prev) => !prev)}
                className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-on-primary transition-colors hover:bg-primary/90"
              >
                {showForm ? "Cancel" : "Add Task"}
              </button>
            </div>

            {showForm ? (
              <form className="grid gap-2" onSubmit={handleSubmit}>
                <div className="space-y-1">
                  <label
                    className="block text-xs font-semibold text-on-surface-variant"
                    htmlFor="task-title"
                  >
                    Task title
                  </label>
                  <input
                    id="task-title"
                    name="title"
                    value={formState.title}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-outline-variant bg-surface-container-high px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Enter title"
                  />
                </div>
                <div className="space-y-1">
                  <label
                    className="block text-xs font-semibold text-on-surface-variant"
                    htmlFor="task-desc"
                  >
                    Description
                  </label>
                  <textarea
                    id="task-desc"
                    name="description"
                    rows={4}
                    value={formState.description}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-outline-variant bg-surface-container-high px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Describe the task"
                  />
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label
                      className="block text-xs font-semibold text-on-surface-variant"
                      htmlFor="task-start-date"
                    >
                      Start date
                    </label>
                    <input
                      id="task-start-date"
                      name="startDate"
                      type="date"
                      value={formState.startDate}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-outline-variant bg-surface-container-high px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-1">
                    <label
                      className="block text-xs font-semibold text-on-surface-variant"
                      htmlFor="task-end-date"
                    >
                      End date
                    </label>
                    <input
                      id="task-end-date"
                      name="endDate"
                      type="date"
                      value={formState.endDate}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-outline-variant bg-surface-container-high px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <label
                      className="block text-xs font-semibold text-on-surface-variant"
                      htmlFor="task-end-time"
                    >
                      End time
                    </label>
                    <input
                      id="task-end-time"
                      name="endTime"
                      type="time"
                      value={formState.endTime}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-outline-variant bg-surface-container-high px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      className="block text-sm font-semibold text-on-surface-variant"
                      htmlFor="task-priority"
                    >
                      Priority
                    </label>
                    <select
                      id="task-priority"
                      name="priority"
                      value={formState.priority}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-outline-variant bg-surface-container-high px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
                    >
                      {priorityOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label
                      className="block text-sm font-semibold text-on-surface-variant"
                      htmlFor="task-status"
                    >
                      Status
                    </label>
                    <select
                      id="task-status"
                      name="status"
                      value={formState.status}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-outline-variant bg-surface-container-high px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
                    >
                      {statusOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {formError && (
                  <p className="text-sm text-error-container">{formError}</p>
                )}
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full rounded-2xl bg-primary px-3 py-2 text-sm font-semibold text-on-primary transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save Task"}
                </button>
              </form>
            ) : (
              <div className="space-y-3 text-sm text-on-surface-variant">
                <p>
                  Select a date to review tasks or add a new one for{" "}
                  {selectedDateKey}.
                </p>
                <p className="text-xs">
                  Tasks created here will appear on the calendar automatically.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarModal;
