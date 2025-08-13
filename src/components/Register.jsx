import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Phone,
  Lock,
  Check,
  X,
  AlertCircle,
} from "lucide-react";

export default function AccountCreationForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    referralCode: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
      case "lastName":
        return value.trim().length < 2 ? "Must be at least 2 characters" : "";
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value)
          ? "Please enter a valid email address"
          : "";
      case "phoneNumber":
        const phoneRegex = /^\+?[1-9]\d{1,14}$/;
        return !phoneRegex.test(value.replace(/\s/g, ""))
          ? "Please enter a valid phone number (e.g. +2348000000000)"
          : "";
      case "password":
        if (value.length < 8) return "Password must be at least 8 characters";
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value))
          return "Must contain uppercase, lowercase, and number";
        return "";
      case "confirmPassword":
        return value !== formData.password ? "Passwords do not match" : "";
      default:
        return "";
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors({
        ...errors,
        [name]: error,
      });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });

    const error = validateField(name, value);
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (key !== "referralCode") {
        // referralCode is optional
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
      }
    });

    setErrors(newErrors);
    setTouched(
      Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );

    if (Object.keys(newErrors).length === 0) {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Form submitted:", formData);
    }

    setIsSubmitting(false);
  };

  const getInputClasses = (fieldName) => {
    const hasError = errors[fieldName] && touched[fieldName];
    const isValid =
      touched[fieldName] && !errors[fieldName] && formData[fieldName];

    return `w-full pl-10 pr-4 py-2 border rounded-lg transition-all duration-200 outline-none ${
      hasError
        ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-400"
        : isValid
        ? "border-green-400 bg-green-50 focus:ring-2 focus:ring-green-200 focus:border-green-400"
        : "border-gray-300 bg-white hover:border-gray-400 focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
    }`;
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const strengthColors = [
    "bg-gray-200",
    "bg-red-400",
    "bg-orange-400",
    "bg-yellow-400",
    "bg-green-400",
    "bg-green-500",
  ];
  const strengthLabels = ["", "Very Weak", "Weak", "Fair", "Good", "Strong"];

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="mb-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">
              CREATE AN ACCOUNT
            </h1>
            <p className="text-sm text-gray-600">
              Get Started Absolutely Free!
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  First Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={getInputClasses("firstName")}
                  />
                  {touched.firstName && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {errors.firstName ? (
                        <X className="h-4 w-4 text-red-400" />
                      ) : formData.firstName ? (
                        <Check className="h-4 w-4 text-green-400" />
                      ) : null}
                    </div>
                  )}
                </div>
                {errors.firstName && touched.firstName && (
                  <p className="mt-1 text-xs text-red-600 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Last Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={getInputClasses("lastName")}
                  />
                  {touched.lastName && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {errors.lastName ? (
                        <X className="h-4 w-4 text-red-400" />
                      ) : formData.lastName ? (
                        <Check className="h-4 w-4 text-green-400" />
                      ) : null}
                    </div>
                  )}
                </div>
                {errors.lastName && touched.lastName && (
                  <p className="mt-1 text-xs text-red-600 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={getInputClasses("email")}
                />
                {touched.email && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {errors.email ? (
                      <X className="h-4 w-4 text-red-400" />
                    ) : formData.email ? (
                      <Check className="h-4 w-4 text-green-400" />
                    ) : null}
                  </div>
                )}
              </div>
              {errors.email && touched.email && (
                <p className="mt-1 text-xs text-red-600 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="+2348000000000"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={getInputClasses("phoneNumber")}
                />
                {touched.phoneNumber && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {errors.phoneNumber ? (
                      <X className="h-4 w-4 text-red-400" />
                    ) : formData.phoneNumber ? (
                      <Check className="h-4 w-4 text-green-400" />
                    ) : null}
                  </div>
                )}
              </div>
              {errors.phoneNumber && touched.phoneNumber && (
                <p className="mt-1 text-xs text-red-600 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errors.phoneNumber}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Include country code (e.g. +234 for Nigeria)
              </p>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`${getInputClasses("password")} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:bg-gray-100 rounded p-1 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
              {formData.password && (
                <div className="mt-1">
                  <div className="flex space-x-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded ${
                          i < passwordStrength
                            ? strengthColors[passwordStrength]
                            : "bg-gray-200"
                        } transition-colors duration-200`}
                      />
                    ))}
                  </div>
                  <p
                    className={`text-xs ${
                      passwordStrength >= 4
                        ? "text-green-600"
                        : passwordStrength >= 3
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {strengthLabels[passwordStrength]}
                  </p>
                </div>
              )}
              {errors.password && touched.password && (
                <p className="mt-1 text-xs text-red-600 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Confirm Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`${getInputClasses("confirmPassword")} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:bg-gray-100 rounded p-1 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && touched.confirmPassword && (
                <p className="mt-1 text-xs text-red-600 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Referral Code */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Referral Code (Optional)
              </label>
              <p className="text-xs text-gray-500 mb-1">
                Enter the username of the person who referred you
              </p>
              <input
                type="text"
                name="referralCode"
                placeholder="Enter referral code"
                value={formData.referralCode}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg hover:border-gray-400 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition-all duration-200"
              />
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 shadow hover:shadow-md disabled:shadow"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                "Create Your Account"
              )}
            </button>

            {/* Login Link */}
            <p className="text-center text-xs text-gray-600 mt-4">
              Already have an account on Cloudnote?{" "}
              <a
                href="/"
                className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors"
              >
                Login
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Hero Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 text-center text-white p-6 max-w-md">
          <h2 className="text-3xl font-bold mb-4 leading-tight">
            Learning Made Easier & Accessible
          </h2>
          <p className="text-lg text-gray-200 leading-relaxed">
            Digitalized assignments, timetable and stay connected with
            classmates
          </p>
        </div>
      </div>
    </div>
  );
}
