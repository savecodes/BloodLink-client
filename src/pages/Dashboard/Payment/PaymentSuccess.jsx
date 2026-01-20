import { useSearchParams, Link, useNavigate } from "react-router";
import {
  CheckCircle,
  Home,
  FileHeart,
  Copy,
  Check,
  CreditCard,
} from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

// Payment Success Component
export const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [copied, setCopied] = useState(false);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    data: fundingData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["funding", sessionId],
    queryFn: async () => {
      await axiosSecure.post("/payment-success", { sessionId });
      const res = await axiosSecure.get(`/funding?session_id=${sessionId}`);

      // console.log("API Response:", res.data);
      return res.data[0] ?? null;
    },
    enabled: !!sessionId,
  });

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sessionId || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentDate = fundingData
    ? new Date(fundingData.paidAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

  const currentTime = fundingData
    ? new Date(fundingData.paidAt).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-green-50/30 py-8 px-4 sm:px-6 lg:px-8">
      <div>
        {/* Success Header */}
        <div className="bg-linear-to-r from-green-500 to-emerald-600 rounded-2xl shadow-lg p-6 sm:p-8 md:p-12 text-white mb-6">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center shadow-xl shrink-0">
              <CheckCircle className="w-16 h-16 md:w-20 md:h-20 text-green-600" />
            </div>
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
                Payment Successful! 🎉
              </h1>
              <p className="text-lg sm:text-xl text-green-50">
                Thank you for your generous contribution to BloodLink
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column - Transaction Details */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Transaction Details
                </h2>
              </div>

              {isLoading ? (
                <p>Loading transaction details...</p>
              ) : isError || !fundingData ? (
                <p className="text-red-600">Transaction not found.</p>
              ) : (
                <div className="space-y-4">
                  {/* Transaction ID */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">
                      Transaction ID
                    </label>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 font-mono text-xs sm:text-sm bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 text-gray-900 break-all">
                        {fundingData.checkoutSessionId || "N/A"}
                      </code>
                      <button
                        onClick={copyToClipboard}
                        className="p-3 hover:bg-gray-100 rounded-xl transition-colors shrink-0 border border-gray-200"
                        title="Copy to clipboard"
                      >
                        {copied ? (
                          <Check className="w-5 h-5 text-green-600" />
                        ) : (
                          <Copy className="w-5 h-5 text-gray-600" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center justify-between py-4 border-t border-gray-100">
                    <span className="text-sm font-semibold text-gray-600">
                      Payment Status
                    </span>
                    <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-bold">
                      ✓ {fundingData.paymentStatus || "Completed"}
                    </span>
                  </div>

                  {/* Payment Method */}
                  <div className="flex items-center justify-between py-4 border-t border-gray-100">
                    <span className="text-sm font-semibold text-gray-600">
                      Payment Method
                    </span>
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-gray-600" />
                      <span className="text-gray-900 font-semibold">
                        Stripe
                      </span>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="flex items-center justify-between py-4 border-t border-gray-100">
                    <span className="text-sm font-semibold text-gray-600">
                      Date & Time
                    </span>
                    <div className="text-right">
                      <p className="text-gray-900 font-semibold text-sm">
                        {currentDate}
                      </p>
                      <p className="text-gray-600 text-xs">{currentTime}</p>
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="flex items-center justify-between py-4 border-t border-gray-100">
                    <span className="text-sm font-semibold text-gray-600">
                      Amount
                    </span>
                    <span className="text-gray-900 font-semibold text-sm">
                      {fundingData.amount.toLocaleString()}{" "}
                      {fundingData.currency?.toUpperCase() || "USD"}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {/* First row: Dashboard + Home */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/dashboard"
                  className="flex-1 py-3 px-6 bg-linear-to-r from-red-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all text-center"
                >
                  <Home className="w-5 h-5 inline-block mr-2" />
                  Go to Dashboard
                </Link>
                <Link
                  to="/"
                  className="flex-1 py-3 px-6 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors text-center"
                >
                  Back to Home
                </Link>
              </div>

              {/* Second row: Go Back */}
              <button
                onClick={() => navigate(-1)}
                className="w-full py-3 px-6 border-2 border-gray-300 text-gray-600 rounded-xl font-semibold hover:text-gray-900 transition-colors text-center cursor-pointer"
              >
                ← Go Back
              </button>
            </div>
          </div>

          {/* Right Column - Thank You Message */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <FileHeart className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Your Impact Matters
                </h2>
              </div>

              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Your generous donation helps us maintain the BloodLink
                  platform and connect donors with recipients in need.
                </p>

                <div className="bg-linear-to-r from-red-50 to-pink-50 rounded-xl p-6 border border-red-100">
                  <h3 className="font-bold text-gray-900 mb-3">
                    How Your Donation Helps:
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">❤️</span>
                      <span>Maintains our platform infrastructure</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">🩸</span>
                      <span>Connects donors with those in urgent need</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">🚀</span>
                      <span>Improves blood donation campaigns</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">💫</span>
                      <span>Helps save lives every single day</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <p className="text-center text-green-800 font-semibold">
                    "Every contribution makes a difference in our mission to
                    ensure no one suffers due to blood shortage."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
