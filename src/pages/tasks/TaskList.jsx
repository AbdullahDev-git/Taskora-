import React, { useState } from "react";
import { Search, Plus, Eye, Edit2, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useTasks } from "../../hooks/useTasks";
import { formatDate, getRelativeTime } from "../../utils/helpers";
import PriorityBadge from "../../components/common/PriorityBadge";
import StatusBadge from "../../components/common/StatusBadge";
import ConfirmDialog from "../../components/common/ConfirmDialog";

const TaskListContent = () => {
  const { tasks, loading, deleteTask } = useTasks();
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [subjectFilter, setSubjectFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const [showConfirm, setShowConfirm] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const isOverdue = (task) => {
    if (task.status === "Completed") return false;
    const d = task.deadline instanceof Date ? task.deadline : new Date(task.deadline);
    return d < new Date(new Date().toDateString());
  };

  const isDueToday = (task) => {
    if (task.status === "Completed") return false;
    const d = task.deadline instanceof Date ? task.deadline : new Date(task.deadline);
    const today = new Date(new Date().toDateString());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return d >= today && d < tomorrow;
  };

  const isDueThisWeek = (task) => {
    if (task.status === "Completed") return false;
    const d = task.deadline instanceof Date ? task.deadline : new Date(task.deadline);
    const today = new Date(new Date().toDateString());
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    return d >= today && d < nextWeek;
  };

  const isDueThisMonth = (task) => {
    if (task.status === "Completed") return false;
    const d = task.deadline instanceof Date ? task.deadline : new Date(task.deadline);
    const today = new Date(new Date().toDateString());
    const nextMonth = new Date(today);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    return d >= today && d < nextMonth;
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesPriority =
      priorityFilter === "All" || task.priority === priorityFilter;
    const matchesStatus =
      statusFilter === "All" || task.status === statusFilter;
    const matchesSubject =
      subjectFilter === "All" || task.subject === subjectFilter;
    const matchesDate =
      dateFilter === "All" ||
      (dateFilter === "Overdue" && isOverdue(task)) ||
      (dateFilter === "Today" && isDueToday(task)) ||
      (dateFilter === "This Week" && isDueThisWeek(task)) ||
      (dateFilter === "This Month" && isDueThisMonth(task));

    return matchesSearch && matchesPriority && matchesStatus && matchesSubject && matchesDate;
  });

  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const subjects = ["All", ...new Set(tasks.map((t) => t.subject))];

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
    <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-dark-text">
            Tasks
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-dark-text2 mt-1">
            {filteredTasks.length} task{filteredTasks.length !== 1 ? "s" : ""}{" "}
            found
          </p>
        </div>

        <Link to="/tasks/add" className="btn-primary flex items-center gap-2 self-start sm:self-auto">
          <Plus size={20} />
          <span className="hidden sm:inline">New Task</span>
          <span className="sm:hidden">Add</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="card p-3 sm:p-4 space-y-3 sm:space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search tasks..."
            className="input-field pl-10 text-sm sm:text-base"
          />
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="input-field text-sm sm:text-base"
          >
            <option>All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => {
              setPriorityFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="input-field text-sm sm:text-base"
          >
            <option value="All">All Priorities</option>
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>

          <select
            value={subjectFilter}
            onChange={(e) => {
              setSubjectFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="input-field text-sm sm:text-base"
          >
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject === "All" ? "All Subjects" : subject}
              </option>
            ))}
          </select>

          <select
            value={dateFilter}
            onChange={(e) => {
              setDateFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="input-field text-sm sm:text-base"
          >
            <option value="All">All Dates</option>
            <option value="Overdue">Overdue</option>
            <option value="Today">Due Today</option>
            <option value="This Week">Due This Week</option>
            <option value="This Month">Due This Month</option>
          </select>
        </div>
      </div>

      {/* Tasks Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="bg-gray-50 dark:bg-dark-bg3 border-b border-gray-200 dark:border-dark-border">
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-dark-text2 uppercase">
                  Task Name
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-dark-text2 uppercase">
                  Type
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-dark-text2 uppercase">
                  Subject
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-dark-text2 uppercase">
                  Deadline
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-dark-text2 uppercase">
                  Priority
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-dark-text2 uppercase">
                  Status
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-dark-text2 uppercase">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 7 }).map((_, j) => (
                      <td key={j} className="px-4 sm:px-6 py-4">
                        <div className="h-4 bg-gray-200 dark:bg-dark-bg3 rounded animate-pulse w-3/4" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : paginatedTasks.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-4 sm:px-6 py-8 text-center">
                    <p className="text-gray-500 dark:text-dark-text2 text-sm sm:text-base">
                      {filteredTasks.length === 0 && tasks.length === 0
                        ? "No tasks yet. Create one to get started!"
                        : "No tasks match your filters."}
                    </p>
                  </td>
                </tr>
              ) : (
                paginatedTasks.map((task) => (
                  <tr
                    key={task.id}
                    className="border-b border-gray-200 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-bg3 transition-colors"
                  >
                    <td className="px-4 sm:px-6 py-4 font-medium text-gray-900 dark:text-dark-text text-sm sm:text-base">
                      {task.title}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-gray-600 dark:text-dark-text2 text-sm sm:text-base">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300">
                        {task.type}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-gray-600 dark:text-dark-text2 text-sm sm:text-base">
                      {task.subject}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-600 dark:text-dark-text2">
                      {formatDate(task.deadline, "MMM dd, yyyy")}
                      <br />
                      <span className="text-xs text-gray-500 dark:text-dark-text2">
                        {getRelativeTime(task.deadline)}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <PriorityBadge priority={task.priority} size="sm" />
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <StatusBadge status={task.status} size="sm" />
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Link
                          to={`/tasks/${task.id}`}
                          className="p-1.5 sm:p-2 hover:bg-blue-100 dark:hover:bg-blue-900 dark:hover:bg-opacity-20 rounded-lg transition-colors text-blue-600 dark:text-blue-400"
                          title="View"
                        >
                          <Eye size={16} className="sm:size-[18px]" />
                        </Link>

                        <Link
                          to={`/tasks/edit/${task.id}`}
                          className="p-1.5 sm:p-2 hover:bg-green-100 dark:hover:bg-green-900 dark:hover:bg-opacity-20 rounded-lg transition-colors text-green-600 dark:text-green-400"
                          title="Edit"
                        >
                          <Edit2 size={16} className="sm:size-[18px]" />
                        </Link>

                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="p-1.5 sm:p-2 hover:bg-red-100 dark:hover:bg-red-900 dark:hover:bg-opacity-20 rounded-lg transition-colors text-red-600 dark:text-red-400"
                          title="Delete"
                        >
                          <Trash2 size={16} className="sm:size-[18px]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200 dark:border-dark-border flex items-center justify-center gap-1 sm:gap-2 flex-wrap">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-gray-100 dark:bg-dark-bg3 disabled:opacity-50 hover:bg-gray-200 dark:hover:bg-dark-border transition-colors text-sm"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-colors text-sm ${currentPage === page ? "bg-primary-600 text-white" : "bg-gray-100 dark:bg-dark-bg3 hover:bg-gray-200 dark:hover:bg-dark-border"}`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className="px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-gray-100 dark:bg-dark-bg3 disabled:opacity-50 hover:bg-gray-200 dark:hover:bg-dark-border transition-colors text-sm"
            >
              Next
            </button>
          </div>
        )}
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

const TaskList = () => {
  return <TaskListContent />;
};

export default TaskList;



