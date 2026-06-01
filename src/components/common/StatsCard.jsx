import React from "react";

const StatsCard = ({
  icon: Icon,
  label,
  value,
  subtext,
  color = "primary",
}) => {
  const colorClasses = {
    primary: "bg-gradient-to-br from-primary-500 to-primary-600",
    blue: "bg-gradient-to-br from-blue-500 to-blue-600",
    green: "bg-gradient-to-br from-green-500 to-green-600",
    yellow: "bg-gradient-to-br from-yellow-500 to-yellow-600",
    red: "bg-gradient-to-br from-red-500 to-red-600",
  };

  return (
    <div className="card p-6 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon size={24} className="text-white" />
        </div>
        {subtext && (
          <span className="text-xs text-gray-500 dark:text-dark-text2">
            {subtext}
          </span>
        )}
      </div>

      {/* Content */}
      <p className="text-gray-600 dark:text-dark-text2 text-sm font-medium mb-1">
        {label}
      </p>
      <p className="text-2xl font-bold text-gray-900 dark:text-dark-text">
        {value}
      </p>
    </div>
  );
};

export default StatsCard;
