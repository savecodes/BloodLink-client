import { useNavigate } from "react-router";
import { Home, ArrowLeft, Heart, Search, FileHeart } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 via-white to-pink-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animated 404 with Heart Icon */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-red-100 rounded-full blur-3xl opacity-50 animate-pulse"></div>
          </div>
          <div className="relative">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="text-8xl sm:text-9xl font-bold text-gray-200">
                4
              </span>
              <div className="relative">
                <Heart className="w-20 h-20 sm:w-24 sm:h-24 text-red-600 fill-red-600 animate-pulse" />
                <div className="absolute inset-0 animate-ping">
                  <Heart className="w-20 h-20 sm:w-24 sm:h-24 text-red-400 opacity-75" />
                </div>
              </div>
              <span className="text-8xl sm:text-9xl font-bold text-gray-200">
                4
              </span>
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Oops! The page you're looking for doesn't exist.
          </p>
          <p className="text-base text-gray-500">
            It might have been moved or deleted, or the URL might be incorrect.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-red-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all group cursor-pointer"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </button>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all group cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </button>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Links</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <button
              onClick={() => navigate("/")}
              className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-red-50 transition-colors group"
            >
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Home className="w-6 h-6 text-red-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">Home</span>
            </button>

            <button
              onClick={() => navigate("/donors")}
              className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-red-50 transition-colors group"
            >
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Search className="w-6 h-6 text-red-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                Search Donors
              </span>
            </button>

            <button
              onClick={() => navigate("/requests")}
              className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-red-50 transition-colors group"
            >
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileHeart className="w-6 h-6 text-red-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                Requests
              </span>
            </button>
          </div>
        </div>

        {/* Help Text */}
        <p className="text-sm text-gray-500 mt-8">
          Need help? Contact us at{" "}
          <a
            href="mailto:support@bloodlink.com"
            className="text-red-600 hover:text-red-700 font-medium"
          >
            support@bloodlink.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
