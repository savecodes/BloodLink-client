import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { FileText, Clock, CheckCircle, XCircle, Plus } from "lucide-react";
import { Link } from "react-router";

// eslint-disable-next-line no-unused-vars
const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100">
    <div className="flex items-center gap-4">
      <div
        className={`w-14 h-14 rounded-xl flex items-center justify-center ${color}`}
      >
        <Icon className="w-7 h-7" />
      </div>
      <div>
        <p className="text-sm text-gray-600 font-medium">{label}</p>
        <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
    </div>
  </div>
);

const UserDashboard = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["dashboard", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations/dashboard/${user.email}`);
      return res.data;
    },
  });

  if (loading || isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-red-50/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="space-y-8">
        {/* Greeting Section */}
        <div className="bg-linear-to-r from-red-600 to-pink-600 rounded-2xl shadow-lg p-6 sm:p-8 text-white">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
            Welcome back, {user?.displayName}! 👋
          </h1>
          <p className="text-red-50 text-sm sm:text-base">
            Here's what's happening with your donation requests
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <StatCard
            icon={FileText}
            label="Total Requests"
            value={data?.total || 0}
            color="bg-blue-100 text-blue-600"
          />
          <StatCard
            icon={Clock}
            label="Pending"
            value={data?.pending || 0}
            color="bg-yellow-100 text-yellow-600"
          />
          <StatCard
            icon={CheckCircle}
            label="Completed"
            value={data?.completed || 0}
            color="bg-green-100 text-green-600"
          />
          <StatCard
            icon={XCircle}
            label="Cancelled"
            value={data?.cancelled || 0}
            color="bg-red-100 text-red-600"
          />
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                Need Blood Donation?
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Create a new request to find donors near you.
              </p>
            </div>
            <Link
              to="/dashboard/create-donation-request"
              className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-red-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg shadow-red-200 hover:shadow-xl hover:shadow-red-300 hover:scale-105 transition-all whitespace-nowrap cursor-pointer"
            >
              <Plus className="w-5 h-5" />
              Create Request
            </Link>
          </div>
        </div>

        {/* Recent Requests Section */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 px-6 py-5 bg-gray-50 border-b border-gray-200">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">
              Recent Donation Requests
            </h3>
            <Link
              to="/dashboard/my-donation-requests"
              className="text-sm sm:text-base text-red-600 hover:text-red-700 font-medium hover:underline transition-colors duration-200"
            >
              View All →
            </Link>
          </div>

          <div className="divide-y divide-gray-200">
            {data?.recent && data.recent.length > 0 ? (
              data.recent.map((req) => (
                <div
                  key={req._id}
                  className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-base sm:text-lg mb-1 truncate">
                      {req.recipientName}
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                      {req.hospitalName}
                    </p>
                  </div>
                  <span
                    className={`capitalize text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-medium border whitespace-nowrap ${
                      req.status === "pending"
                        ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                        : req.status === "inprogress" ||
                          req.status === "in progress"
                        ? "bg-blue-100 text-blue-700 border-blue-200"
                        : req.status === "completed"
                        ? "bg-green-100 text-green-700 border-green-200"
                        : req.status === "cancelled"
                        ? "bg-red-100 text-red-700 border-red-200"
                        : "bg-gray-100 text-gray-700 border-gray-200"
                    }`}
                  >
                    {req.status}
                  </span>
                </div>
              ))
            ) : (
              <div className="p-8 sm:p-12 text-center">
                <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
                  No recent donation requests
                </h3>
                <p className="text-sm text-gray-500">
                  Create your first request to get started
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
