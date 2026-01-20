import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useRef, useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import toast from "react-hot-toast";
import Pagination from "../../../components/Pagination/Pagination";

import {
  Search,
  MoreVertical,
  Shield,
  UserCheck,
  User,
  Ban,
  AlertCircle,
  Droplet,
  MapPin,
  Mail,
} from "lucide-react";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const usersPerPage = 6;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    if (openDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);

  const { data, isLoading } = useQuery({
    queryKey: ["users", currentPage, searchTerm],
    queryFn: async () => {
      const params = {
        page: currentPage,
        limit: usersPerPage,
        search: searchTerm,
      };
      const res = await axiosSecure.get("/users", { params });
      return res.data;
    },
    keepPreviousData: true,
  });

  const users = data?.data || [];
  const totalPages = data?.pagination?.totalPages || 1;

  // roleMutation for update user role
  const roleMutation = useMutation({
    mutationFn: ({ userId, role }) =>
      axiosSecure.patch(`/users/${userId}/role`, { role }),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setOpenDropdown(null);
      toast.success(`User role updated to ${variables.role}`);
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to update role");
      console.error(error);
    },
  });
  const handleRoleChange = async (userId, role) => {
    roleMutation.mutate({ userId, role });
  };

  // blockMutation for update user status
  const blockMutation = useMutation({
    mutationFn: (userId) =>
      axiosSecure.patch(`/users/${userId}/status`, { status: "blocked" }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setOpenDropdown(null);
      toast.success("User blocked successfully");
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to block user");
      console.error(error);
    },
  });

  const handleBlockUser = async (userId) => {
    blockMutation.mutate(userId);
  };

  // unblockMutation for update users status
  const unblockMutation = useMutation({
    mutationFn: (userId) =>
      axiosSecure.patch(`/users/${userId}/status`, { status: "active" }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setOpenDropdown(null);
      toast.success("User unblocked successfully");
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to unblock user");
      console.error(error);
    },
  });

  const handleUnblockUser = async (userId) => {
    unblockMutation.mutate(userId);
  };

  // Get user avatar with fallback
  const getPhotoURL = (photoURL) => {
    if (!photoURL || photoURL.trim() === "") {
      return null;
    }
    return photoURL;
  };

  const toggleDropdown = (userId) =>
    setOpenDropdown(openDropdown === userId ? null : userId);

  const roleColors = {
    admin: "bg-red-100 text-red-700 border-red-200",
    volunteer: "bg-blue-100 text-blue-700 border-blue-200",
    donor: "bg-green-100 text-green-700 border-green-200",
  };

  const statusColors = {
    active: "bg-green-100 text-green-700 border-green-200",
    blocked: "bg-red-100 text-red-700 border-red-200",
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-red-50/30 py-8 px-4 sm:px-6 lg:px-8">
      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 flex items-center gap-3">
              All Users
            </h1>
            <p className="text-gray-600 mt-2">
              Manage user roles and account status
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex-1 relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                autoComplete="off"
              />
            </div>
            <div className="text-sm text-gray-600 whitespace-nowrap">
              {data?.pagination?.total || 0} user(s)
            </div>
          </div>
        </div>

        {/* Users List */}
        <div className="space-y-4">
          {users.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No users found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search criteria
              </p>
            </div>
          ) : (
            users.map((user) => {
              const photoURL = getPhotoURL(user.photoURL);
              return (
                <div
                  key={user._id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* User Avatar & Blood Group */}
                    <div className="shrink-0 flex items-center gap-4">
                      {photoURL ? (
                        <img
                          src={photoURL}
                          alt={user.name}
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover shadow-lg"
                          onError={(e) => {
                            e.target.style.display = "none";
                            const fallback = document.createElement("div");
                            fallback.className =
                              "w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl sm:text-2xl shadow-lg";
                            fallback.textContent =
                              user.name?.charAt(0).toUpperCase() || "U";
                            e.target.parentNode.insertBefore(
                              fallback,
                              e.target,
                            );
                          }}
                        />
                      ) : (
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl sm:text-2xl shadow-lg">
                          {user.name?.charAt(0).toUpperCase() || "U"}
                        </div>
                      )}

                      {/* Blood Group Badge */}
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-linear-to-br from-red-500 to-pink-600 flex items-center justify-center text-white font-bold text-xl sm:text-2xl shadow-lg">
                        {user.bloodGroup}
                      </div>
                    </div>

                    {/* User Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {user.name}
                          </h3>
                          <p className="text-gray-600 flex items-center gap-1 mt-1">
                            <Mail className="w-4 h-4" />
                            {user.email}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium border capitalize ${
                              roleColors[user.role]
                            }`}
                          >
                            {user.role}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium border capitalize ${
                              statusColors[user.status]
                            }`}
                          >
                            {user.status}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {user.district}
                        </span>
                        <span className="flex items-center gap-1">
                          <Droplet className="w-4 h-4" />
                          Blood Group: {user.bloodGroup}
                        </span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="shrink-0">
                      <div
                        className="relative"
                        ref={openDropdown === user._id ? dropdownRef : null}
                      >
                        <button
                          onClick={() => toggleDropdown(user._id)}
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all cursor-pointer"
                        >
                          <MoreVertical className="w-5 h-5" />
                          <span>Actions</span>
                        </button>

                        {openDropdown === user._id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
                            {["admin", "volunteer", "donor"].map(
                              (role) =>
                                role !== user.role && (
                                  <button
                                    key={role}
                                    onClick={() =>
                                      handleRoleChange(user._id, role)
                                    }
                                    className="w-full flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors first:rounded-t-xl"
                                  >
                                    {role === "admin" && <Shield size={16} />}
                                    {role === "volunteer" && (
                                      <UserCheck size={16} />
                                    )}
                                    {role === "donor" && <User size={16} />}
                                    Make{" "}
                                    {role.charAt(0).toUpperCase() +
                                      role.slice(1)}
                                  </button>
                                ),
                            )}
                            <div className="border-t border-gray-200" />
                            {user.status !== "blocked" ? (
                              <button
                                onClick={() => handleBlockUser(user._id)}
                                className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors rounded-b-xl"
                              >
                                <Ban size={16} /> Block User
                              </button>
                            ) : (
                              <button
                                onClick={() => handleUnblockUser(user._id)}
                                className="w-full flex items-center gap-2 px-4 py-3 text-sm text-green-600 hover:bg-green-50 transition-colors rounded-b-xl"
                              >
                                <UserCheck size={16} /> Unblock User
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
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

export default AllUsers;