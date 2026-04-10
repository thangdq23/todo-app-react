import { useEffect, useMemo, useState } from "react";
import { useTasks } from "../../context/useTasks";

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

const Tasks = () => {
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
    sortOrder,
    setSortOrder,
  } = useTasks();

  const [showForm, setShowForm] = useState(false);
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    dueDate: "",
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
      dueDate: "",
      priority: "Medium",
      status: "To Do",
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateTask = async (event) => {
    event.preventDefault();
    if (!formState.title.trim() || !formState.dueDate) {
      setFormError("Tiêu đề và hạn chót là bắt buộc.");
      return;
    }

    try {
      setSaving(true);
      await addTask({
        ...formState,
        description: formState.description.trim() || "Không có mô tả",
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
    await updateTask(task.id, { status: nextStatus(task.status) });
  };

  const handleDelete = async (taskId) => {
    await deleteTask(taskId);
  };

  const emptyMessage = useMemo(() => {
    if (loading) return "Đang tải nhiệm vụ...";
    if (error) return error;
    if (!filteredTasks.length) return "Không có nhiệm vụ phù hợp với bộ lọc.";
    return null;
  }, [loading, error, filteredTasks]);

  // check task to user
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/");
    }
  }, []);

  return (
    <main className="flex-1 ml-64 flex flex-col">
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
          <section className="bg-surface-container-low rounded-3xl shadow-lg p-6 space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-on-surface">
                  Tạo công việc mới
                </p>
                <p className="text-xs text-on-surface-variant">
                  Lưu nhiệm vụ mới vào db.json.
                </p>
              </div>
              <button
                type="button"
                className="text-sm text-primary font-semibold hover:underline"
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
                  className="w-full rounded-lg border border-outline-variant bg-surface-container-high px-4 py-3 text-sm focus:ring-1 focus:ring-primary"
                  placeholder="Enter task title"
                />
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-semibold text-on-surface-variant"
                  htmlFor="dueDate"
                >
                  Hạn chót
                </label>
                <input
                  id="dueDate"
                  name="dueDate"
                  type="date"
                  value={formState.dueDate}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-outline-variant bg-surface-container-high px-4 py-3 text-sm focus:ring-1 focus:ring-primary"
                />
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
                  className="w-full rounded-lg border border-outline-variant bg-surface-container-high px-4 py-3 text-sm focus:ring-1 focus:ring-primary"
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
                  className="w-full rounded-lg border border-outline-variant bg-surface-container-high px-4 py-3 text-sm focus:ring-1 focus:ring-primary"
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
                  className="w-full rounded-lg border border-outline-variant bg-surface-container-high px-4 py-3 text-sm focus:ring-1 focus:ring-primary"
                  rows="4"
                  placeholder="Describe the task..."
                />
              </div>
              {formError && (
                <p className="md:col-span-2 text-sm text-error-container">
                  {formError}
                </p>
              )}
              <div className="md:col-span-2 flex flex-wrap gap-3 justify-end">
                <button
                  type="button"
                  className="rounded-full border border-outline-variant px-5 py-3 text-sm font-semibold hover:bg-surface-container transition-colors"
                  onClick={closeForm}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-full bg-primary text-on-primary px-5 py-3 text-sm font-semibold shadow-lg shadow-primary/10 hover:bg-primary/90 transition-colors"
                >
                  {saving ? "Saving..." : "Save Task"}
                </button>
              </div>
            </form>
          </section>
        )}

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-8 bg-surface-container-low rounded-xl p-6 flex flex-wrap gap-4 items-center">
            <div className="space-y-1">
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
            <div className="h-8 w-px bg-outline-variant/30" />
            <div className="space-y-1">
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
          <div className="col-span-12 md:col-span-4 bg-surface-container-low rounded-xl p-6 flex flex-col justify-center">
            <p className="text-[10px] font-black text-outline uppercase tracking-widest mb-2">
              Sort Order
            </p>
            <select
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
              className="w-full bg-surface-container-highest border-none rounded-lg text-sm font-semibold py-2 px-4 appearance-none focus:ring-1 focus:ring-primary"
            >
              <option>Closest Due Date</option>
              <option>Highest Priority</option>
              <option>Alphabetical</option>
            </select>
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
                className={`group rounded-xl p-6 transition-all duration-300 ${task.status === "Done" ? "bg-surface-dim opacity-90" : "bg-surface-container-lowest hover:shadow-2xl hover:shadow-on-surface/5"} border border-outline-variant/10 flex flex-col`}
              >
                <div className="flex justify-between items-start mb-6 gap-4">
                  <span
                    className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-tighter rounded ${priorityStyles[task.priority] || "bg-surface-container-highest text-outline"}`}
                  >
                    {task.priority.toUpperCase()}
                  </span>
                  <span
                    className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-tighter rounded ${statusStyles[task.status] || "bg-surface-container-highest text-outline"}`}
                  >
                    {task.status}
                  </span>
                </div>
                <h3
                  className={`text-xl font-bold mb-2 leading-tight ${task.status === "Done" ? "line-through text-outline" : "group-hover:text-primary transition-colors"}`}
                >
                  {task.title}
                </h3>
                <p
                  className={`text-sm mb-6 ${task.status === "Done" ? "text-outline" : "text-on-secondary-container"} line-clamp-3`}
                >
                  {task.description}
                </p>
                <div className="mt-auto pt-6 flex items-center justify-between border-t border-surface-container">
                  <div className="flex items-center gap-2 text-on-surface-variant">
                    <span className="material-symbols-outlined text-sm">
                      calendar_month
                    </span>
                    <span className="text-xs font-medium">
                      {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(task)}
                      className="rounded-full bg-primary/10 text-primary px-3 py-1 text-[11px] font-semibold hover:bg-primary/20 transition-colors"
                    >
                      Next status
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(task.id)}
                      className="rounded-full bg-error-container/10 text-error-container px-3 py-1 text-[11px] font-semibold hover:bg-error-container/20 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Tasks;
