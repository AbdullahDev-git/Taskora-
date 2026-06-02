import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TaskProgressChart = ({ tasks = [] }) => {
  // Count tasks by type
  const typeCount = {
    Assignment: 0,
    Quiz: 0,
    Exam: 0,
    Project: 0,
  };

  tasks.forEach((task) => {
    if (typeCount.hasOwnProperty(task.type)) {
      typeCount[task.type]++;
    }
  });

  const data = [
    { name: "Assignment", value: typeCount.Assignment, fill: "#3b82f6" },
    { name: "Quiz", value: typeCount.Quiz, fill: "#8b5cf6" },
    { name: "Exam", value: typeCount.Exam, fill: "#ec4899" },
    { name: "Project", value: typeCount.Project, fill: "#f59e0b" },
  ].filter((item) => item.value > 0);

  return (
    <div className="card p-4 sm:p-6">
      {/* Header */}
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-dark-text mb-4 sm:mb-6">
        Overall Progress
      </h3>

      {/* Chart */}
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "none",
                borderRadius: "8px",
                color: "#f1f5f9",
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-64 flex items-center justify-center">
          <p className="text-gray-500 dark:text-dark-text2">
            No tasks to display
          </p>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mt-4 sm:mt-6">
        {["Assignment", "Quiz", "Exam", "Project"].map((type) => (
          <div
            key={type}
            className="text-center p-3 rounded-lg bg-gray-50 dark:bg-dark-bg3"
          >
            <p className="text-sm text-gray-600 dark:text-dark-text2 mb-1">
              {type}
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-dark-text">
              {typeCount[type]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskProgressChart;
