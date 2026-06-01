import React from "react";
import { AlertCircle, Check, X } from "lucide-react";

const ConfirmDialog = ({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  isDangerous = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="card w-full max-w-sm p-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle
            size={24}
            className={isDangerous ? "text-red-500" : "text-primary-500"}
          />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-text">
            {title}
          </h3>
        </div>

        {/* Message */}
        <p className="text-gray-600 dark:text-dark-text2 mb-6">{message}</p>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="btn-secondary flex items-center gap-2"
          >
            <X size={16} />
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white transition-colors ${
              isDangerous
                ? "bg-red-600 hover:bg-red-700"
                : "bg-primary-600 hover:bg-primary-700"
            }`}
          >
            <Check size={16} />
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
