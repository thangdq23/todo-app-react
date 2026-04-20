import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTasks } from "../../context/useTasks";
import TaskDetailModal from "../tasks/TaskDetailModal";
import ProjectHeader from "./ProjectHeader";
import ProjectFilters from "./ProjectFilters";
import TaskList from "./TaskList";
import AddTaskModal from "./AddTaskModal";
import { getTaskDueNotice, dueNoticeClasses } from "../../utils/dueUtils";

const computeProjectStatus = (tasks) => {
  if (!tasks || tasks.length === 0) return "To do";
  const statuses = new Set(tasks.map((task) => task.status));
  if (statuses.has("In Progress")) return "In Progress";
  if (statuses.size === 1 && statuses.has("Done")) return "Done";
  return "To do";
};

const ProjectDetails = () => {
  const { projectId } = useParams();
  const { tasks, projects, loading, error, updateTask, deleteTask, addTask } =
    useTasks();
  const navigate = useNavigate();
  const [showDetail, setShowDetail] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
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
    let filtered = [];
    if (id === 0) {
      filtered = tasks.filter(
        (task) => !projects.some((project) => project.id === task.projectID),
      );
    } else {
      filtered = tasks.filter((task) => task.projectID === id);
    }

    // Apply filters
    if (searchTerm) {
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }
    if (priorityFilter !== "All") {
      filtered = filtered.filter((task) => task.priority === priorityFilter);
    }
    if (statusFilter !== "All") {
      filtered = filtered.filter((task) => task.status === statusFilter);
    }

    return filtered;
  }, [tasks, projects, id, searchTerm, priorityFilter, statusFilter]);

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

  const openForm = () => {
    setFormError("");
    setFormState({
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      endTime: "",
      projectID: id,
      priority: "Medium",
      status: "To Do",
    });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({
      ...prev,
      [name]: name === "projectID" ? Number(value) : value,
    }));
  };

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
        description: formState.description.trim(),
        startDate: formState.startDate,
        endDate: formState.endDate,
        endTime: formState.endTime,
        projectID: formState.projectID,
        priority: formState.priority,
        status: formState.status,
        userID: 2, // Assuming current user
      });
      closeForm();
    } catch (error) {
      setFormError("Có lỗi xảy ra khi tạo task.");
    } finally {
      setSaving(false);
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
        <ProjectHeader
          project={project}
          projectStatus={projectStatus}
          onAddTask={openForm}
        />

        <ProjectFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        <TaskList
          projectTasks={projectTasks}
          project={project}
          onOpenTask={handleOpenTask}
        />
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
      <AddTaskModal
        showForm={showForm}
        formState={formState}
        formError={formError}
        projects={projects}
        onChange={handleChange}
        onCancel={closeForm}
        onSubmit={handleCreateTask}
        saving={saving}
      />
    </main>
  );
};

export default ProjectDetails;
