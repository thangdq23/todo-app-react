import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../context/useTasks";

const computeProjectStatus = (tasks) => {
  if (!tasks || tasks.length === 0) return "To do";
  const statuses = new Set(tasks.map((task) => task.status));
  if (statuses.has("In Progress")) return "In Progress";
  if (statuses.size === 1 && statuses.has("Done")) return "Done";
  return "To do";
};

const projectStatusClasses = {
  "To do": "bg-primary/10 text-primary border border-primary/20",
  "In Progress": "bg-tertiary/10 text-tertiary border border-tertiary/20",
  Done: "bg-surface-container-high text-outline border border-surface-container-high/20",
};

const Project = () => {
  const navigate = useNavigate();
  const {
    tasks,
    projects,
    loading,
    error,
    addProject,
    updateProject,
    deleteProject,
  } = useTasks();
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  const projectGroups = useMemo(() => {
    const mappedProjects = projects.map((project) => {
      const projectTasks = tasks.filter(
        (task) => task.projectID === project.id,
      );
      return {
        ...project,
        tasks: projectTasks,
        status: computeProjectStatus(projectTasks),
      };
    });

    const unassignedTasks = tasks.filter(
      (task) => !projects.some((project) => project.id === task.projectID),
    );

    if (unassignedTasks.length > 0) {
      mappedProjects.push({
        id: 0,
        name: "General",
        status: computeProjectStatus(unassignedTasks),
        description: "Các công việc chung chưa gắn vào project cụ thể.",
        tasks: unassignedTasks,
      });
    }

    return mappedProjects;
  }, [tasks, projects]);

  const [menuProjectId, setMenuProjectId] = useState(null);

  const openCreateModal = () => {
    setEditingProject(null);
    setFormError("");
    setNewProjectName("");
    setNewProjectDescription("");
    setShowModal(true);
  };

  const closeCreateModal = () => {
    setShowModal(false);
    setEditingProject(null);
    setFormError("");
  };

  const closeProjectMenu = () => {
    setMenuProjectId(null);
  };

  const handleCreateProject = async (event) => {
    event.preventDefault();
    if (!newProjectName.trim()) {
      setFormError("Tên project không được để trống.");
      return;
    }

    try {
      setSaving(true);
      if (editingProject) {
        await updateProject(editingProject.id, {
          name: newProjectName.trim(),
          description: newProjectDescription.trim(),
        });
      } else {
        await addProject({
          name: newProjectName.trim(),
          description: newProjectDescription.trim(),
          status: "To do",
        });
      }
      closeCreateModal();
    } catch {
      setFormError(
        editingProject
          ? "Không thể cập nhật project."
          : "Không thể tạo project.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setNewProjectName(project.name);
    setNewProjectDescription(project.description || "");
    setFormError("");
    setShowModal(true);
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa project này?")) {
      return;
    }

    await deleteProject(projectId);
  };

  const goToProject = (projectId) => {
    navigate(`/dashboard/projects/${projectId}`);
  };

  return (
    <main className="ml-64 min-h-screen mt-16">
      <div className="p-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div className="space-y-1">
            <h2 className="text-4xl font-extrabold text-on-surface font-headline tracking-tight">
              Projects
            </h2>
            <p className="text-sm text-on-surface-variant">
              Tasks are grouped by project so you can review work by team or
              initiative.
            </p>
          </div>
          <button
            type="button"
            onClick={openCreateModal}
            className="kinetic-gradient text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined" data-icon="add">
              add
            </span>
            <span>Create New Project</span>
          </button>
        </div>

        {loading ? (
          <div className="rounded-3xl bg-surface-container-lowest p-10 text-center text-on-surface-variant">
            Đang tải dự án...
          </div>
        ) : error ? (
          <div className="rounded-3xl bg-surface-container-lowest p-10 text-center text-error-container">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {projectGroups.map((project) => (
              <div
                key={project.id}
                className="relative bg-surface-container-lowest p-6 rounded-3xl group hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col h-full border border-gray-200"
              >
                {project.id !== 0 && (
                  <div className="absolute right-4 top-4 z-10">
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        setMenuProjectId((prev) =>
                          prev === project.id ? null : project.id,
                        );
                      }}
                      className="rounded-full p-2 text-on-surface-variant hover:bg-surface-container-high"
                    >
                      <span className="material-symbols-outlined text-base">
                        more_vert
                      </span>
                    </button>
                    {menuProjectId === project.id && (
                      <div className="absolute right-0 top-full mt-2 w-40 rounded-3xl border border-outline-variant bg-surface p-2 shadow-xl">
                        <button
                          type="button"
                          onClick={() => {
                            handleEditProject(project);
                            closeProjectMenu();
                          }}
                          className="w-full rounded-2xl px-3 py-2 text-left text-sm font-semibold text-on-surface hover:bg-surface-container-high transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            handleDeleteProject(project.id);
                            closeProjectMenu();
                          }}
                          className="w-full rounded-2xl px-3 py-2 text-left text-sm font-semibold text-red-400 hover:bg-error-container/50 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                )}
                <div className="mb-6">
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] ${projectStatusClasses[project.status] || "bg-primary/10 text-primary"}`}
                  >
                    {project.status}
                  </span>
                  <h3 className="text-2xl font-extrabold text-on-surface mt-4 mb-3">
                    {project.name}
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                  <span className="inline-flex items-center rounded-full bg-surface-container-high px-3 py-1 text-[11px] font-semibold uppercase text-on-surface-variant">
                    {project.tasks?.length ?? 0} task
                    {(project.tasks?.length ?? 0) === 1 ? "" : "s"}
                  </span>
                  <button
                    type="button"
                    onClick={() => goToProject(project.id)}
                    className="text-xs p-2 hover:bg-blue-200 rounded-xl font-semibold text-primary/90 hover:text-primary transition-colors"
                  >
                    View details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeCreateModal();
            }
          }}
        >
          <div className="w-full max-w-2xl rounded-3xl bg-surface p-6 shadow-2xl shadow-black/20">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-primary font-semibold mb-2">
                  {editingProject ? "Edit project" : "New project"}
                </p>
                <h3 className="text-3xl font-extrabold text-on-surface">
                  {editingProject ? "Update project" : "Create a project"}
                </h3>
              </div>
              <button
                type="button"
                onClick={closeCreateModal}
                className="rounded-full border border-outline-variant px-3 py-2 text-sm text-on-surface-variant hover:bg-surface-container-high"
              >
                Close
              </button>
            </div>
            <form className="grid gap-4" onSubmit={handleCreateProject}>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-on-surface-variant">
                  Project name
                </label>
                <input
                  type="text"
                  value={newProjectName}
                  onChange={(event) => setNewProjectName(event.target.value)}
                  className="w-full rounded-2xl border border-outline-variant bg-surface-container-high px-4 py-3 text-sm focus:ring-1 focus:ring-primary"
                  placeholder="Enter project name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-on-surface-variant">
                  Description
                </label>
                <textarea
                  value={newProjectDescription}
                  onChange={(event) =>
                    setNewProjectDescription(event.target.value)
                  }
                  rows={4}
                  className="w-full rounded-2xl border border-outline-variant bg-surface-container-high px-4 py-3 text-sm focus:ring-1 focus:ring-primary"
                  placeholder="Add a short description (optional)"
                />
              </div>
              {formError && (
                <p className="text-sm text-error-container">{formError}</p>
              )}
              <div className="flex flex-wrap justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeCreateModal}
                  className="rounded-full border border-outline-variant px-5 py-3 text-sm font-semibold hover:bg-surface-container-high"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-on-primary shadow-sm hover:bg-primary/90 transition-colors"
                >
                  {saving ? "Saving..." : "Create project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Project;
