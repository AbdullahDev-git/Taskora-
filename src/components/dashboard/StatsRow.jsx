import React from "react";
import { CheckCircle2, Clock, AlertCircle, Calendar } from "lucide-react";
import StatsCard from "../common/StatsCard";
import { getTaskStats } from "../../utils/helpers";

const StatsRow = ({ tasks = [] }) => {
  const stats = getTaskStats(tasks);

  return (
    <div className="grid grid-cols-4 gap-6">
      <StatsCard
        icon={CheckCircle2}
        label="Total Tasks"
        value={stats.total}
        subtext="All enrolled subjects"
        color="primary"
      />

      <StatsCard
        icon={Clock}
        label="Pending"
        value={stats.pending}
        subtext={`${stats.pending} due soon`}
        color="yellow"
      />

      <StatsCard
        icon={CheckCircle2}
        label="Completed"
        value={stats.completed}
        subtext={`${Math.round((stats.completed / stats.total) * 100) || 0}% success rate`}
        color="green"
      />

      <StatsCard
        icon={Calendar}
        label="Upcoming"
        value={stats.upcoming}
        subtext="Next 7 days"
        color="blue"
      />
    </div>
  );
};

export default StatsRow;
