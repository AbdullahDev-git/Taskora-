import React from "react";
import { PRIORITY_COLORS } from "../../utils/constants";

const PriorityBadge = ({ priority, size = "md" }) => {
  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1.5",
    lg: "text-base px-4 py-2",
  };

  return (
    <span className={`badge ${PRIORITY_COLORS[priority]} ${sizeClasses[size]}`}>
      {priority}
    </span>
  );
};

export default PriorityBadge;
