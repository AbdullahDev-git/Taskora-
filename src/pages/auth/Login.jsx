import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { isValidEmail } from "../../utils/helpers";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      newErrors.email = "Invalid email format";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      setIsLoading(true);
      await login(email, password);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("Login error:", err);
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

      <div className="relative z-10 w-full max-w-md mx-auto">
        <div className="card p-6 sm:p-8">
          <div className="flex justify-center mb-6">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600">
              <GraduationCap size={36} className="sm:size-[40px] text-white" />
            </div>
          </div>

          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-dark-text mb-2">Taskora</h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-dark-text2">Welcome Back</p>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-dark-text2">Please enter your details to sign in</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">Email Address</label>
              <div className="relative">
                <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors({ ...errors, email: "" }); }} placeholder="name@example.com" className="input-field text-sm sm:text-base" />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors({ ...errors, password: "" }); }} placeholder="Min. 6 characters" className="input-field pr-14 text-sm sm:text-base" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-400 dark:text-dark-text2 hover:text-gray-600 dark:hover:text-dark-text">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <div className="text-right">
              <Link to="/forgot-password" className="text-xs sm:text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">Forgot password?</Link>
            </div>

            <button type="submit" disabled={isLoading} className="w-full btn-primary disabled:opacity-50 mt-6">
              {isLoading ? "Signing in..." : "Log In"}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-dark-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-dark-bg2 text-gray-500 dark:text-dark-text2">Or</span>
            </div>
          </div>

          <p className="text-center text-sm sm:text-base text-gray-600 dark:text-dark-text2">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold">Sign Up</Link>
          </p>
        </div>

        <p className="text-center text-gray-500 dark:text-dark-text2 text-xs mt-4">� 2026 Taskora. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Login;
