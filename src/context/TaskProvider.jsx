import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { TaskContext } from "./taskContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [error, setError] = useState(null);
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [projectFilter, setProjectFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("Creation Date");

  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);

      const user = getCurrentUser();
      if (!user) {
        setTasks([]);
        return;
      }

      const response = await axios.get(
        `${API_URL}/tasks?userEmail=${user.email}`,
      );

      setTasks(response.data || []);
    } catch (err) {
      setError("Không thể tải danh sách công việc. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      setLoadingProjects(true);
      setError(null);

      const user = getCurrentUser();
      if (!user) {
        setProjects([]);
        return;
      }

      const response = await axios.get(
        `${API_URL}/projects?userEmail=${user.email}`,
      );
      setProjects(response.data || []);
    } catch (err) {
      setError("Không thể tải danh sách project. Vui lòng thử lại.");
    } finally {
      setLoadingProjects(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchProjects();
  }, []);

  const addTask = async (task) => {
    try {
      const user = getCurrentUser();

      const newTask = {
        ...task,
        userEmail: user.email,
      };

      const response = await axios.post(`${API_URL}/tasks`, newTask);

      setTasks((prev) => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError("Không thể tạo công việc mới. Vui lòng thử lại.");
      throw err;
    }
  };

  const updateTask = async (taskId, updates) => {
    try {
      const response = await axios.patch(`${API_URL}/tasks/${taskId}`, updates);

      setTasks((prev) =>
        prev.map((task) => (task.id === taskId ? response.data : task)),
      );

      return response.data;
    } catch (err) {
      setError("Không thể cập nhật công việc. Vui lòng thử lại.");
      throw err;
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${API_URL}/tasks/${taskId}`);

      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (err) {
      setError("Không thể xóa công việc. Vui lòng thử lại.");
      throw err;
    }
  };

  const filteredTasks = useMemo(() => {
    const priorityOrder = { High: 3, Medium: 2, Low: 1 };
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return tasks
      .filter((task) =>
        priorityFilter === "All" ? true : task.priority === priorityFilter,
      )
      .filter((task) =>
        statusFilter === "All" ? true : task.status === statusFilter,
      )
      .filter((task) =>
        projectFilter === "All"
          ? true
          : String(task.projectID) === String(projectFilter),
      )
      .filter((task) => {
        if (!normalizedSearch) return true;
        const projectName =
          projects.find((project) => project.id === task.projectID)?.name || "";
        const combined =
          `${task.title} ${task.description} ${projectName}`.toLowerCase();
        return combined.includes(normalizedSearch);
      })
      .sort((a, b) => {
        if (sortOrder === "Priority") {
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        }

        if (sortOrder === "Deadline") {
          return (
            new Date(a.endDate || a.dueDate) - new Date(b.endDate || b.dueDate)
          );
        }

        if (sortOrder === "Title") {
          return a.title.localeCompare(b.title);
        }

        if (sortOrder === "Creation Date") {
          return (a.id || 0) - (b.id || 0);
        }

        return (a.id || 0) - (b.id || 0);
      });
  }, [
    tasks,
    priorityFilter,
    statusFilter,
    projectFilter,
    searchTerm,
    sortOrder,
    projects,
  ]);

  const addProject = async (project) => {
    try {
      const user = getCurrentUser();
      const response = await axios.post(`${API_URL}/projects`, {
        ...project,
        userEmail: user?.email,
      });
      setProjects((prev) => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError("Không thể tạo project mới. Vui lòng thử lại.");
      throw err;
    }
  };

  const updateProject = async (projectId, updates) => {
    try {
      const user = getCurrentUser();
      const response = await axios.patch(`${API_URL}/projects/${projectId}`, {
        ...updates,
        userEmail: user?.email,
      });
      setProjects((prev) =>
        prev.map((project) =>
          project.id === projectId ? response.data : project,
        ),
      );
      return response.data;
    } catch (err) {
      setError("Không thể cập nhật project. Vui lòng thử lại.");
      throw err;
    }
  };

  const deleteProject = async (projectId) => {
    try {
      await axios.delete(`${API_URL}/projects/${projectId}`);
      setProjects((prev) => prev.filter((project) => project.id !== projectId));
    } catch (err) {
      setError("Không thể xóa project. Vui lòng thử lại.");
      throw err;
    }
  };

  const value = {
    tasks,
    projects,
    filteredTasks,
    loading,
    loadingProjects,
    error,
    addTask,
    addProject,
    updateProject,
    deleteProject,
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
    fetchTasks,
    fetchProjects,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
