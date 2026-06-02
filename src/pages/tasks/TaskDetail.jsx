import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Edit2, Trash2, CheckCircle2 } from "lucide-react";
import { useTasks } from "../../hooks/useTasks";
import { formatDate, getRelativeTime } from "../../utils/helpers";
import PriorityBadge from "../../components/common/PriorityBadge";
import StatusBadge from "../../components/common/StatusBadge";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import toast from "react-hot-toast";

const TaskDetailContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTaskById, deleteTask, toggleTaskStatus } = useTasks();
  const [showConfirm, setShowConfirm] = useState(false);

  const task = getTaskById(id);

  if (!task) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <button
          onClick={() => navigate("/tasks")}
          className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium mb-4"
        >
          <ArrowLeft size={20} />
          Back to Tasks
        </button>

        <div className="card p-6 sm:p-8 text-center">
          <p className="text-gray-500 dark:text-dark-text2">Task not found</p>
        </div>
      </div>
    );
  }

  // ============================================
  // Handle delete
  // ============================================
  const handleDelete = async () => {
    try {
      await deleteTask(id);
      navigate("/tasks");
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // ============================================
  // Handle toggle status
  // ============================================
  const handleToggleStatus = async () => {
    try {
      await toggleTaskStatus(id, task.status);
      toast.success(
        `Task marked as ${task.status === "Completed" ? "Pending" : "Completed"}`,
      );
    } catch (err) {
      console.error("Error toggling task status:", err);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <button
        onClick={() => navigate("/tasks")}
        className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium mb-4 sm:mb-6"
      >
        <ArrowLeft size={20} />
        Back to Tasks
      </button>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {/* Left Content */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Card 1: Title and Description */}
          <div className="card p-4 sm:p-6 lg:p-8">
            {/* Title */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-dark-text mb-2">
                  {task.title}
                </h1>
                <div className="flex flex-wrap items-center gap-3">
                  <PriorityBadge priority={task.priority} />
                  <span className="text-xs sm:text-sm text-gray-600 dark:text-dark-text2">
                    Created {formatDate(task.createdAt, "MMM dd, yyyy")}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 self-start">
                <button
                  onClick={() => navigate(`/tasks/edit/${id}`)}
                  className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900 dark:hover:bg-opacity-20 rounded-lg transition-colors text-blue-600 dark:text-blue-400"
                  title="Edit"
                >
                  <Edit2 size={20} />
                </button>

                <button
                  onClick={() => setShowConfirm(true)}
                  className="p-2 hover:bg-red-100 dark:hover:bg-red-900 dark:hover:bg-opacity-20 rounded-lg transition-colors text-red-600 dark:text-red-400"
                  title="Delete"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="py-4 sm:py-6 border-t border-gray-200 dark:border-dark-border">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-dark-text mb-3">
                Description
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-dark-text2 whitespace-pre-wrap">
                {task.description || "No description added"}
              </p>
            </div>
          </div>

          {/* Card 2: Activity Timeline */}
          <div className="card p-4 sm:p-6 lg:p-8">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-dark-text mb-4">
              Recent Activity
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary-500" />
                <p className="text-sm text-gray-600 dark:text-dark-text2">
                  Task created on {formatDate(task.createdAt, "PPP p")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* Status Card */}
          <div className="card p-4 sm:p-6">
            <h3 className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-dark-text2 uppercase mb-3">
              Status
            </h3>
            <StatusBadge status={task.status} size="lg" />

            <button
              onClick={handleToggleStatus}
              className="w-full mt-4 btn-primary flex items-center justify-center gap-2"
            >
              <CheckCircle2 size={18} />
              Mark as {task.status === "Completed" ? "Pending" : "Completed"}
            </button>
          </div>

          {/* Details Card */}
          <div className="card p-4 sm:p-6 space-y-3 sm:space-y-4">
            {/* Type */}
            <div>
              <h4 className="text-xs font-semibold text-gray-700 dark:text-dark-text2 uppercase mb-2">
                Type
              </h4>
              <p className="text-sm sm:text-base text-gray-900 dark:text-dark-text">{task.type}</p>
            </div>

            {/* Subject */}
            <div className="pt-3 sm:pt-4 border-t border-gray-200 dark:border-dark-border">
              <h4 className="text-xs font-semibold text-gray-700 dark:text-dark-text2 uppercase mb-2">
                Subject
              </h4>
              <p className="text-sm sm:text-base text-gray-900 dark:text-dark-text">
                {task.subject}
              </p>
            </div>

            {/* Deadline */}
            <div className="pt-3 sm:pt-4 border-t border-gray-200 dark:border-dark-border">
              <h4 className="text-xs font-semibold text-gray-700 dark:text-dark-text2 uppercase mb-2">
                Deadline
              </h4>
              <p className="text-sm sm:text-base text-gray-900 dark:text-dark-text font-semibold">
                {formatDate(task.deadline, "MMM dd, yyyy")}
              </p>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-dark-text2">
                {getRelativeTime(task.deadline)}
              </p>
            </div>

            {/* Priority */}
            <div className="pt-3 sm:pt-4 border-t border-gray-200 dark:border-dark-border">
              <h4 className="text-xs font-semibold text-gray-700 dark:text-dark-text2 uppercase mb-2">
                Priority
              </h4>
              <PriorityBadge priority={task.priority} />
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={showConfirm}
        title="Delete Task?"
        message="This action cannot be undone. Are you sure you want to delete this task?"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={() => setShowConfirm(false)}
        isDangerous
      />
    </div>
  );
};

const TaskDetail = () => {
  return <TaskDetailContent />;
};

export default TaskDetail;
