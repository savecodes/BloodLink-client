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
} from "lucide-react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import ErrorPage from "../../../../components/ErrorPage/ErrorPage";

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

  const { data: request, isLoading, error } = useQuery({
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
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-11/12 mx-auto">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT: Request Details */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Blood Donation Request
                </h1>
                <span
                  className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium border capitalize ${
                    statusStyle[request.status]
                  }`}
                >
                  {request.status}
                </span>
              </div>

              <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 font-bold flex items-center justify-center text-xl">
                {request.bloodGroup}
              </div>
            </div>

            {/* Recipient */}
            <Section title="Recipient Information">
              <Info label="Recipient Name" value={request.recipientName} />
              <Info label="Blood Group" value={request.bloodGroup} />
            </Section>

            {/* Location */}
            <Section title="Location Details">
              <Item icon={Hospital} text={request.hospitalName} />
              <Item
                icon={MapPin}
                text={`${request.fullAddress}, ${request.upazila}`}
              />
            </Section>

            {/* Schedule */}
            <Section title="Schedule">
              <Item
                icon={Calendar}
                text={new Date(request.donationDate).toDateString()}
              />
              <Item icon={Clock} text={request.donationTime} />
            </Section>

            {/* Message */}
            <Section title="Message">
              <p className="bg-gray-50 p-4 rounded-xl text-gray-700">
                {request.requestMessage}
              </p>
            </Section>
          </div>

          {/* RIGHT: Requester */}
          <div className="bg-white rounded-2xl p-6 border h-fit">
            <h3 className="text-lg font-semibold mb-4">Requester</h3>

            <div className="space-y-3 text-gray-700">
              <Item icon={User} text={request.requesterName} />
              <Item icon={Mail} text={request.requesterEmail} />
            </div>

            <button
              className="mt-6 w-full flex items-center justify-center gap-2 bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition cursor-pointer"
            >
              <Heart className="w-5 h-5" />
              Donate Blood
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationRequestDetails;

/* ---------- Small UI Helpers ---------- */

const Section = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="font-semibold text-gray-800 mb-3">{title}</h3>
    <div className="space-y-2">{children}</div>
  </div>
);

const Info = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

const Item = ({ icon, text }) => (
  <div className="flex items-center gap-2">
    {icon && <icon className="w-4 h-4 text-gray-500" />}
    <span>{text}</span>
  </div>
);

