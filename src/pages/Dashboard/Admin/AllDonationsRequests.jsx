import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import {
  Search,
  MoreVertical,
  Eye,
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  Calendar,
  Hospital,
  Droplet,
} from "lucide-react";
import { useNavigate } from "react-router";
import Pagination from "../../../components/Pagination/Pagination";

const AllDonationsRequests = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdown, setOpenDropdown] = useState(null);
  const requestsPerPage = 6;
  const navigate = useNavigate();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["donors", currentPage, statusFilter, searchTerm],
    queryFn: async () => {
      const params = {
        page: currentPage,
        limit: requestsPerPage,
        search: searchTerm,
      };
      if (statusFilter && statusFilter !== "All Status") {
        params.status = statusFilter.toLowerCase();
      }
      const res = await axiosSecure.get("/all-donations", { params });
      return res.data;
    },
    keepPreviousData: true,
  });

  const donors = data?.data || [];
  const totalPages = data?.pagination?.totalPages || 1;

  const handleStatusChange = async (requestId, newStatus) => {
    await axiosSecure.patch(`/donations/${requestId}/status`, {
      status: newStatus,
    });
    refetch();
    setOpenDropdown(null);
  };

  const handleViewDetails = (request) => {
    navigate(`details/${request._id}`);
    setOpenDropdown(null);
  };

  const handleDelete = async (requestId) => {
    await axiosSecure.delete(`/donations/${requestId}`);
    refetch();
    setOpenDropdown(null);
  };

  const toggleDropdown = (requestId) => {
    setOpenDropdown(openDropdown === requestId ? null : requestId);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "in progress":
      case "inprogress":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "completed":
        return "bg-green-100 text-green-700 border-green-200";
      case "canceled":
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-red-50/30 py-8 px-4 sm:px-6 lg:px-8">
      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 flex items-center gap-3">
              All Donation Requests
            </h1>
            <p className="text-gray-600 mt-2">
              Manage all blood donation requests
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search requests..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Status Filter & Count */}
            <div className="flex items-center gap-4">
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-white"
              >
                <option>All Status</option>
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
                <option>Canceled</option>
              </select>
              <div className="text-sm text-gray-600 whitespace-nowrap">
                {data?.pagination?.total || 0} request(s)
              </div>
            </div>
          </div>
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {donors.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No requests found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            donors.map((request) => (
              <div
                key={request._id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Blood Group Badge */}
                  <div className="shrink-0">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-linear-to-br from-red-500 to-pink-600 flex items-center justify-center text-white font-bold text-xl sm:text-2xl shadow-lg">
                      {request.bloodGroup}
                    </div>
                  </div>

                  {/* Request Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {request.recipientName}
                        </h3>
                        <p className="text-gray-600 flex items-center gap-1 mt-1">
                          <Hospital className="w-4 h-4" />
                          {request.hospitalName}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium border capitalize ${getStatusColor(
                          request.status,
                        )}`}
                      >
                        {request.status
                          ? request.status.charAt(0).toUpperCase() +
                            request.status.slice(1)
                          : "Pending"}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(request.donationDate || request.createdAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Droplet className="w-4 h-4" />
                        Requester: {request.requesterName || "John Donor"}
                      </span>
                    </div>

                    {request.requestMessage && (
                      <p className="text-gray-700 line-clamp-2">
                        {request.requestMessage}
                      </p>
                    )}
                  </div>

                  {/* Action Button */}
                  <div className="shrink-0">
                    <div className="relative">
                      <button
                        onClick={() => toggleDropdown(request._id)}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all cursor-pointer"
                      >
                        <MoreVertical className="w-5 h-5" />
                        <span>Actions</span>
                      </button>

                      {openDropdown === request._id && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setOpenDropdown(null)}
                          />
                          <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-20 overflow-hidden">
                            <button
                              onClick={() => handleViewDetails(request)}
                              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                              <Eye size={16} />
                              View Details
                            </button>

                            <div className="border-t border-gray-200">
                              <p className="px-4 py-2 text-xs font-medium text-gray-500 uppercase">
                                Change Status
                              </p>
                            </div>

                            {request.status !== "inprogress" &&
                              request.status !== "in progress" && (
                                <button
                                  onClick={() =>
                                    handleStatusChange(
                                      request._id,
                                      "inprogress",
                                    )
                                  }
                                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                                >
                                  <Clock size={16} />
                                  In Progress
                                </button>
                              )}

                            {request.status !== "completed" && (
                              <button
                                onClick={() =>
                                  handleStatusChange(request._id, "completed")
                                }
                                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-green-600 hover:bg-green-50 transition-colors cursor-pointer"
                              >
                                <CheckCircle size={16} />
                                Completed
                              </button>
                            )}

                            {request.status !== "canceled" &&
                              request.status !== "cancelled" && (
                                <button
                                  onClick={() =>
                                    handleStatusChange(request._id, "canceled")
                                  }
                                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                  <XCircle size={16} />
                                  Canceled
                                </button>
                              )}

                            <div className="border-t border-gray-200" />

                            <button
                              onClick={() => handleDelete(request._id)}
                              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors rounded-b-xl cursor-pointer"
                            >
                              <Trash2 size={16} />
                              Delete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default AllDonationsRequests;
