import React, { useMemo, useState } from "react";
import { useTasks } from "../../context/useTasks";
import { formatDateKey } from "../calendar/calendarUtils";
import TaskDetailModal from "../tasks/TaskDetailModal";
import DashboardStatCard from "./DashboardStatCard";
import DashboardTaskCard from "./DashboardTaskCard";
import ProjectProgressList from "./ProjectProgressList";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const {
    tasks = [],
    projects = [],
    loading,
    error,
    updateTask,
    deleteTask,
  } = useTasks();
  const [selectedTask, setSelectedTask] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const today = new Date();
  const todayKey = formatDateKey(today);

  const stats = useMemo(() => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(
      (task) => task.status === "Done",
    ).length;
    const inProgressTasks = tasks.filter(
      (task) => task.status === "In Progress",
    ).length;
    const currentMonthTasks = tasks.filter((task) => {
      const dateStr = task.endDate || task.dueDate;
      if (!dateStr) return false;
      const date = new Date(dateStr);
      return (
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    }).length;

    return {
      totalTasks,
      completedTasks,
      inProgressTasks,
      currentMonthTasks,
    };
  }, [tasks, today]);

  const todaysTasks = useMemo(() => {
    const dueToday = tasks.filter(
      (task) =>
        (task.endDate || task.dueDate) === todayKey && task.status !== "Done",
    );

    const activeTasks = tasks.filter((task) => task.status !== "Done");
    const chosenTasks = dueToday.length > 0 ? dueToday : activeTasks;

    return chosenTasks.map((task) => ({
      ...task,
      projectName:
        projects.find((project) => project.id === task.projectID)?.name ||
        "Chung",
    }));
  }, [tasks, todayKey, projects]);

  const weeklyActivity = useMemo(() => {
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - 6);

    return Array.from({ length: 7 }, (_, index) => {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + index);
      return {
        key: formatDateKey(day),
        label: day.toLocaleDateString("en-US", { weekday: "short" }),
        count: tasks.filter(
          (task) => (task.endDate || task.dueDate) === formatDateKey(day),
        ).length,
      };
    });
  }, [tasks, today]);

  const archiveSegments = useMemo(() => {
    const segmentProjects = [...projects];

    const unassignedTasks = tasks.filter(
      (task) => !projects.some((project) => project.id === task.projectID),
    );

    if (unassignedTasks.length > 0) {
      segmentProjects.push({ id: 0, name: "Chung" });
    }

    return segmentProjects
      .map((project) => {
        const projectTasks = tasks.filter(
          (task) =>
            task.projectID === project.id ||
            (project.id === 0 &&
              !projects.some((proj) => proj.id === task.projectID)),
        );
        const completed = projectTasks.filter(
          (task) => task.status === "Done",
        ).length;
        const progress = projectTasks.length
          ? Math.round((completed / projectTasks.length) * 100)
          : 0;

        return {
          id: project.id,
          title: project.name,
          progress,
          color:
            progress >= 80
              ? "bg-tertiary"
              : progress >= 50
                ? "bg-primary"
                : "bg-secondary",
        };
      })
      .sort((a, b) => b.progress - a.progress);
  }, [projects, tasks]);

  if (loading) {
    return (
      <div className="ml-64 min-h-screen mt-16">
        <div className="p-10 max-w-7xl mx-auto rounded-3xl bg-surface-container-lowest text-center text-on-surface-variant">
          Đang tải dashboard...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ml-64 min-h-screen mt-16">
        <div className="p-10 max-w-7xl mx-auto rounded-3xl bg-surface-container-lowest text-center text-error-container">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface font-body text-on-surface">
      <main className="ml-64 pt-28 pb-12 px-12 min-h-screen">
        <section className="mb-12">
          <span className="uppercase text-xs font-bold tracking-[0.2em] text-primary mb-2 block">
            Daily Briefing
          </span>
        </section>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <DashboardStatCard
              title="Total Tasks"
              value={stats.totalTasks}
              subtitle="Nhiệm vụ tổng"
              icon="inventory_2"
            />
            <DashboardStatCard
              title="Completed"
              value={stats.completedTasks}
              subtitle="Hoàn thành"
              icon="task_alt"
            />
            <DashboardStatCard
              title="In Progress"
              value={stats.inProgressTasks}
              subtitle="Đang thực hiện"
              icon="edit_note"
              accent
            />
          </div>

          <div className="col-span-12 lg:col-span-8">
            <div className="mb-6 flex justify-between items-end">
              <div>
                <h3 className="text-2xl font-bold font-headline">
                  Today's Tasks
                </h3>
                <p className="text-xs text-on-surface-variant">
                  Focus on the most important work for today.
                </p>
              </div>
              <Link
                to="/dashboard/task"
                className="text-xs font-bold text-primary hover:underline"
              >
                View All
              </Link>
            </div>
            <div className="space-y-3 max-h-[38rem] overflow-y-auto pr-2">
              {todaysTasks.length > 0 ? (
                todaysTasks.map((task) => (
                  <DashboardTaskCard
                    key={task.id}
                    task={task}
                    projectName={task.projectName}
                    onClick={() => {
                      setSelectedTask(task);
                      setShowDetail(true);
                    }}
                  />
                ))
              ) : (
                <div className="rounded-3xl bg-surface-container-lowest p-8 text-center text-on-surface-variant">
                  Không có nhiệm vụ nào cho hôm nay.
                </div>
              )}
            </div>
          </div>
          {showDetail && selectedTask && (
            <TaskDetailModal
              isOpen={showDetail}
              task={selectedTask}
              onClose={() => setShowDetail(false)}
              onUpdate={async (taskId, payload) => {
                const updatedTask = await updateTask(taskId, payload);
                setSelectedTask(updatedTask);
              }}
              onDelete={async (taskId) => {
                await deleteTask(taskId);
                setShowDetail(false);
              }}
            />
          )}

          <div className="col-span-12 lg:col-span-4 space-y-8">
            <div className="max-h-[38rem] overflow-y-auto pr-2">
              <ProjectProgressList segments={archiveSegments} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
