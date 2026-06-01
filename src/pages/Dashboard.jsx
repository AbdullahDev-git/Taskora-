import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../hooks/useAuth";
import { useTasks } from "../hooks/useTasks";
import { capitalizeName } from "../utils/helpers";
import { useNotifications } from "../hooks/useNotifications";
import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import StatsRow from "../components/dashboard/StatsRow";
import RecentTasksTable from "../components/dashboard/RecentTasksTable";
import TaskProgressChart from "../components/dashboard/TaskProgressChart";
import ConfirmDialog from "../components/common/ConfirmDialog";
import toast from "react-hot-toast";

const DashboardContent = () => {
  const { userProfile } = useAuth();
  const { tasks, loading, deleteTask } = useTasks();
  const { addNotification } = useNotifications();
  const [showConfirm, setShowConfirm] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const notifiedTasks = useRef(new Set());

  // ============================================
  // Auto notification reminders
  // ============================================
  useEffect(() => {
    if (!tasks || tasks.length === 0) return;

    tasks.forEach((task) => {
      if (task.status === "Completed") return;

      const deadline = task.deadline instanceof Date ? task.deadline : new Date(task.deadline);
      const now = new Date();
      const hoursUntilDeadline = (deadline - now) / (1000 * 60 * 60);
      const isTaskOverdue = deadline < now;

      // Overdue notification
      if (isTaskOverdue) {
        const key = `${task.id}:overdue`;
        if (!notifiedTasks.current.has(key)) {
          notifiedTasks.current.add(key);
          addNotification(`"${task.title}" is overdue!`, "warning");
        }
      }

      // Deadline soon notification (within 24 hours)
      if (hoursUntilDeadline > 0 && hoursUntilDeadline <= 24) {
        const key = `${task.id}:deadline_soon`;
        if (!notifiedTasks.current.has(key)) {
          notifiedTasks.current.add(key);
          addNotification(`"${task.title}" is due soon!`, "info");
        }
      }
    });
  }, [tasks, addNotification]);

  // ============================================
  // Handle task deletion
  // ============================================
  const handleDeleteTask = (taskId) => {
    setTaskToDelete(taskId);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (taskToDelete) {
      try {
        await deleteTask(taskToDelete);
        setShowConfirm(false);
        setTaskToDelete(null);
      } catch (err) {
        console.error("Error deleting task:", err);
      }
    }
  };

  return (
    <div className="p-8 space-y-8">
      {/* Welcome Banner */}
      <WelcomeBanner userName={capitalizeName(userProfile?.name)} tasks={tasks} />

      {/* Stats Row */}
      {loading ? (
        <div className="grid grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="card p-6">
              <div className="h-4 w-20 bg-gray-200 dark:bg-dark-bg3 rounded animate-pulse mb-3" />
              <div className="h-8 w-16 bg-gray-200 dark:bg-dark-bg3 rounded animate-pulse" />
            </div>
          ))}
        </div>
      ) : (
        <StatsRow tasks={tasks} />
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-3 gap-8">
        {/* Left Column - Recent Tasks */}
        <div className="col-span-2">
          <RecentTasksTable tasks={tasks} onDelete={handleDeleteTask} />
        </div>

        {/* Right Column - Progress Chart */}
        <div>
          <TaskProgressChart tasks={tasks} />
        </div>
      </div>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={showConfirm}
        title="Delete Task?"
        message="This action cannot be undone. Are you sure you want to delete this task?"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => {
          setShowConfirm(false);
          setTaskToDelete(null);
        }}
        isDangerous
      />
    </div>
  );
};

const Dashboard = () => {
  return <DashboardContent />;
};

export default Dashboard;
