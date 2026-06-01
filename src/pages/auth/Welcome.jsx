import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap } from "lucide-react";

const Welcome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-bg to-primary-900 text-white flex items-center justify-center">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl px-6">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600">
            <GraduationCap size={48} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold mb-4">Taskora</h1>
        <p className="text-2xl text-primary-200 mb-6">
          Organize your academics. Own your time.
        </p>

        {/* Description */}
        <div className="bg-white bg-opacity-5 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-white border-opacity-10">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-primary-500 flex-shrink-0 mt-1">
                <ArrowRight size={20} />
              </div>
              <div className="text-left">
                <h3 className="font-semibold mb-1">Smart Scheduling</h3>
                <p className="text-gray-300 text-sm">
                  Automated task organization based on your syllabus deadlines
                  and study habits.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-primary-500 flex-shrink-0 mt-1">
                <ArrowRight size={20} />
              </div>
              <div className="text-left">
                <h3 className="font-semibold mb-1">Academic Insights</h3>
                <p className="text-gray-300 text-sm">
                  Visualize your progress with advanced analytics and achieve
                  your academic goals.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-primary-500 flex-shrink-0 mt-1">
                <ArrowRight size={20} />
              </div>
              <div className="text-left">
                <h3 className="font-semibold mb-1">Seamless Sync</h3>
                <p className="text-gray-300 text-sm">
                  Access your tasks across all your devices with instant cloud
                  synchronization.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            to="/login"
            className="px-8 py-3 bg-primary-600 hover:bg-primary-700 rounded-lg font-semibold transition-colors"
          >
            Log In
          </Link>

          <Link
            to="/signup"
            className="px-8 py-3 bg-white bg-opacity-10 hover:bg-opacity-20 border border-white border-opacity-20 rounded-lg font-semibold transition-colors"
          >
            Sign Up
          </Link>
        </div>

        {/* Footer */}
        <p className="text-gray-400 text-sm mt-8">
          © 2026 Taskora Academic Systems. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Welcome;
