export const initialTaskState = {
  tasks: [],
  projects: [],
  loading: true,
  loadingProjects: true,
  error: null,
  priorityFilter: "All",
  statusFilter: "All",
  projectFilter: "All",
  searchTerm: "",
  sortOrder: "Creation Date",
};

export const createSetter = (setState) => (key) => (value) =>
  setState((prev) => ({
    ...prev,
    [key]: typeof value === "function" ? value(prev[key]) : value,
  }));

export const createStateUpdater = (setState) => (patch) =>
  setState((prev) => ({
    ...prev,
    ...patch,
  }));
