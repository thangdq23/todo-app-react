import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../../context/useTasks";
import TaskDetailModal from "./TaskDetailModal";
import TaskForm from "./TaskForm";
import TaskFilters from "./TaskFilters";
import TaskCard from "./TaskCard";

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
          <TaskForm
            formState={formState}
            formError={formError}
            projectOptions={projectOptions}
            onChange={handleChange}
            onCancel={closeForm}
            onSubmit={handleCreateTask}
            saving={saving}
          />
        )}

        <TaskFilters
          searchTerm={searchTerm}
          projectFilter={projectFilter}
          priorityFilter={priorityFilter}
          statusFilter={statusFilter}
          projects={projectOptions}
          setSearchTerm={setSearchTerm}
          setProjectFilter={setProjectFilter}
          setPriorityFilter={setPriorityFilter}
          setStatusFilter={setStatusFilter}
        />

        {emptyMessage ? (
          <div className="rounded-3xl bg-surface-container-lowest border border-outline-variant p-10 text-center text-on-surface-variant">
            {emptyMessage}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                projectName={getProjectName(task.projectID)}
                onOpenDetail={handleOpenDetail}
                onToggleStatus={handleToggleStatus}
                onDelete={handleDelete}
              />
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
