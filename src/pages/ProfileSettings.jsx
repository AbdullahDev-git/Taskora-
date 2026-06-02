import React, { useState, useEffect } from "react";
import { Settings, Save, Shield, Bell, AlertCircle } from "lucide-react";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider, deleteUser, verifyBeforeUpdateEmail } from "firebase/auth";
import { doc, deleteDoc, collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../services/firebase";
import { useAuth } from "../hooks/useAuth";
import { useTasks } from "../hooks/useTasks";
import { getInitials, capitalizeName } from "../utils/helpers";
import ConfirmDialog from "../components/common/ConfirmDialog";
import toast from "react-hot-toast";

const ProfileSettings = () => {
  const { user, userProfile, updateProfile, logout } = useAuth();
  const { tasks } = useTasks();
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
  });

  const [notifications, setNotifications] = useState({
    deadlineReminders: true,
    dailySummary: true,
    overdueAlerts: true,
  });

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (userProfile) {
      const [firstName, ...lastNameParts] = (userProfile.name || "").split(" ");
      setPersonalInfo({
        firstName: firstName || "",
        lastName: lastNameParts.join(" ") || "",
        email: userProfile.email || "",
        bio: userProfile.bio || "",
      });

      if (userProfile.preferences?.notifications) {
        setNotifications(userProfile.preferences.notifications);
      }
    }
  }, [userProfile]);

  const handlePersonalInfoUpdate = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const fullName =
        `${personalInfo.firstName} ${personalInfo.lastName}`.trim();

      await updateProfile({
        name: fullName,
        bio: personalInfo.bio,
      });

      if (personalInfo.email !== userProfile?.email) {
        await verifyBeforeUpdateEmail(user, personalInfo.email);
        toast.success("Verification email sent to new address. Email will update once verified.");
      }

      toast.success("Personal info updated successfully!");
    } catch (err) {
      console.error("Error updating personal info:", err);
      if (err.code === "auth/requires-recent-login") {
        toast.error("Please log out and log in again before changing email");
      } else {
        toast.error(err.message || "Failed to update personal info");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotificationUpdate = async (key) => {
    try {
      const newNotifications = { ...notifications, [key]: !notifications[key] };
      setNotifications(newNotifications);

      await updateProfile({
        preferences: {
          ...userProfile?.preferences,
          notifications: newNotifications,
        },
      });

      toast.success("Notification preferences updated!");
    } catch (err) {
      console.error("Error updating notifications:", err);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (security.newPassword !== security.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (security.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }

    try {
      setIsLoading(true);

      if (!user?.email) {
        toast.error("User session not available");
        return;
      }

      const credential = EmailAuthProvider.credential(user.email, security.currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, security.newPassword);

      toast.success("Password updated successfully!");
      setSecurity({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error("Error updating password:", err);
      if (err.code === "auth/wrong-password") {
        toast.error("Current password is incorrect");
      } else if (err.code === "auth/requires-recent-login") {
        toast.error("Please log out and log in again before changing password");
      } else {
        toast.error("Failed to update password");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      if (!user) {
        toast.error("User session not available");
        return;
      }

      const userId = user.uid;

      const tasksQuery = query(collection(db, "tasks"), where("userId", "==", userId));
      const notificationsQuery = query(collection(db, "notifications"), where("userId", "==", userId));

      const [tasksSnap, notifsSnap] = await Promise.all([
        getDocs(tasksQuery),
        getDocs(notificationsQuery),
      ]);

      const deletePromises = [];
      tasksSnap.forEach((d) => deletePromises.push(deleteDoc(doc(db, "tasks", d.id))));
      notifsSnap.forEach((d) => deletePromises.push(deleteDoc(doc(db, "notifications", d.id))));
      deletePromises.push(deleteDoc(doc(db, "users", userId)));

      await Promise.all(deletePromises);
      await deleteUser(user);

      toast.success("Account deleted successfully");
      await logout();
    } catch (err) {
      console.error("Error deleting account:", err);
      if (err.code === "auth/requires-recent-login") {
        toast.error("Please log out and log in again before deleting your account");
      } else {
        toast.error("Failed to delete account");
      }
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-dark-text mb-2">
          Profile & Settings
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-dark-text2">
          Manage your account, preferences, and security settings
        </p>
      </div>

      {/* User Header Card */}
      <div className="card p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-primary-500 to-primary-600 text-white">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left">
          {/* Avatar */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white bg-opacity-20 border-2 border-white flex items-center justify-center text-2xl sm:text-3xl font-bold flex-shrink-0">
            {getInitials(userProfile?.name || "User")}
          </div>

          {/* User Info */}
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl font-bold">
              {capitalizeName(userProfile?.name) || "User"}
            </h2>
            <p className="text-sm sm:text-base text-primary-100">{userProfile?.email}</p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
              <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-xs sm:text-sm font-medium">
                Pro Member
              </span>
              <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-xs sm:text-sm font-medium">
                Active Tasks: {tasks.filter(t => t.status !== "Completed").length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="space-y-4 sm:space-y-6 lg:space-y-8">
        {/* ============================================ */}
        {/* PERSONAL INFO SECTION */}
        {/* ============================================ */}
        <div className="card p-4 sm:p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-200 dark:border-dark-border">
            <Settings size={20} className="sm:size-[24px] text-primary-600 dark:text-primary-400" />
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-dark-text">
              Personal Info
            </h3>
          </div>

          <form onSubmit={handlePersonalInfoUpdate} className="space-y-3 sm:space-y-4">
            {/* First Name and Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={personalInfo.firstName}
                  onChange={(e) =>
                    setPersonalInfo({
                      ...personalInfo,
                      firstName: e.target.value,
                    })
                  }
                  placeholder="Alex"
                  className="input-field text-sm sm:text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={personalInfo.lastName}
                  onChange={(e) =>
                    setPersonalInfo({
                      ...personalInfo,
                      lastName: e.target.value,
                    })
                  }
                  placeholder="Rivera"
                  className="input-field text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={personalInfo.email}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, email: e.target.value })
                }
                placeholder="alex.rivera@taskora.edu"
                className="input-field text-sm sm:text-base"
              />
              <p className="text-xs text-gray-500 dark:text-dark-text2 mt-1">
                A verification email will be sent to confirm the change
              </p>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                Bio
              </label>
              <textarea
                value={personalInfo.bio}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, bio: e.target.value })
                }
                placeholder="Tell us about yourself..."
                rows="3"
                className="input-field resize-none text-sm sm:text-base"
              />
            </div>

            {/* Save Button */}
            <div className="pt-3 sm:pt-4 flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary flex items-center gap-2 disabled:opacity-50 w-full sm:w-auto"
              >
                <Save size={18} />
                Save Changes
              </button>
            </div>
          </form>
        </div>

        {/* ============================================ */}
        {/* NOTIFICATION PREFERENCES SECTION */}
        {/* ============================================ */}
        <div className="card p-4 sm:p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-200 dark:border-dark-border">
            <Bell size={20} className="sm:size-[24px] text-primary-600 dark:text-primary-400" />
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-dark-text">
              Notification Preferences
            </h3>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {/* Deadline Reminders */}
            <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 dark:bg-dark-bg3 rounded-lg">
              <div className="flex-1 min-w-0 mr-3">
                <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-dark-text">
                  Deadline Reminders
                </p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-dark-text2">
                  Notify 1 hour before due date
                </p>
              </div>

              <button
                onClick={() => handleNotificationUpdate("deadlineReminders")}
                className={`relative w-12 h-7 rounded-full transition-colors flex-shrink-0 ${
                  notifications.deadlineReminders
                    ? "bg-primary-600"
                    : "bg-gray-300 dark:bg-dark-border"
                }`}
              >
                <div
                  className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                    notifications.deadlineReminders ? "right-1" : "left-1"
                  }`}
                />
              </button>
            </div>

            {/* Daily Summary */}
            <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 dark:bg-dark-bg3 rounded-lg">
              <div className="flex-1 min-w-0 mr-3">
                <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-dark-text">
                  Daily Summary
                </p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-dark-text2">
                  Morning digest of pending tasks
                </p>
              </div>

              <button
                onClick={() => handleNotificationUpdate("dailySummary")}
                className={`relative w-12 h-7 rounded-full transition-colors flex-shrink-0 ${
                  notifications.dailySummary
                    ? "bg-primary-600"
                    : "bg-gray-300 dark:bg-dark-border"
                }`}
              >
                <div
                  className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                    notifications.dailySummary ? "right-1" : "left-1"
                  }`}
                />
              </button>
            </div>

            {/* Overdue Alerts */}
            <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 dark:bg-dark-bg3 rounded-lg">
              <div className="flex-1 min-w-0 mr-3">
                <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-dark-text">
                  Overdue Alerts
                </p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-dark-text2">
                  Immediate alerts for missed deadlines
                </p>
              </div>

              <button
                onClick={() => handleNotificationUpdate("overdueAlerts")}
                className={`relative w-12 h-7 rounded-full transition-colors flex-shrink-0 ${
                  notifications.overdueAlerts
                    ? "bg-primary-600"
                    : "bg-gray-300 dark:bg-dark-border"
                }`}
              >
                <div
                  className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                    notifications.overdueAlerts ? "right-1" : "left-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* SECURITY SECTION */}
        {/* ============================================ */}
        <div className="card p-4 sm:p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-200 dark:border-dark-border">
            <Shield size={20} className="sm:size-[24px] text-primary-600 dark:text-primary-400" />
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-dark-text">
              Security
            </h3>
          </div>

          <form onSubmit={handlePasswordChange} className="space-y-3 sm:space-y-4">
            {/* Current Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                Current Password
              </label>
              <input
                type="password"
                value={security.currentPassword}
                onChange={(e) =>
                  setSecurity({ ...security, currentPassword: e.target.value })
                }
                placeholder="••••••••"
                className="input-field text-sm sm:text-base"
              />
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                New Password
              </label>
              <input
                type="password"
                value={security.newPassword}
                onChange={(e) =>
                  setSecurity({ ...security, newPassword: e.target.value })
                }
                placeholder="••••••••"
                className="input-field text-sm sm:text-base"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                value={security.confirmPassword}
                onChange={(e) =>
                  setSecurity({ ...security, confirmPassword: e.target.value })
                }
                placeholder="••••••••"
                className="input-field text-sm sm:text-base"
              />
            </div>

            {/* Update Button */}
            <div className="pt-3 sm:pt-4 flex justify-end">
              <button
                type="submit"
                disabled={isLoading || !security.currentPassword}
                className="btn-primary flex items-center gap-2 disabled:opacity-50 w-full sm:w-auto"
              >
                <Shield size={18} />
                Update Password
              </button>
            </div>
          </form>
        </div>

        {/* ============================================ */}
        {/* DANGER ZONE SECTION */}
        {/* ============================================ */}
        <div className="card p-4 sm:p-6 lg:p-8 border-2 border-red-200 dark:border-red-900 dark:border-opacity-20">
          <div className="flex items-center gap-3 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b-2 border-red-200 dark:border-red-900 dark:border-opacity-20">
            <AlertCircle size={20} className="sm:size-[24px] text-red-600 dark:text-red-400" />
            <h3 className="text-lg sm:text-xl font-bold text-red-600 dark:text-red-400">
              Danger Zone
            </h3>
          </div>

          <p className="text-sm sm:text-base text-gray-600 dark:text-dark-text2 mb-4">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>

          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="w-full sm:w-auto px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        title="Delete Account?"
        message="This action cannot be undone. All your tasks and data will be permanently deleted. Are you absolutely sure?"
        confirmText="Delete My Account"
        cancelText="Cancel"
        onConfirm={handleDeleteAccount}
        onCancel={() => setShowDeleteConfirm(false)}
        isDangerous
      />
    </div>
  );
};

export default ProfileSettings;
