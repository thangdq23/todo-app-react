import React from "react";
import { useNavigate } from "react-router-dom";

const ProjectHeader = ({ project, projectStatus, onAddTask }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
      <div className="space-y-3">
        <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
          {projectStatus}
        </span>
        <div>
          <p className="text-xl uppercase tracking-[0.24em] text-on-surface-variant font-bold">
            {project.name}
          </p>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-on-surface-variant">
          {project.description}
        </p>
      </div>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={onAddTask}
          className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-on-primary hover:bg-primary/90 transition-colors"
        >
          Add Task
        </button>
        <button
          type="button"
          onClick={() => navigate("/dashboard/projects")}
          className="rounded-full border border-outline-variant bg-surface-container-high px-5 py-3 text-sm font-semibold text-on-surface hover:bg-surface-container-low transition-colors"
        >
          Back to projects
        </button>
      </div>
    </div>
  );
};

export default ProjectHeader;
