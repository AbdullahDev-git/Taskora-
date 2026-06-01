import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Mail, ArrowLeft } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { isValidEmail } from "../../utils/helpers";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { forgotPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Invalid email format");
      return;
    }

    try {
      setIsLoading(true);
      await forgotPassword(email);
      setSent(true);
    } catch (err) {
      console.error("Forgot password error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="card p-8">
          <div className="flex justify-center mb-6">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600">
              <GraduationCap size={40} className="text-white" />
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-2">
              Taskora
            </h1>
            <p className="text-gray-600 dark:text-dark-text2">Reset Password</p>
            <p className="text-sm text-gray-500 dark:text-dark-text2">
              {sent
                ? "Check your email for the reset link"
                : "Enter your email and we'll send you a reset link"}
            </p>
          </div>

          {!sent ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-3 text-gray-400 dark:text-dark-text2"
                    size={20}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="input-field pl-10"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary disabled:opacity-50 mt-6"
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          ) : (
            <div className="text-center p-4 bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded-lg">
              <p className="text-green-700 dark:text-green-300">
                Password reset email sent! Check your inbox and follow the link to reset your password.
              </p>
            </div>
          )}

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-dark-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-dark-bg2 text-gray-500 dark:text-dark-text2">
                Or
              </span>
            </div>
          </div>

          <Link
            to="/login"
            className="flex items-center justify-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold"
          >
            <ArrowLeft size={18} />
            Back to Login
          </Link>
        </div>

        <p className="text-center text-gray-500 dark:text-dark-text2 text-xs mt-4">
          © 2026 Taskora. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
