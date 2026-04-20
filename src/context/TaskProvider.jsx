import { useEffect, useMemo, useState } from "react";
import { TaskContext } from "./taskContext";
import {
  initialTaskState,
  createSetter,
  createStateUpdater,
} from "./taskState";
import {
  fetchTasksForUser,
  fetchProjectsForUser,
  createTaskForUser,
  updateTaskById,
  deleteTaskById,
  createProjectForUser,
  updateProjectById,
  deleteProjectById,
} from "./taskApi";

export const TaskProvider = ({ children }) => {
  const [state, setState] = useState(initialTaskState);

  const {
    tasks,
    projects,
    loading,
    loadingProjects,
    error,
    priorityFilter,
    statusFilter,
    projectFilter,
    searchTerm,
    sortOrder,
  } = state;

  const updateState = createStateUpdater(setState);
  const setPriorityFilter = createSetter(setState)("priorityFilter");
  const setStatusFilter = createSetter(setState)("statusFilter");
  const setProjectFilter = createSetter(setState)("projectFilter");
  const setSearchTerm = createSetter(setState)("searchTerm");
  const setSortOrder = createSetter(setState)("sortOrder");

  const fetchTasks = async () => {
    try {
      updateState({ loading: true, error: null });
      const tasksData = await fetchTasksForUser();
      updateState({ tasks: tasksData });
    } catch (err) {
      updateState({
        error: "Không thể tải danh sách công việc. Vui lòng thử lại.",
      });
    } finally {
      updateState({ loading: false });
    }
  };

  const fetchProjects = async () => {
    try {
      updateState({ loadingProjects: true, error: null });
      const projectData = await fetchProjectsForUser();
      updateState({ projects: projectData });
    } catch (err) {
      updateState({
        error: "Không thể tải danh sách project. Vui lòng thử lại.",
      });
    } finally {
      updateState({ loadingProjects: false });
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchProjects();
  }, []);

  const addTask = async (task) => {
    try {
      const response = await createTaskForUser(task);
      setState((prev) => ({ ...prev, tasks: [...prev.tasks, response] }));
      return response;
    } catch (err) {
      updateState({ error: "Không thể tạo công việc mới. Vui lòng thử lại." });
      throw err;
    }
  };

  const updateTask = async (taskId, updates) => {
    try {
      const response = await updateTaskById(taskId, updates);
      setState((prev) => ({
        ...prev,
        tasks: prev.tasks.map((task) => (task.id === taskId ? response : task)),
      }));
      return response;
    } catch (err) {
      updateState({ error: "Không thể cập nhật công việc. Vui lòng thử lại." });
      throw err;
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await deleteTaskById(taskId);
      setState((prev) => ({
        ...prev,
        tasks: prev.tasks.filter((task) => task.id !== taskId),
      }));
    } catch (err) {
      updateState({ error: "Không thể xóa công việc. Vui lòng thử lại." });
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
      const response = await createProjectForUser(project);
      setState((prev) => ({
        ...prev,
        projects: [...prev.projects, response],
      }));
      return response;
    } catch (err) {
      updateState({ error: "Không thể tạo project mới. Vui lòng thử lại." });
      throw err;
    }
  };

  const updateProject = async (projectId, updates) => {
    try {
      const response = await updateProjectById(projectId, updates);
      setState((prev) => ({
        ...prev,
        projects: prev.projects.map((project) =>
          project.id === projectId ? response : project,
        ),
      }));
      return response;
    } catch (err) {
      updateState({ error: "Không thể cập nhật project. Vui lòng thử lại." });
      throw err;
    }
  };

  const deleteProject = async (projectId) => {
    try {
      await deleteProjectById(projectId);
      setState((prev) => ({
        ...prev,
        projects: prev.projects.filter((project) => project.id !== projectId),
      }));
    } catch (err) {
      updateState({ error: "Không thể xóa project. Vui lòng thử lại." });
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
