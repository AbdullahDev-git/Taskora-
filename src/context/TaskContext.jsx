import React, { createContext, useState, useCallback, useEffect } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../services/firebase";
import toast from "react-hot-toast";

export const TaskContext = createContext();

export const TaskProvider = ({ children, userId }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ============================================
  // Fetch all tasks for current user
  // ============================================
  const fetchTasks = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading(true);
      setError(null);

      const q = query(
        collection(db, "tasks"),
        where("userId", "==", userId),
        orderBy("deadline", "asc"),
      );

      const querySnapshot = await getDocs(q);
      const tasksData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTasks(tasksData);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // ============================================
  // Fetch tasks when userId changes
  // ============================================
  useEffect(() => {
    fetchTasks();
  }, [userId, fetchTasks]);

  // ============================================
  // CREATE TASK
  // ============================================
  const createTask = async (taskData) => {
    try {
      if (!userId) throw new Error("User not authenticated");

      const newTask = {
        ...taskData,
        userId,
        status: "Pending",
        createdAt: serverTimestamp(),
        deadline: new Date(taskData.deadline),
      };

      const docRef = await addDoc(collection(db, "tasks"), newTask);

      const createdTask = {
        id: docRef.id,
        ...newTask,
        createdAt: new Date().toISOString(),
      };

      setTasks((prev) => [...prev, createdTask]);
      toast.success("Task created successfully!");

      return createdTask;
    } catch (err) {
      const errorMessage = err.message || "Failed to create task";
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    }
  };

  // ============================================
  // UPDATE TASK
  // ============================================
  const updateTask = async (taskId, updates) => {
    try {
      const taskRef = doc(db, "tasks", taskId);

      const updateData = { ...updates };
      if (updates.deadline) {
        updateData.deadline = new Date(updates.deadline);
      }

      await updateDoc(taskRef, updateData);

      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId ? { ...task, ...updates } : task,
        ),
      );

      toast.success("Task updated successfully!");
      return true;
    } catch (err) {
      const errorMessage = err.message || "Failed to update task";
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    }
  };

  // ============================================
  // DELETE TASK
  // ============================================
  const deleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, "tasks", taskId));

      setTasks((prev) => prev.filter((task) => task.id !== taskId));
      toast.success("Task deleted successfully!");

      return true;
    } catch (err) {
      const errorMessage = err.message || "Failed to delete task";
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    }
  };

  // ============================================
  // TOGGLE TASK STATUS
  // ============================================
  const toggleTaskStatus = async (taskId, currentStatus) => {
    const newStatus = currentStatus === "Completed" ? "Pending" : "Completed";
    return updateTask(taskId, { status: newStatus });
  };

  // ============================================
  // GET SINGLE TASK
  // ============================================
  const getTaskById = (taskId) => {
    return tasks.find((task) => task.id === taskId);
  };

  // ============================================
  // CONTEXT VALUE
  // ============================================
  const value = {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    getTaskById,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export default TaskContext;
