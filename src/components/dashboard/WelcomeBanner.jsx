import React, { useMemo } from "react";
import { formatDate } from "../../utils/helpers";
import { MOTIVATIONAL_QUOTES } from "../../utils/constants";

const WelcomeBanner = ({ userName, tasks = [] }) => {
  const today = new Date();

  const quote = useMemo(() => {
    const dateStr = today.toISOString().split("T")[0];
    const dayOfYear = Math.floor(
      (today - new Date(today.getFullYear(), 0, 0)) / 86400000,
    );
    const idx = (dayOfYear + userName?.length || 0) % MOTIVATIONAL_QUOTES.length;
    return MOTIVATIONAL_QUOTES[idx];
  }, [today, userName]);

  // Calculate completion percentage
  const completedTasks = tasks.filter((t) => t.status === "Completed").length;
  const completionRate =
    tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  return (
    <div className="card p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-primary-600 to-primary-800 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 400 200">
          <path
            d="M0,100 Q100,50 200,100 T400,100"
            stroke="white"
            fill="none"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-2 sm:gap-0">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1">
              Welcome back, {userName || "Student"}! 👋
            </h1>
            <p className="text-sm sm:text-base text-primary-100">
              {formatDate(today, "EEEE, MMMM dd, yyyy")}
            </p>
          </div>

          {/* Completion Rate */}
          <div className="text-left sm:text-right">
            <p className="text-3xl sm:text-4xl font-bold">{completionRate}%</p>
            <p className="text-xs sm:text-sm text-primary-100">Efficiency</p>
          </div>
        </div>

        {/* Motivational Quote */}
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-white bg-opacity-10 rounded-lg backdrop-blur-sm border border-white border-opacity-20">
          <p className="text-xs sm:text-sm italic">💡 {quote}</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
