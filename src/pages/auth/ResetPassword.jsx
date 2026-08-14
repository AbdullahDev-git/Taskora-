import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { GraduationCap, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import { auth } from "../../services/firebase";
import { isStrongPassword } from "../../utils/helpers";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const oobCode = searchParams.get("oobCode");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const [isValidCode, setIsValidCode] = useState(false);
  const [resetComplete, setResetComplete] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!oobCode) {
      setIsVerifying(false);
      return;
    }

    verifyPasswordResetCode(auth, oobCode)
      .then(() => {
        setIsValidCode(true);
        setIsVerifying(false);
      })
      .catch((err) => {
        console.error("Invalid reset code:", err);
        setIsValidCode(false);
        setIsVerifying(false);
      });
  }, [oobCode]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!newPassword) {
      newErrors.newPassword = "Password is required";
    } else if (!isStrongPassword(newPassword)) {
      newErrors.newPassword = "Password must be at least 6 characters";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsLoading(true);
      await confirmPasswordReset(auth, oobCode, newPassword);
      setResetComplete(true);
      toast.success("Password reset successful! You can now log in.");
    } catch (err) {
      console.error("Reset password error:", err);
      const code = err?.code;
      if (code === "auth/invalid-action-code") {
        toast.error("Reset link has expired or is invalid. Please request a new one.");
      } else if (code === "auth/weak-password") {
        setErrors({ newPassword: "Password is too weak." });
        toast.error("Password is too weak.");
      } else {
        toast.error(err?.message || "Failed to reset password.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!oobCode) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
        <div className="relative z-10 w-full max-w-md mx-auto">
          <div className="card p-6 sm:p-8 text-center">
            <h2 className="text-xl font-bold text-gray-900 dark:text-dark-text mb-4">Invalid Link</h2>
            <p className="text-gray-600 dark:text-dark-text2 mb-6">
              This password reset link is invalid. Please request a new one.
            </p>
            <Link to="/forgot-password" className="w-full btn-primary inline-block text-center">
              Request New Link
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
        <div className="relative z-10 w-full max-w-md mx-auto">
          <div className="card p-6 sm:p-8 text-center">
            <p className="text-gray-600 dark:text-dark-text2">Verifying reset link...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isValidCode) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
        <div className="relative z-10 w-full max-w-md mx-auto">
          <div className="card p-6 sm:p-8 text-center">
            <h2 className="text-xl font-bold text-gray-900 dark:text-dark-text mb-4">Link Expired</h2>
            <p className="text-gray-600 dark:text-dark-text2 mb-6">
              This password reset link has expired or is invalid. Please request a new one.
            </p>
            <Link to="/forgot-password" className="w-full btn-primary inline-block text-center">
              Request New Link
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (resetComplete) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
        <div className="relative z-10 w-full max-w-md mx-auto">
          <div className="card p-6 sm:p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-green-500 to-green-600">
                <GraduationCap size={36} className="text-white" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-dark-text mb-2">Password Reset!</h2>
            <p className="text-gray-600 dark:text-dark-text2 mb-6">
              Your password has been reset successfully.
            </p>
            <Link to="/login" className="w-full btn-primary inline-block text-center">
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto">
        <div className="card p-6 sm:p-8">
          <div className="flex justify-center mb-6">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600">
              <GraduationCap size={36} className="sm:size-[40px] text-white" />
            </div>
          </div>

          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-dark-text mb-2">
              Taskora
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-dark-text2">Set New Password</p>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-dark-text2">
              Enter your new password below
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    if (errors.newPassword) setErrors({ ...errors, newPassword: "" });
                  }}
                  placeholder="Min. 6 characters"
                  className="input-field pr-14 text-sm sm:text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 dark:text-dark-text2 hover:text-gray-600 dark:hover:text-dark-text"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: "" });
                  }}
                  placeholder="Repeat your password"
                  className="input-field pr-14 text-sm sm:text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-3 text-gray-400 dark:text-dark-text2 hover:text-gray-600 dark:hover:text-dark-text"
                >
                  {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary disabled:opacity-50 mt-6"
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

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
          &copy; 2026 Taskora. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
