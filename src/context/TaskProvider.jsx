import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { TaskContext } from "./taskContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("Closest Due Date");

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

  useEffect(() => {
    fetchTasks();
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

    return tasks
      .filter((task) =>
        priorityFilter === "All" ? true : task.priority === priorityFilter,
      )
      .filter((task) =>
        statusFilter === "All" ? true : task.status === statusFilter,
      )
      .sort((a, b) => {
        if (sortOrder === "Highest Priority") {
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        }

        if (sortOrder === "Alphabetical") {
          return a.title.localeCompare(b.title);
        }

        return new Date(a.dueDate) - new Date(b.dueDate);
      });
  }, [tasks, priorityFilter, statusFilter, sortOrder]);

  const value = {
    tasks,
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
    fetchTasks,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
