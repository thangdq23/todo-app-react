import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../../context/useTasks";
import TaskDetailModal from "./TaskDetailModal";
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

const Tasks = () => {
  const navigate = useNavigate();
  const {
    filteredTasks,
    loading,
    error,
    addTask,
    updateTask,
    deleteTask,
    priorityFilter,
    setPriorityFilter,
    statusFilter,
    setStatusFilter,
    projectFilter,
    setProjectFilter,
    searchTerm,
    setSearchTerm,
    sortOrder,
    setSortOrder,
    projects,
  } = useTasks();

  const [showForm, setShowForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
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
  const [saving, setSaving] = useState(false);

  const openForm = () => {
    setFormError("");
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setFormState({
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      endTime: "",
      projectID: projects.length > 0 ? projects[0].id : 0,
      priority: "Medium",
      status: "To Do",
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({
      ...prev,
      [name]: name === "projectID" ? Number(value) : value,
    }));
  };

  const projectOptions = projects.length
    ? projects
    : [{ id: 0, name: "General" }];

  const handleCreateTask = async (event) => {
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
      await addTask({
        title: formState.title.trim(),
        description: formState.description.trim() || "Không có mô tả",
        startDate: formState.startDate,
        endDate: formState.endDate,
        endTime: formState.endTime,
        projectID: formState.projectID,
        priority: formState.priority,
        status: formState.status,
        dueDate: formState.endDate,
      });
      closeForm();
    } finally {
      setSaving(false);
    }
  };

  const nextStatus = (current) => {
    if (current === "To Do") return "In Progress";
    if (current === "In Progress") return "Done";
    return "To Do";
  };

  const handleToggleStatus = async (task) => {
    if (
      window.confirm(
        `Chuyển trạng thái task '${task.title}' sang ${nextStatus(task.status)}?`,
      )
    ) {
      await updateTask(task.id, { status: nextStatus(task.status) });
    }
  };

  const handleDelete = async (taskId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa task này?")) {
      await deleteTask(taskId);
      if (selectedTask?.id === taskId) {
        setSelectedTask(null);
        setShowDetail(false);
      }
    }
  };

  const handleOpenDetail = (task) => {
    setSelectedTask(task);
    setShowDetail(true);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
    setSelectedTask(null);
  };

  const getProjectName = (projectID) => {
    return projects.find((project) => project.id === projectID)?.name;
  };

  const handleUpdateTask = async (taskId, updates) => {
    const payload = {
      ...updates,
      dueDate: updates.endDate || updates.dueDate,
    };
    await updateTask(taskId, payload);
    if (selectedTask?.id === taskId) {
      setSelectedTask((prev) => (prev ? { ...prev, ...payload } : prev));
    }
  };

  const emptyMessage = useMemo(() => {
    if (loading) return "Đang tải nhiệm vụ...";
    if (error) return error;
    if (!filteredTasks.length) return "Không có nhiệm vụ phù hợp với bộ lọc.";
    return null;
  }, [loading, error, filteredTasks]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (projects.length > 0 && !formState.projectID) {
      setFormState((prev) => ({
        ...prev,
        projectID: projects[0].id,
      }));
    }
  }, [projects, formState.projectID]);

  return (
    <main className="ml-64 min-h-screen mt-16">
      <div className="px-12 py-10 max-w-7xl mt-20 space-y-8">
        <div className="mb-6 flex flex-col gap-6 md:flex-row justify-between items-start md:items-end">
          <div>
            <p className="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-2">
              Editorial Workspace
            </p>
            <h2 className="text-4xl font-extrabold tracking-tight text-on-surface">
              Active Assignments
            </h2>
          </div>
          <div className="flex items-center gap-4 p-1.5 rounded-xl">
            <button
              type="button"
              onClick={openForm}
              className="bg-blue-800 text-white py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/10 active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              <span>New Task</span>
            </button>
          </div>
        </div>

        {showForm && (
          <section className="bg-surface-container-low rounded-3xl shadow-lg p-6 space-y-6 border border-outline-variant">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold text-on-surface">
                  Tạo công việc mới
                </p>
                <p className="text-xs text-on-surface-variant">
                  Thông tin nhiệm vụ được lưu nhanh và rõ ràng.
                </p>
              </div>
              <button
                type="button"
                className="rounded-full border border-outline-variant px-4 py-2 text-sm font-semibold text-on-surface hover:bg-surface-container-highest"
                onClick={closeForm}
              >
                Hủy
              </button>
            </div>
            <form
              className="grid gap-4 md:grid-cols-2"
              onSubmit={handleCreateTask}
            >
              <div className="space-y-2 md:col-span-2">
                <label
                  className="text-sm font-semibold text-on-surface-variant"
                  htmlFor="title"
                >
                  Tiêu đề
                </label>
                <input
                  id="title"
                  name="title"
                  value={formState.title}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-outline-variant bg-surface-container-high px-3 py-3 text-sm focus:ring-1 focus:ring-primary"
                  placeholder="Enter task title"
                />
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-semibold text-on-surface-variant"
                  htmlFor="startDate"
                >
                  Ngày bắt đầu
                </label>
                <input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formState.startDate}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-outline-variant bg-surface-container-high px-3 py-3 text-sm focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-semibold text-on-surface-variant"
                  htmlFor="endDate"
                >
                  Ngày kết thúc
                </label>
                <input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formState.endDate}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-outline-variant bg-surface-container-high px-3 py-3 text-sm focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-semibold text-on-surface-variant"
                  htmlFor="endTime"
                >
                  Giờ kết thúc
                </label>
                <input
                  id="endTime"
                  name="endTime"
                  type="time"
                  value={formState.endTime}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-outline-variant bg-surface-container-high px-3 py-3 text-sm focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-semibold text-on-surface-variant"
                  htmlFor="projectID"
                >
                  Project
                </label>
                <select
                  id="projectID"
                  name="projectID"
                  value={formState.projectID}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-outline-variant bg-surface-container-high px-3 py-3 text-sm focus:ring-1 focus:ring-primary"
                >
                  {projectOptions.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-semibold text-on-surface-variant"
                  htmlFor="priority"
                >
                  Priority
                </label>
                <select
                  id="priority"
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
                <label
                  className="text-sm font-semibold text-on-surface-variant"
                  htmlFor="status"
                >
                  Status
                </label>
                <select
                  id="status"
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
              <div className="md:col-span-2 space-y-2">
                <label
                  className="text-sm font-semibold text-on-surface-variant"
                  htmlFor="description"
                >
                  Mô tả
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formState.description}
                  onChange={handleChange}
                  className="w-full min-h-30 rounded-2xl border border-outline-variant bg-surface-container-high px-3 py-3 text-sm focus:ring-1 focus:ring-primary"
                  rows="4"
                  placeholder="Describe the task..."
                />
              </div>
              {formError && (
                <p className="md:col-span-2 text-sm text-error-container">
                  {formError}
                </p>
              )}
              <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  className="rounded-full border border-outline-variant px-4 py-2 text-sm font-semibold hover:bg-surface-container transition-colors"
                  onClick={closeForm}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-full bg-primary text-on-primary px-6 py-3 text-sm font-semibold shadow-sm hover:bg-primary/90 transition-colors"
                >
                  {saving ? "Saving..." : "Save Task"}
                </button>
              </div>
            </form>
          </section>
        )}

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-8 bg-surface-container-low rounded-3xl p-5 grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <p className="text-[10px] font-black text-outline uppercase tracking-widest">
                Search tasks
              </p>
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Tìm theo tiêu đề, mô tả, project..."
                className="w-full rounded-2xl border border-outline-variant bg-surface-container-high px-3 py-3 text-sm focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <p className="text-[10px] font-black text-outline uppercase tracking-widest">
                Tag / Project
              </p>
              <select
                value={projectFilter}
                onChange={(event) => setProjectFilter(event.target.value)}
                className="w-full rounded-2xl border border-outline-variant bg-surface-container-high px-3 py-3 text-sm focus:ring-1 focus:ring-primary"
              >
                <option value="All">All</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-span-12 md:col-span-4 bg-surface-container-low rounded-3xl p-5 grid gap-4">
            <div className="space-y-2">
              <p className="text-[10px] font-black text-outline uppercase tracking-widest">
                Filter by Priority
              </p>
              <div className="flex flex-wrap gap-2">
                {["All", "High", "Medium", "Low"].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setPriorityFilter(level)}
                    className={`px-3 py-1 rounded-full text-[11px] font-bold border ${priorityFilter === level ? "border-primary bg-primary text-on-primary" : "border-outline-variant bg-surface-container-highest text-on-surface-variant"} transition-colors`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-[10px] font-black text-outline uppercase tracking-widest">
                Filter by Status
              </p>
              <div className="flex flex-wrap gap-2">
                {["All", "To Do", "In Progress", "Done"].map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1 rounded-full text-[11px] font-bold border ${statusFilter === status ? "border-primary bg-primary text-on-primary" : "border-outline-variant bg-surface-container-highest text-on-surface-variant"} transition-colors`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {emptyMessage ? (
          <div className="rounded-3xl bg-surface-container-lowest border border-outline-variant p-10 text-center text-on-surface-variant">
            {emptyMessage}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTasks.map((task) => (
              <article
                key={task.id}
                onClick={() => handleOpenDetail(task)}
                className={`group border border-gray-200 rounded-3xl p-6 transition-all duration-300 ${task.status === "Done" ? "bg-surface-dim opacity-90" : "bg-surface-container-lowest hover:shadow-2xl hover:shadow-on-surface/50"}  flex flex-col cursor-pointer`}
              >
                {getProjectName(task.projectID) && (
                  <span className="mb-3 inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em]">
                    {getProjectName(task.projectID)}
                  </span>
                )}
                <div className="mb-3 flex flex-col gap-3">
                  <h3
                    className={`text-2xl font-bold leading-tight ${task.status === "Done" ? "line-through text-outline" : "group-hover:text-primary transition-colors"}`}
                  >
                    {task.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-on-surface-variant">
                    <span
                      className={`${priorityStyles[task.priority] || "bg-surface-container-highest text-outline"}`}
                    >
                      {task.priority.toUpperCase()}
                    </span>
                    <span
                      className={`${statusStyles[task.status] || "bg-surface-container-highest text-outline"}`}
                    >
                      {task.status}
                    </span>
                    {getTaskDueNotice(task) && (
                      <span
                        className={
                          dueNoticeClasses[getTaskDueNotice(task).variant]
                        }
                      >
                        <span className="material-symbols-outlined text-[14px]">
                          {getTaskDueNotice(task).icon}
                        </span>
                        {getTaskDueNotice(task).label}
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
                      {new Date(
                        task.startDate || task.dueDate,
                      ).toLocaleDateString()}
                    </span>
                    <span>→</span>
                    <span>
                      {new Date(
                        task.endDate || task.dueDate,
                      ).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">
                      schedule
                    </span>
                    <span>{task.endTime || "--"}</span>
                  </div>
                </div>
                <div className="mt-auto flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleToggleStatus(task);
                    }}
                    className="rounded-full bg-primary/10 text-primary px-3 py-1 text-[11px] font-semibold hover:bg-primary/20 transition-colors"
                  >
                    Next status
                  </button>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDelete(task.id);
                    }}
                    className="rounded-full bg-error-container/30 text-red-500 px-3 py-1 text-[11px] font-semibold hover:bg-error-container/60 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
        {showDetail && selectedTask && (
          <TaskDetailModal
            isOpen={showDetail}
            task={selectedTask}
            onClose={handleCloseDetail}
            onUpdate={handleUpdateTask}
            onDelete={handleDelete}
          />
        )}
      </div>
    </main>
  );
};

export default Tasks;
