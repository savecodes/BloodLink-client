import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Search,
  Filter,
  Plus,
  Eye,
  Edit2,
  Trash2,
  MapPin,
  Clock,
  Calendar,
  Hospital,
  AlertCircle,
} from "lucide-react";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import ErrorPage from "../../../../components/ErrorPage/ErrorPage";
import Pagination from "../../../../components/Pagination/Pagination";
import Swal from "sweetalert2";

const MyRequests = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const statusDropdownRef = useRef(null);
  const { user, loading } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 6;

  const { data, isLoading, error } = useQuery({
    queryKey: ["my-donations", user?.email, statusFilter, searchQuery, page],
    queryFn: async () => {
      const params = new URLSearchParams({
        page,
        limit,
      });

      if (statusFilter !== "All Status") {
        params.append("status", statusFilter.toLowerCase().replace(" ", ""));
      }

      if (searchQuery) {
        params.append("search", searchQuery);
      }

      const res = await axiosSecure.get(
        `/donations/user/${user.email}?${params.toString()}`,
      );

      return res.data;
    },
    keepPreviousData: true,
    enabled: !loading && !!user?.email,
  });

  const donations = data?.data || [];
  const pagination = data?.pagination;

  const statusOptions = [
    "All Status",
    "Pending",
    "In Progress",
    "Completed",
    "Cancelled",
  ];
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    "in progress": "bg-blue-100 text-blue-700 border-blue-200",
    completed: "bg-green-100 text-green-700 border-green-200",
    cancelled: "bg-red-100 text-red-700 border-red-200",
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        statusDropdownRef.current &&
        !statusDropdownRef.current.contains(event.target)
      ) {
        setShowStatusDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => setPage(1), 0);
    return () => clearTimeout(timeout);
  }, [searchQuery, statusFilter]);

  const handleEdit = (id) => {
    navigate(`/dashboard/my-donation-requests/edit/${id}`);
  };

  //   Donations Delete Functions
  const { mutateAsync: deleteRequest } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/donations/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-donations"],
      });

      // Adjust page if last item deleted
      if (donations.length === 1 && page > 1) {
        setPage(page - 1);
      }

      toast.success("Your request has been deleted");
    },
    onError: (error) => {
      toast.error(error?.message || "Delete failed");
    },
  });

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      await deleteRequest(id);
    }
  };

  if (isLoading || loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorPage />;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-red-50/30 py-8 px-4 sm:px-6 lg:px-8">
      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 flex items-center gap-3">
              My Donation Requests
            </h1>
            <p className="text-gray-600 mt-2">
              Manage and track your blood donation requests
            </p>
          </div>
          <button
            onClick={() => navigate("/dashboard/create-donation-request")}
            className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-red-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg shadow-red-200 hover:shadow-xl hover:shadow-red-300 hover:scale-105 transition-all cursor-pointer"
          >
            <Plus className="w-5 h-5" />
            New Request
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by recipient or hospital..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Status Filter */}
            <div ref={statusDropdownRef} className="relative sm:w-48">
              <button
                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                className="w-full flex items-center justify-between gap-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all"
              >
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">{statusFilter}</span>
                </div>
                <svg
                  className={`w-4 h-4 text-gray-500 transition-transform ${
                    showStatusDropdown ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {showStatusDropdown && (
                <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-xl z-10 overflow-hidden">
                  {statusOptions.map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setStatusFilter(status);
                        setShowStatusDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                        statusFilter === status
                          ? "bg-red-50 text-red-600 font-medium"
                          : "text-gray-700"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {donations.length === 0 ? (
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
            donations.map((request) => (
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
                        className={`px-3 py-1 rounded-full text-sm font-medium border capitalize ${
                          statusColors[request.status]
                        }`}
                      >
                        {request.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(request.donationDate)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {formatTime(request.donationTime)}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {request.upazila}
                      </span>
                    </div>

                    <p className="text-gray-700 line-clamp-2">
                      {request.requestMessage}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex lg:flex-col gap-2 shrink-0">
                    <button
                      onClick={() => navigate(`details/${request._id}`)}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                      <span className="lg:hidden">View</span>
                    </button>
                    <button
                      onClick={() => handleEdit(request._id)}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-all cursor-pointer"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                      <span className="lg:hidden">Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(request._id)}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-all cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="lg:hidden">Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Pagination */}
          {pagination && (
            <Pagination
              page={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={setPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MyRequests;
