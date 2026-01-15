import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  Hospital,
  User,
  Mail,
  Heart,
  MessageSquare,
} from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import ErrorPage from "../../../components/ErrorPage/ErrorPage";

const statusStyle = {
  pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  "in progress": "bg-blue-100 text-blue-700 border-blue-200",
  completed: "bg-green-100 text-green-700 border-green-200",
  cancelled: "bg-red-100 text-red-700 border-red-200",
};

const DonationRequestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const {
    data: request,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["donation-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorPage />;

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white px-4 sm:px-6 py-6 sm:py-8 md:py-12">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 sm:mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium text-sm sm:text-base">Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* LEFT: Request Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-5 sm:p-6 md:p-8 border border-gray-100 space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                    Blood Donation Request
                  </h1>
                  <span
                    className={`inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium border capitalize ${
                      statusStyle[request.status]
                    }`}
                  >
                    {request.status}
                  </span>
                </div>

                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-linear-to-br from-red-500 to-red-600 text-white font-bold flex items-center justify-center text-xl sm:text-2xl shadow-lg shrink-0">
                  {request.bloodGroup}
                </div>
              </div>

              {/* Recipient Information */}
              <Section title="Recipient Information" icon={User}>
                <InfoGrid>
                  <Info label="Recipient Name" value={request.recipientName} />
                  <Info
                    label="Blood Group Required"
                    value={request.bloodGroup}
                  />
                </InfoGrid>
              </Section>

              {/* Location Card */}
              <Section title="Location Details" icon={MapPin}>
                <div className="space-y-3 sm:space-y-4">
                  <Item icon={Hospital} text={request.hospitalName} />
                  <Item
                    icon={MapPin}
                    text={`${request.fullAddress}, ${request.upazila}`}
                  />
                </div>
              </Section>

              {/* Schedule Card */}
              <Section title="Schedule" icon={Calendar}>
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="flex items-center gap-3 bg-gray-50 p-3 sm:p-4 rounded-xl">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center shrink-0">
                      <Calendar className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Date</p>
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">
                        {new Date(request.donationDate).toDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-50 p-3 sm:p-4 rounded-xl">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Time</p>
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">
                        {request.donationTime}
                      </p>
                    </div>
                  </div>
                </div>
              </Section>

              {/* Message Card */}
              <Section title="Request Message" icon={MessageSquare}>
                <div className="bg-linear-to-br from-gray-50 to-gray-100 p-4 sm:p-5 rounded-xl border border-gray-200">
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                    {request.requestMessage}
                  </p>
                </div>
              </Section>
            </div>
          </div>

          {/* RIGHT: Requester Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-5 sm:p-6 md:p-8 border border-gray-100 sticky top-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                  Requester
                </h3>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                  <User className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Name</p>
                    <p className="font-medium text-gray-900 text-sm sm:text-base">
                      {request.requesterName}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                  <Mail className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Email</p>
                    <p className="font-medium text-gray-900 break-all text-sm sm:text-base">
                      {request.requesterEmail}
                    </p>
                  </div>
                </div>
              </div>

              <button className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-red-600 to-red-700 text-white py-3 sm:py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 text-sm sm:text-base cursor-pointer">
                <Heart className="w-5 h-5" />
                Donate Blood
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationRequestDetails;

/* ---------- Small UI Helpers ---------- */

const Section = ({ title, icon: Icon, children }) => (
  <div>
    <div className="flex items-center gap-2 mb-4 sm:mb-5">
      {Icon && (
        <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
          <Icon className="w-4 h-4 text-red-600" />
        </div>
      )}
      <h3 className="font-bold text-gray-900 text-base sm:text-lg">{title}</h3>
    </div>
    {children}
  </div>
);

const InfoGrid = ({ children }) => (
  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">{children}</div>
);

const Info = ({ label, value }) => (
  <div className="bg-gray-50 p-3 sm:p-4 rounded-xl">
    <p className="text-xs sm:text-sm text-gray-500 mb-1">{label}</p>
    <p className="font-semibold text-gray-900 text-sm sm:text-base">{value}</p>
  </div>
);

const Item = ({ icon: Icon, text }) => (
  <div className="flex items-start gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl">
    {Icon && (
      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shrink-0 shadow-sm">
        <Icon className="w-5 h-5 text-red-600" />
      </div>
    )}
    <span className="text-gray-700 font-medium text-sm sm:text-base leading-relaxed">
      {text}
    </span>
  </div>
);
