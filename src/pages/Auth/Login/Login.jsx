import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  Loader2,
  CheckCircle,
  AlertCircle,
  Shield,
  Users,
  Droplet
} from "lucide-react";
import useAuth from "../../../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { signInUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError("");

    try {
      await signInUser(data.email, data.password);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Failed to sign in. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 via-white to-pink-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl">

          <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10">
            <Link
              to="/"
              className=" inline-flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors group mb-6"
            >
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              <span className="font-medium">Back to Home</span>
            </Link>

            {/* Header */}
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-600">
                Sign in to your account to continue saving lives
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    placeholder="john@example.com"
                    className={`w-full h-12 pl-11 pr-4 rounded-xl border-2 ${
                      errors.email 
                        ? "border-red-500 focus:border-red-500 focus:ring-red-200" 
                        : "border-gray-200 focus:border-red-500 focus:ring-red-200"
                    } focus:outline-none focus:ring-4 transition-all`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Password <span className="text-red-600">*</span>
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    placeholder="••••••••"
                    className={`w-full h-12 pl-11 pr-11 rounded-xl border-2 ${
                      errors.password 
                        ? "border-red-500 focus:border-red-500 focus:ring-red-200" 
                        : "border-gray-200 focus:border-red-500 focus:ring-red-200"
                    } focus:outline-none focus:ring-4 transition-all`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
                />
                <label htmlFor="remember-me" className="ml-2 text-sm text-gray-700">
                  Remember me for 30 days
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-linear-to-r from-red-600 to-pink-600 text-white font-semibold rounded-xl transition-all hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

            </form>

            {/* Register Link */}
            <p className="text-center text-gray-600 mt-8 text-sm">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-red-600 font-semibold hover:text-red-700 transition-colors"
              >
                Create one
              </Link>
            </p>

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-gray-50 rounded-xl flex items-start gap-3">
              <Shield className="w-5 h-5 text-gray-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Your data is protected with enterprise-grade encryption. We never share your information with third parties.
                </p>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Login;