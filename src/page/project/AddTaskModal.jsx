import React from "react";
import TaskForm from "../tasks/TaskForm";

const AddTaskModal = ({
  showForm,
  formState,
  formError,
  projects,
  onChange,
  onCancel,
  onSubmit,
  saving,
}) => {
  if (!showForm) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="max-w-2xl w-full mx-4">
        <TaskForm
          formState={formState}
          formError={formError}
          projectOptions={
            projects.length ? projects : [{ id: 0, name: "General" }]
          }
          onChange={onChange}
          onCancel={onCancel}
          onSubmit={onSubmit}
          saving={saving}
        />
      </div>
    </div>
  );
};

export default AddTaskModal;
