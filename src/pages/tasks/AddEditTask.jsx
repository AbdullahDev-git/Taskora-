import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Book } from "lucide-react";
import { useTasks } from "../../hooks/useTasks";
import { TASK_TYPES, PRIORITIES } from "../../utils/constants";
import toast from "react-hot-toast";

const AddEditTaskContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, createTask, updateTask, getTaskById } = useTasks();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    type: "Assignment",
    subject: "",
    deadline: "",
    priority: "Medium",
    description: "",
  });

  // ============================================
  // Load task if editing
  // ============================================
  useEffect(() => {
    if (id) {
      const task = getTaskById(id);
      if (task) {
        const deadline =
          task.deadline instanceof Date
            ? task.deadline.toISOString().split("T")[0]
            : new Date(task.deadline).toISOString().split("T")[0];

        setFormData({
          title: task.title,
          type: task.type,
          subject: task.subject,
          deadline,
          priority: task.priority,
          description: task.description,
        });
      }
    }
  }, [id, getTaskById]);

  // ============================================
  // VALIDATION
  // ============================================
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Task title is required";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.deadline) {
      newErrors.deadline = "Deadline is required";
    }

    // Check if deadline is in the past
    const deadlineDate = new Date(formData.deadline);
    if (deadlineDate < new Date()) {
      newErrors.deadline = "Deadline cannot be in the past";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ============================================
  // HANDLE SUBMIT
  // ============================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsLoading(true);

      if (id) {
        // Update task
        await updateTask(id, formData);
        navigate(`/tasks/${id}`);
      } else {
        // Create task
        const newTask = await createTask(formData);
        navigate(`/tasks/${newTask.id}`);
      }
    } catch (err) {
      console.error("Error saving task:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // ============================================
  // HANDLE CHANGE
  // ============================================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium mb-3 sm:mb-4"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-dark-text">
          {id ? "Edit Task" : "Create New Task"}
        </h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="card p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
              Task Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Final Research Paper"
              className="input-field"
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">{errors.title}</p>
            )}
          </div>

          {/* Type and Priority */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                Task Type *
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="input-field"
              >
                {TASK_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                Priority *
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="input-field"
              >
                {PRIORITIES.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Subject and Deadline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                Subject *
              </label>
              <div className="relative">
                <Book
                  className="absolute left-3 top-3 text-gray-400 dark:text-dark-text2"
                  size={20}
                />
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g., Computer Science 101"
                  className="input-field pl-10"
                />
              </div>
              {errors.subject && (
                <p className="text-red-500 text-xs mt-1">{errors.subject}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                Deadline *
              </label>
              <div className="relative">
                <Calendar
                  className="absolute left-3 top-3 text-gray-400 dark:text-dark-text2"
                  size={20}
                />
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="input-field pl-10"
                />
              </div>
              {errors.deadline && (
                <p className="text-red-500 text-xs mt-1">{errors.deadline}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add task details, requirements, or notes..."
              rows="5"
              className="input-field resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 justify-end pt-4 border-t border-gray-200 dark:border-dark-border">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn-secondary w-full sm:w-auto"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary disabled:opacity-50 w-full sm:w-auto"
            >
              {isLoading
                ? id
                  ? "Updating..."
                  : "Creating..."
                : id
                  ? "Update Task"
                  : "Create Task"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const AddEditTask = () => {
  return <AddEditTaskContent />;
};

export default AddEditTask;
