import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const getCurrentUser = () => JSON.parse(localStorage.getItem("user"));

export const fetchTasksForUser = async () => {
  const user = getCurrentUser();
  if (!user) return [];

  const response = await axios.get(`${API_URL}/tasks?userEmail=${user.email}`);
  return response.data || [];
};

export const fetchProjectsForUser = async () => {
  const user = getCurrentUser();
  if (!user) return [];

  const response = await axios.get(
    `${API_URL}/projects?userEmail=${user.email}`,
  );
  return response.data || [];
};

export const createTaskForUser = async (task) => {
  const user = getCurrentUser();
  const newTask = {
    ...task,
    userEmail: user?.email,
  };
  const response = await axios.post(`${API_URL}/tasks`, newTask);
  return response.data;
};

export const updateTaskById = async (taskId, updates) => {
  const response = await axios.patch(`${API_URL}/tasks/${taskId}`, updates);
  return response.data;
};

export const deleteTaskById = async (taskId) => {
  await axios.delete(`${API_URL}/tasks/${taskId}`);
};

export const createProjectForUser = async (project) => {
  const user = getCurrentUser();
  const response = await axios.post(`${API_URL}/projects`, {
    ...project,
    userEmail: user?.email,
  });
  return response.data;
};

export const updateProjectById = async (projectId, updates) => {
  const user = getCurrentUser();
  const response = await axios.patch(`${API_URL}/projects/${projectId}`, {
    ...updates,
    userEmail: user?.email,
  });
  return response.data;
};

export const deleteProjectById = async (projectId) => {
  await axios.delete(`${API_URL}/projects/${projectId}`);
};
