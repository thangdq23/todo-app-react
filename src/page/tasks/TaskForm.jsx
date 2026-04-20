import React from "react";

const TaskForm = ({
  formState,
  formError,
  projectOptions,
  onChange,
  onCancel,
  onSubmit,
  saving,
}) => {
  return (
    <section className="bg-surface-container-low rounded-3xl shadow-lg p-6 space-y-6 border border-outline-variant">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-on-surface">
            Tạo công việc mới
          </p>
          <p className="text-xs text-on-surface-variant">
            Thông tin nhiệm vụ được lưu nhanh và rõ ràng.
          </p>
        </div>
        <button
          type="button"
          className="rounded-full border border-outline-variant px-4 py-2 text-sm font-semibold text-on-surface hover:bg-surface-container-highest"
          onClick={onCancel}
        >
          Hủy
        </button>
      </div>
      <form className="grid gap-4 md:grid-cols-2" onSubmit={onSubmit}>
        <div className="space-y-2 md:col-span-2">
          <label
            className="text-sm font-semibold text-on-surface-variant"
            htmlFor="title"
          >
            Tiêu đề
          </label>
          <input
            id="title"
            name="title"
            value={formState.title}
            onChange={onChange}
            className="w-full rounded-2xl border border-outline-variant bg-surface-container-high px-3 py-3 text-sm focus:ring-1 focus:ring-primary"
            placeholder="Enter task title"
          />
        </div>
        <div className="space-y-2">
          <label
            className="text-sm font-semibold text-on-surface-variant"
            htmlFor="startDate"
          >
            Ngày bắt đầu
          </label>
          <input
            id="startDate"
            name="startDate"
            type="date"
            value={formState.startDate}
            onChange={onChange}
            className="w-full rounded-2xl border border-outline-variant bg-surface-container-high px-3 py-3 text-sm focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="space-y-2">
          <label
            className="text-sm font-semibold text-on-surface-variant"
            htmlFor="endDate"
          >
            Ngày kết thúc
          </label>
          <input
            id="endDate"
            name="endDate"
            type="date"
            value={formState.endDate}
            onChange={onChange}
            className="w-full rounded-2xl border border-outline-variant bg-surface-container-high px-3 py-3 text-sm focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="space-y-2">
          <label
            className="text-sm font-semibold text-on-surface-variant"
            htmlFor="endTime"
          >
            Giờ kết thúc
          </label>
          <input
            id="endTime"
            name="endTime"
            type="time"
            value={formState.endTime}
            onChange={onChange}
            className="w-full rounded-2xl border border-outline-variant bg-surface-container-high px-3 py-3 text-sm focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="space-y-2">
          <label
            className="text-sm font-semibold text-on-surface-variant"
            htmlFor="projectID"
          >
            Project
          </label>
          <select
            id="projectID"
            name="projectID"
            value={formState.projectID}
            onChange={onChange}
            className="w-full rounded-2xl border border-outline-variant bg-surface-container-high px-3 py-3 text-sm focus:ring-1 focus:ring-primary"
          >
            {projectOptions.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label
            className="text-sm font-semibold text-on-surface-variant"
            htmlFor="priority"
          >
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={formState.priority}
            onChange={onChange}
            className="w-full rounded-2xl border border-outline-variant bg-surface-container-high px-3 py-3 text-sm focus:ring-1 focus:ring-primary"
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>
        <div className="space-y-2">
          <label
            className="text-sm font-semibold text-on-surface-variant"
            htmlFor="status"
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formState.status}
            onChange={onChange}
            className="w-full rounded-2xl border border-outline-variant bg-surface-container-high px-3 py-3 text-sm focus:ring-1 focus:ring-primary"
          >
            <option>To Do</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>
        </div>
        <div className="md:col-span-2 space-y-2">
          <label
            className="text-sm font-semibold text-on-surface-variant"
            htmlFor="description"
          >
            Mô tả
          </label>
          <textarea
            id="description"
            name="description"
            value={formState.description}
            onChange={onChange}
            className="w-full min-h-30 rounded-2xl border border-outline-variant bg-surface-container-high px-3 py-3 text-sm focus:ring-1 focus:ring-primary"
            rows="4"
            placeholder="Describe the task..."
          />
        </div>

        {formError && (
          <p className="md:col-span-2 text-sm text-error-container">
            {formError}
          </p>
        )}
        <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            className="rounded-full border border-outline-variant px-4 py-2 text-sm font-semibold hover:bg-surface-container transition-colors"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-primary text-on-primary px-6 py-3 text-sm font-semibold shadow-sm hover:bg-primary/90 transition-colors"
          >
            {saving ? "Saving..." : "Save Task"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default TaskForm;
