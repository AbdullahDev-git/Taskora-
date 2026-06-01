import React from "react";
import { Eye, Edit2, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate, getRelativeTime } from "../../utils/helpers";
import PriorityBadge from "../common/PriorityBadge";
import StatusBadge from "../common/StatusBadge";

const RecentTasksTable = ({ tasks = [], onDelete }) => {
  const recentTasks = tasks.slice(0, 5);

  return (
    <div className="card overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-dark-border">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-text">
          Recent Tasks
        </h3>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 dark:bg-dark-bg3 border-b border-gray-200 dark:border-dark-border">
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-dark-text2 uppercase">
                Task Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-dark-text2 uppercase">
                Subject
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-dark-text2 uppercase">
                Deadline
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-dark-text2 uppercase">
                Priority
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-dark-text2 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-dark-text2 uppercase">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {recentTasks.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center">
                  <p className="text-gray-500 dark:text-dark-text2">
                    No tasks yet. Create one to get started!
                  </p>
                </td>
              </tr>
            ) : (
              recentTasks.map((task) => (
                <tr
                  key={task.id}
                  className="border-b border-gray-200 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-bg3 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-dark-text">
                    {task.title}
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-dark-text2">
                    {task.subject}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-dark-text2">
                    {formatDate(task.deadline, "MMM dd, yyyy")}
                    <br />
                    <span className="text-xs text-gray-500 dark:text-dark-text2">
                      {getRelativeTime(task.deadline)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <PriorityBadge priority={task.priority} size="sm" />
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={task.status} size="sm" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/tasks/${task.id}`}
                        className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900 dark:hover:bg-opacity-20 rounded-lg transition-colors text-blue-600 dark:text-blue-400"
                        title="View"
                      >
                        <Eye size={18} />
                      </Link>

                      <Link
                        to={`/tasks/edit/${task.id}`}
                        className="p-2 hover:bg-green-100 dark:hover:bg-green-900 dark:hover:bg-opacity-20 rounded-lg transition-colors text-green-600 dark:text-green-400"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </Link>

                      <button
                        onClick={() => onDelete && onDelete(task.id)}
                        className="p-2 hover:bg-red-100 dark:hover:bg-red-900 dark:hover:bg-opacity-20 rounded-lg transition-colors text-red-600 dark:text-red-400"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentTasksTable;
