import React, { useState } from "react";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import { Link } from "react-router-dom";

export default function CloudnotteLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email/Username is required";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit called"); // Debug: Confirm function is triggered
    if (validateForm()) {
      console.log("Validation passed, sending request..."); // Debug: Confirm validation
      const inputData = {
        identifier: email,
        password: password,
      };
      console.log("Input data being sent:", inputData); // Debug: Log input data
      try {
        const response = await fetch(
          "https://staging-api-v3.cloudnotte.com/graphql",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              query: `
              mutation LoginUser($input: LoginUserInput!) {
                loginUser(input: $input) {
                  token
                  isVerified
                }
              }
            `,
              variables: {
                input: inputData,
              },
            }),
          }
        );

        console.log("Request sent, awaiting response..."); // Debug: Confirm request sent
        const result = await response.json();
        console.log("Response received:", result); // Debug: Log full response

        if (result.errors) {
          console.error("GraphQL Errors:", result.errors);
          setErrors({
            ...errors,
            form:
              result.errors[0]?.message ||
              "Failed to log in. Please try again.",
          });
        } else {
          console.log("Login successful:", result.data.loginUser);
          setErrors({}); // Clear errors on success
          // Optionally store token or redirect
          // localStorage.setItem('token', result.data.loginUser.token);
          // window.location.href = "/dashboard";
        }
      } catch (error) {
        console.error("Network Error:", error);
        setErrors({
          ...errors,
          form: "Network error occurred. Please check your connection and try again.",
        });
      }
    } else {
      console.log("Request not sent due to validation errors"); // Debug: Validation failed
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      {/* Left Side - Login Form (Enhanced for mobile) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-5 py-8 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-lg w-full mx-auto bg-white rounded-2xl shadow-sm p-6 sm:p-8">
          {/* Logo with better spacing */}
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white text-lg font-bold">C</span>
              </div>
              <span className="text-2xl font-semibold text-gray-800">
                Cloudnotte
              </span>
            </div>
          </div>

          {/* Welcome Header with improved hierarchy */}
          <div className="mb-8 text-center sm:text-left">
            <h1 className="text-3xl font-bold text-blue-600 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600 text-base">Sign in to your account</p>
          </div>

          {/* Form-level error */}
          {errors.form && (
            <p className="mb-4 text-xs text-red-500 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.form}
            </p>
          )}

          {/* Login Form with better spacing */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email/Username Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email/Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address/Username"
                  className={`w-full pl-10 pr-4 py-3 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-xs text-red-500 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className={`w-full pl-10 pr-10 py-3 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-xs text-red-500 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Keep me logged in & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={keepLoggedIn}
                    onChange={(e) => setKeepLoggedIn(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all duration-200"
                  />
                </div>
                <span className="text-sm text-gray-700">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-700 transition-colors duration-200"
              >
                Forgot password?
              </Link>
            </div>

            {/* Login Button with better visual feedback */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Sign In
            </button>

            {/* Sign Up Link */}
            <div className="text-center pt-4">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Promotional Content (hidden on small screens) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white items-center justify-center relative overflow-hidden">
        {/* Background Pattern/Decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-32 h-32 border border-gray-500 rotate-45"></div>
          <div className="absolute top-40 right-20 w-24 h-24 border border-gray-500 rotate-12"></div>
          <div className="absolute bottom-40 left-40 w-20 h-20 border border-gray-500 -rotate-12"></div>
        </div>

        {/* Hand with pen illustration placeholder */}
        <div className="absolute bottom-0 right-0 opacity-30">
          <div className="w-80 h-80 bg-gradient-to-t from-amber-600 to-amber-500 rounded-full transform rotate-12 translate-x-20 translate-y-20"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-12 max-w-lg">
          <h2 className="text-4xl font-bold mb-6 leading-tight">
            Teaching Made Easy With{" "}
            <span className="text-yellow-400">Cloudnotte</span>
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Digitalized lesson notes, timetable and CBT exams with full report
            sheets all in one platform.
          </p>
        </div>

        {/* Yellow accent element */}
        <div className="absolute top-8 right-8">
          <div className="w-12 h-12 bg-yellow-400 rounded-lg transform rotate-12 flex items-center justify-center">
            <span className="text-gray-900 text-xl font-bold">#</span>
          </div>
        </div>
      </div>
    </div>
  );
}
