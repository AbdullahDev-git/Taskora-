import React from "react";
import { STATUS_COLORS } from "../../utils/constants";

const StatusBadge = ({ status, size = "md" }) => {
  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1.5",
    lg: "text-base px-4 py-2",
  };

  return (
    <span className={`badge ${STATUS_COLORS[status]} ${sizeClasses[size]}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
