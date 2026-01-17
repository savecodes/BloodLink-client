import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import {
  Mail,
  ArrowLeft,
  Loader2,
  AlertCircle,
  CheckCircle,
  Shield,
} from "lucide-react";
import useAuth from "../../../hooks/useAuth";

const ForgetPassword = () => {
  const { resetPassword } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // TanStack mutation
  const {
    mutate,
    isPending,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: (email) => resetPassword(email),
  });

  const onSubmit = ({ email }) => {
    mutate(email);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 via-white to-pink-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl">
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10">
          {/* Back */}
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors group mb-6"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            <span className="font-medium">Back to Login</span>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Forgot Password
            </h2>
            <p className="text-gray-600">
              Enter your email and we’ll send you a reset link
            </p>
          </div>

          {/* Success */}
          {isSuccess && (
            <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <p className="text-sm text-green-700">
                If an account exists with this email, a password reset link has been sent.
              </p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <p className="text-sm text-red-600">
                Failed to send reset email. Please try again later.
              </p>
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
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                      message: "Enter a valid email address",
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

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full h-12 bg-linear-to-r from-red-600 to-pink-600 text-white font-semibold rounded-xl transition-all hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending link...
                </>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-gray-600 mt-8 text-sm">
            Remembered your password?{" "}
            <Link
              to="/login"
              className="text-red-600 font-semibold hover:text-red-700 transition-colors"
            >
              Sign in
            </Link>
          </p>

          {/* Security */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl flex items-start gap-3">
            <Shield className="w-5 h-5 text-gray-600 shrink-0 mt-0.5" />
            <p className="text-xs text-gray-600 leading-relaxed">
              For security reasons, we don’t disclose whether an email is registered.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
