import { XCircle, Home, FileHeart } from "lucide-react";
import { Link } from "react-router";

const PaymentCancel = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-orange-50/30 py-8 px-4 sm:px-6 lg:px-8">
      <div>
        {/* Cancel Header */}
        <div className="bg-linear-to-r from-orange-500 to-amber-600 rounded-2xl shadow-lg p-6 sm:p-8 md:p-12 text-white mb-6">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center shadow-xl shrink-0">
              <XCircle className="w-16 h-16 md:w-20 md:h-20 text-orange-600" />
            </div>
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
                Payment Cancelled
              </h1>
              <p className="text-lg sm:text-xl text-orange-50">
                Your transaction was not completed
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column - What Happened */}
          <div className="space-y-6">
            {/* Explanation Card */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-orange-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  What Happened?
                </h2>
              </div>

              <p className="text-gray-700 mb-4">
                Your payment process was cancelled and{" "}
                <strong>no charges were made</strong> to your account. This
                could have happened for several reasons:
              </p>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold shrink-0">
                    1
                  </span>
                  <span className="text-gray-700">
                    You clicked the back or cancel button during checkout
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold shrink-0">
                    2
                  </span>
                  <span className="text-gray-700">
                    The payment window was closed before completion
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold shrink-0">
                    3
                  </span>
                  <span className="text-gray-700">
                    Session timeout occurred due to inactivity
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold shrink-0">
                    4
                  </span>
                  <span className="text-gray-700">
                    Payment details were incorrect or incomplete
                  </span>
                </li>
              </ul>

              <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                <p className="text-sm text-orange-800 font-medium">
                  💡 <strong>No worries!</strong> Your account is safe and you
                  can try again whenever you're ready.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/dashboard/make-donation"
                className="flex-1 py-3 px-6 bg-linear-to-r from-red-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all text-center"
              >
                Try Again
              </Link>
              <Link
                to="/dashboard"
                className="flex-1 flex items-center justify-center gap-2 py-3 px-6 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                <Home className="w-5 h-5" />
                Dashboard
              </Link>
            </div>

            <Link
              to="/"
              className="block text-center text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              ← Back to Home
            </Link>
          </div>

          {/* Right Column - Encouragement */}
          <div className="space-y-6">
            {/* Still Want to Help Card */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <FileHeart className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Still Want to Help?
                </h2>
              </div>

              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Your contribution can make a real difference! Even small
                  donations help us maintain our platform and connect
                  life-savers with those in urgent need.
                </p>

                <div className="bg-linear-to-r from-red-50 to-pink-50 rounded-xl p-6 border border-red-100">
                  <h3 className="font-bold text-gray-900 mb-3">
                    Why Your Support Matters:
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-0.5 text-lg">💰</span>
                      <span>Every dollar helps maintain our free service</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-0.5 text-lg">🤝</span>
                      <span>Connects thousands of donors with recipients</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-0.5 text-lg">🌟</span>
                      <span>Makes life-saving blood donations possible</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-0.5 text-lg">❤️</span>
                      <span>Creates a stronger blood donation community</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <p className="text-center text-green-800 font-semibold text-sm">
                    "Together, we can ensure no one suffers from blood shortage.
                    Your support saves lives."
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

export default PaymentCancel;
