import React, { createContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ============================================
  // Initialize persistence and check auth state
  // ============================================
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Set persistence to LOCAL so user stays logged in
        await setPersistence(auth, browserLocalPersistence);

        // Listen to auth state changes
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
          if (currentUser) {
            setUser(currentUser);
            // Fetch user profile from Firestore
            await fetchUserProfile(currentUser.uid);
          } else {
            setUser(null);
            setUserProfile(null);
          }
          setLoading(false);
        });

        return unsubscribe;
      } catch (err) {
        console.error("Auth initialization error:", err);
        setLoading(false);
      }
    };

    const unsubscribe = initializeAuth();
    return () => unsubscribe?.then((u) => u?.());
  }, []);

  // ============================================
  // Fetch user profile from Firestore
  // ============================================
  const fetchUserProfile = async (uid) => {
    try {
      const userDocRef = doc(db, "users", uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        setUserProfile(userDocSnap.data());
      }
    } catch (err) {
      console.error("Error fetching user profile:", err);
    }
  };

  // ============================================
  // SIGNUP - Create new user
  // ============================================
  const signup = async (email, password, fullName) => {
    try {
      setError(null);

      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const uid = userCredential.user.uid;

      // Create user document in Firestore
      const userProfile = {
        uid,
        email,
        name: fullName,
        createdAt: new Date().toISOString(),
        preferences: {
          theme: "dark",
          notifications: {
            deadlineReminders: true,
            dailySummary: true,
            overdueAlerts: true,
          },
        },
      };

      await setDoc(doc(db, "users", uid), userProfile);

      setUser(userCredential.user);
      setUserProfile(userProfile);
      toast.success(`Welcome, ${fullName}!`);

      return userCredential.user;
    } catch (err) {
      const errorMessage = err.message || "Signup failed";
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    }
  };

  // ============================================
  // LOGIN - Sign in user
  // ============================================
  const login = async (email, password) => {
    try {
      setError(null);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      // Fetch user profile
      await fetchUserProfile(userCredential.user.uid);

      setUser(userCredential.user);
      toast.success("Welcome back!");

      return userCredential.user;
    } catch (err) {
      const errorMessage =
        err.code === "auth/user-not-found"
          ? "User not found"
          : err.code === "auth/wrong-password"
            ? "Incorrect password"
            : err.message || "Login failed";

      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    }
  };

  // ============================================
  // FORGOT PASSWORD - Send reset email
  // ============================================
  const forgotPassword = async (email) => {
    try {
      setError(null);
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent! Check your inbox.");
      return true;
    } catch (err) {
      const errorMessage =
        err.code === "auth/user-not-found"
          ? "No account found with this email"
          : err.message || "Failed to send reset email";

      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    }
  };

  // ============================================
  // LOGOUT - Sign out user
  // ============================================
  const logout = async () => {
    try {
      setError(null);
      await signOut(auth);
      setUser(null);
      setUserProfile(null);
      toast.success("Logged out successfully");
      return true;
    } catch (err) {
      const errorMessage = err.message || "Logout failed";
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    }
  };

  // ============================================
  // UPDATE USER PROFILE
  // ============================================
  const updateProfile = async (updates) => {
    try {
      if (!user) throw new Error("User not authenticated");

      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, updates, { merge: true });

      setUserProfile((prev) => ({ ...prev, ...updates }));
      toast.success("Profile updated successfully");

      return true;
    } catch (err) {
      const errorMessage = err.message || "Failed to update profile";
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    }
  };

  // ============================================
  // CONTEXT VALUE
  // ============================================
  const value = {
    user,
    userProfile,
    loading,
    error,
    signup,
    login,
    logout,
    forgotPassword,
    updateProfile,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
