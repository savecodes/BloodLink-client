import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { Droplet, MapPin, Calendar, Clock, Eye, MessageSquare } from "lucide-react";

const DonationsRequests = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: donations = [], isLoading } = useQuery({
    queryKey: ["pending-donations"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations?status=pending`);
      return res.data;
    },
  });

  const { data: districts = [] } = useQuery({
    queryKey: ["districts"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/districts`);
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const handleView = (id) => {
    if (!user) {
      navigate("/login", { state: { from: `/donations/${id}` } });
    } else {
      navigate(`/dashboard/my-donation-requests/details/${id}`);
    }
  };

  const getDistrictName = (districtId) => {
    const district = districts.find((d) => d.id === districtId);
    return district ? district.name : districtId;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-8 sm:py-12 md:py-16">
      <div className="max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Donation Requests
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Browse pending blood donation requests and help save lives. Your
            donation can make a difference.
          </p>
        </div>
        <p className="mb-4 text-sm text-gray-500">
          {donations.length} pending requests
        </p>

        {/* Empty State */}
        {donations.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full mb-4 sm:mb-6">
              <Droplet size={40} className="text-gray-400" />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3">
              No Pending Requests
            </h3>
            <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto px-4">
              There are no pending donation requests at the moment. Check back
              later.
            </p>
          </div>
        )}

        {/* Donation Cards Grid */}
        {donations.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {donations.map((donation) => (
              <div
                key={donation._id}
                className="bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                {/* Card Content */}
                <div className="p-5 sm:p-6">
                  {/* Header with Blood Group and Status */}
                  <div className="flex items-start justify-between mb-4 sm:mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-red-50 rounded-xl flex items-center justify-center">
                        <span className="text-lg sm:text-xl font-bold text-red-600">
                          {donation.bloodGroup}
                        </span>
                      </div>
                      <div>
                        <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
                          {donation.recipientName}
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-500">
                          Needs {donation.bloodGroup} blood
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] sm:text-xs px-2 sm:px-2.5 py-1 rounded-full bg-yellow-100 text-yellow-700 font-medium whitespace-nowrap">
                      urgent
                    </span>
                  </div>

                  {/* Hospital */}
                  <div className="flex items-start gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-sm sm:text-base text-gray-700 leading-snug">
                      {donation.hospitalName}
                    </p>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-2 mb-3">
                    <Droplet className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-sm sm:text-base text-gray-700">
                      {donation.upazila}, {getDistrictName(donation.district)}
                    </p>
                  </div>

                  {/* Date */}
                  <div className="flex items-start gap-2 mb-5 sm:mb-6">
                    <Calendar className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-sm sm:text-base text-gray-700">
                      Required by: {formatDate(donation.donationDate)}
                    </p>
                  </div>

                  <div className="flex items-start gap-2 mb-5 sm:mb-6">
                    <MessageSquare className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-sm sm:text-base text-gray-700">
                      Description: {donation.requestMessage}
                    </p>
                  </div>

                  {/* Footer with Posted Date and View Button */}
                  <div className="flex items-center justify-between pt-4 sm:pt-5 border-t border-gray-100">
                    <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500">
                      <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span>Posted: {formatDate(donation.createdAt)}</span>
                    </div>
                    <button
                      onClick={() => handleView(donation._id)}
                      className="bg-red-600 hover:bg-red-700 text-white py-2 sm:py-2.5 px-4 sm:px-6 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 text-sm sm:text-base cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationsRequests;
