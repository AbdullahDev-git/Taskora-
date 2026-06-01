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

export const NotificationContext = createContext();

export const NotificationProvider = ({ children, userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // ============================================
  // Fetch all notifications for user
  // ============================================
  const fetchNotifications = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading(true);

      const q = query(
        collection(db, "notifications"),
        where("userId", "==", userId),
        orderBy("timestamp", "desc"),
      );

      const querySnapshot = await getDocs(q);
      const notificationsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setNotifications(notificationsData);

      // Calculate unread count
      const unread = notificationsData.filter((n) => !n.isRead).length;
      setUnreadCount(unread);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // ============================================
  // Fetch notifications when userId changes
  // ============================================
  useEffect(() => {
    fetchNotifications();
  }, [userId, fetchNotifications]);

  // ============================================
  // ADD NOTIFICATION
  // ============================================
  const addNotification = async (message, type = "info") => {
    try {
      if (!userId) throw new Error("User not authenticated");

      const notification = {
        userId,
        message,
        type,
        isRead: false,
        timestamp: serverTimestamp(),
      };

      const docRef = await addDoc(
        collection(db, "notifications"),
        notification,
      );

      const newNotification = {
        id: docRef.id,
        ...notification,
        timestamp: new Date().toISOString(),
      };

      setNotifications((prev) => [newNotification, ...prev]);
      setUnreadCount((prev) => prev + 1);

      return newNotification;
    } catch (err) {
      console.error("Error adding notification:", err);
      throw err;
    }
  };

  // ============================================
  // MARK NOTIFICATION AS READ
  // ============================================
  const markAsRead = async (notificationId) => {
    try {
      const notifRef = doc(db, "notifications", notificationId);
      await updateDoc(notifRef, { isRead: true });

      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === notificationId ? { ...notif, isRead: true } : notif,
        ),
      );

      setUnreadCount((prev) => Math.max(0, prev - 1));
      return true;
    } catch (err) {
      console.error("Error marking as read:", err);
      throw err;
    }
  };

  // ============================================
  // MARK ALL AS READ
  // ============================================
  const markAllAsRead = async () => {
    try {
      const unreadNotifs = notifications.filter((n) => !n.isRead);

      for (const notif of unreadNotifs) {
        await updateDoc(doc(db, "notifications", notif.id), { isRead: true });
      }

      setNotifications((prev) =>
        prev.map((notif) => ({ ...notif, isRead: true })),
      );

      setUnreadCount(0);
      return true;
    } catch (err) {
      console.error("Error marking all as read:", err);
      throw err;
    }
  };

  // ============================================
  // DELETE NOTIFICATION
  // ============================================
  const deleteNotification = async (notificationId) => {
    try {
      await deleteDoc(doc(db, "notifications", notificationId));

      const notif = notifications.find((n) => n.id === notificationId);
      setNotifications((prev) => prev.filter((n) => n.id !== notificationId));

      if (notif && !notif.isRead) {
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }

      return true;
    } catch (err) {
      console.error("Error deleting notification:", err);
      throw err;
    }
  };

  // ============================================
  // CONTEXT VALUE
  // ============================================
  const value = {
    notifications,
    unreadCount,
    loading,
    fetchNotifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
