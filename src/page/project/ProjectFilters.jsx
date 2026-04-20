import React from "react";

const ProjectFilters = ({
  searchTerm,
  setSearchTerm,
  priorityFilter,
  setPriorityFilter,
  statusFilter,
  setStatusFilter,
}) => {
  return (
    <div className="mb-8 grid grid-cols-12 gap-6">
      <div className="col-span-12 md:col-span-6 bg-surface-container-low rounded-3xl p-5">
        <div className="space-y-2">
          <p className="text-[10px] font-black text-outline uppercase tracking-widest">
            Search tasks
          </p>
          <input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Tìm theo tiêu đề, mô tả..."
            className="w-full rounded-2xl border border-outline-variant bg-surface-container-high px-3 py-3 text-sm focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>
      <div className="col-span-12 md:col-span-3 bg-surface-container-low rounded-3xl p-5">
        <div className="space-y-2">
          <p className="text-[10px] font-black text-outline uppercase tracking-widest">
            Filter by Priority
          </p>
          <div className="flex flex-wrap gap-2">
            {["All", "High", "Medium", "Low"].map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setPriorityFilter(level)}
                className={`px-3 py-1 rounded-full text-[11px] font-bold border ${
                  priorityFilter === level
                    ? "border-primary bg-primary text-on-primary"
                    : "border-outline-variant bg-surface-container-highest text-on-surface-variant"
                } transition-colors`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="col-span-12 md:col-span-3 bg-surface-container-low rounded-3xl p-5">
        <div className="space-y-2">
          <p className="text-[10px] font-black text-outline uppercase tracking-widest">
            Filter by Status
          </p>
          <div className="flex flex-wrap gap-2">
            {["All", "To Do", "In Progress", "Done"].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1 rounded-full text-[11px] font-bold border ${
                  statusFilter === status
                    ? "border-primary bg-primary text-on-primary"
                    : "border-outline-variant bg-surface-container-highest text-on-surface-variant"
                } transition-colors`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectFilters;
