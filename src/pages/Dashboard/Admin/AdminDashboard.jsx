import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { Users, FileHeart, DollarSign, Activity } from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { CustomTooltip } from "../../../services/CustomTooltip";

// eslint-disable-next-line no-unused-vars
const StatCard = ({ icon: Icon, label, value, color, bgColor }) => (
  <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100">
    <div className="flex items-center gap-4">
      <div
        className={`w-14 h-14 rounded-xl flex items-center justify-center ${bgColor}`}
      >
        <Icon className={`w-7 h-7 ${color}`} />
      </div>
      <div>
        <p className="text-sm text-gray-600 font-medium">{label}</p>
        <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  const { data: stats, isLoading } = useQuery({
    queryKey: ["statistics"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/dashboard/stats`);
      return data;
    },
    enabled: !loading && !!user,
  });

//   console.log(stats);

  const monthlyFundingData = stats?.monthlyFundingData || [];
  const bloodGroupDistribution = stats?.bloodGroupDistribution || [];
  const COLORS = [
    "#EF4444",
    "#F59E0B",
    "#10B981",
    "#3B82F6",
    "#8B5CF6",
    "#EC4899",
    "#6366F1",
    "#14B8A6",
  ];

  const usersChartData = [
    {
      name: "Platform Stats",
      Users: stats?.totalUsers || 0,
      Requests: stats?.totalDonationRequests || 0,
      Funding: stats?.totalFunding || 0,
    },
  ];

  if (loading || isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-red-50/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-linear-to-r from-red-600 to-pink-600 rounded-2xl shadow-lg p-6 sm:p-8 text-white">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
            Welcome back, {user?.displayName}! 👋
          </h1>
          <p className="text-red-50 text-sm sm:text-base">
            Here's what's happening with your blood donation platform today
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <StatCard
            icon={Users}
            label="Total Users (Donors)"
            value={stats?.totalUsers?.toLocaleString() || 0}
            color="text-blue-600"
            bgColor="bg-blue-100"
          />
          <StatCard
            icon={FileHeart}
            label="Total Donation Requests"
            value={stats?.totalDonationRequests?.toLocaleString() || 0}
            color="text-red-600"
            bgColor="bg-red-100"
          />
          <StatCard
            icon={DollarSign}
            label="Total Funding"
            value={`$${stats?.totalFunding?.toLocaleString() || 0}`}
            color="text-green-600"
            bgColor="bg-green-100"
          />
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* All Users Statistics Bar Chart */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Activity className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  All Users Overview
                </h2>
                <p className="text-sm text-gray-600">
                  Platform statistics summary
                </p>
              </div>
            </div>
            <div className="h-75">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={usersChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis
                    dataKey="name"
                    stroke="#6B7280"
                    style={{ fontSize: "12px" }}
                  />
                  <YAxis stroke="#6B7280" style={{ fontSize: "12px" }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="Users" fill="#3B82F6" radius={[8, 8, 0, 0]} />
                  <Bar
                    dataKey="Requests"
                    fill="#EF4444"
                    radius={[8, 8, 0, 0]}
                  />
                  <Bar dataKey="Funding" fill="#10B981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Monthly Funding Line Chart */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Monthly Funding Growth
                </h2>
                <p className="text-sm text-gray-600">
                  Total donations received over time
                </p>
              </div>
            </div>
            <div className="h-75">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyFundingData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis
                    dataKey="month"
                    stroke="#6B7280"
                    style={{ fontSize: "12px" }}
                  />
                  <YAxis
                    stroke="#6B7280"
                    style={{ fontSize: "12px" }}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="funding"
                    stroke="#10B981"
                    strokeWidth={3}
                    dot={{ fill: "#10B981", r: 5 }}
                    name="Funding"
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Blood Group Distribution */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
              <FileHeart className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Blood Group Distribution
              </h2>
              <p className="text-sm text-gray-600">
                Donation requests by blood type
              </p>
            </div>
          </div>
          <div className="h-87.5 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={bloodGroupDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {bloodGroupDistribution.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
