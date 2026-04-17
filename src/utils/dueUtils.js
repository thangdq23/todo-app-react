export const parseDueDateTime = (task) => {
  const dueDate = task.endDate || task.dueDate;
  if (!dueDate) return null;

  const dueTime = task.endTime || "23:59";
  const dateTimeString = `${dueDate}T${dueTime}:00`;
  const dueAt = new Date(dateTimeString);

  return Number.isNaN(dueAt.getTime()) ? null : dueAt;
};

export const getTaskDueNotice = (task) => {
  if (!task || task.status === "Done") {
    return null;
  }

  const dueAt = parseDueDateTime(task);
  if (!dueAt) return null;

  const now = new Date();
  const diffMs = dueAt.getTime() - now.getTime();
  const diffHours = diffMs / 1000 / 60 / 60;

  if (diffMs < 0) {
    return {
      label: "Quá hạn",
      variant: "overdue",
      icon: "close",
    };
  }

  if (diffHours <= 6) {
    return {
      label: `Còn ${Math.max(1, Math.ceil(diffHours))} giờ`,
      variant: "urgent",
      icon: "local_fire_department",
    };
  }

  if (diffHours <= 24) {
    return {
      label: `Còn ${Math.ceil(diffHours)} giờ`,
      variant: "warning",
      icon: "warning",
    };
  }

  return {
    label: `Còn ${Math.ceil(diffHours)} giờ`,
    variant: "normal",
    icon: "check_circle",
  };
};

export const dueNoticeClasses = {
  normal:
    "inline-flex items-center gap-2 rounded-full bg-surface-container-high px-3 py-1 text-[11px] font-semibold text-on-surface-variant",
  warning:
    "inline-flex items-center gap-2 rounded-full bg-amber-100 text-amber-950 px-3 py-1 text-[11px] font-semibold",
  urgent:
    "inline-flex items-center gap-2 rounded-full bg-red-100 text-red-950 px-3 py-1 text-[11px] font-semibold",
  overdue:
    "inline-flex items-center gap-2 rounded-full bg-error text-on-error px-3 py-1 text-[11px] font-semibold",
};
