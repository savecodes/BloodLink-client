import { useState } from "react";
import {
  Users,
  CreditCard,
  ArrowRight,
  Heart,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const RecentDonation = ({ donor, amount, date, image }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-linear-to-br from-red-500 to-pink-600 flex items-center justify-center overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={donor}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-white font-semibold text-sm">
              {donor?.charAt(0)?.toUpperCase() || "A"}
            </span>
          )}
        </div>
        <div>
          <p className="font-medium text-gray-900">{donor || "Anonymous"}</p>
          <p className="text-xs text-gray-500">{formatDate(date)}</p>
        </div>
      </div>
      <span className="font-bold text-green-600">${amount.toLocaleString()}</span>
    </div>
  );
};

const MakeDonations = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [error, setError] = useState("");

  // Fetch recent donations
  const { data: recentDonations = [], isLoading: isLoadingDonations } =
    useQuery({
      queryKey: ["funding"],
      queryFn: async () => {
        const res = await axiosSecure.get("/funding?limit=4");
        return res.data;
      },
    });

  // Payment mutation
  const { mutateAsync: processPayment, isPending } = useMutation({
    mutationFn: async (paymentInfo) => {
      const res = await axiosSecure.post(
        "/payment-checkout-session",
        paymentInfo,
      );
      return res.data;
    },
    onSuccess: (data) => {
      if (data.url) {
        window.location.href = data.url;
      }
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Payment initiation failed");
      setError("Failed to initiate payment. Please try again.");
    },
  });

  const quickAmounts = [10, 25, 50, 100];

  const handleDonate = async () => {
    setError("");
    const amount = selectedAmount || parseFloat(customAmount);

    if (!amount || amount <= 0) {
      setError("Please select or enter a valid amount");
      return;
    }

    if (amount < 1) {
      setError("Minimum donation amount is $1");
      return;
    }

    const paymentInfo = {
      name: user?.displayName || "Anonymous",
      email: user?.email,
      image: user?.photoURL || null,
      currency: "usd",
      amount,
      purpose: "Platform Funding",
    };

    await processPayment(paymentInfo);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-red-50/30 py-8 px-4 sm:px-6 lg:px-8">
      <div>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Funding
          </h1>
          <p className="text-gray-600">
            Support BloodLink's mission to save lives
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column - Donation Form */}
          <div className="space-y-6">
            {/* Make a Donation Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Make a Donation
                  </h2>
                  <p className="text-sm text-gray-600">
                    Your contribution helps us maintain the platform and support
                    blood donation campaigns
                  </p>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {/* Quick Select Amounts */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Quick Select
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {quickAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => {
                        setSelectedAmount(amount);
                        setCustomAmount(amount.toString());
                        setError("");
                      }}
                      disabled={isPending}
                      className={`h-12 rounded-xl font-semibold transition-all cursor-pointer ${
                        selectedAmount === amount
                          ? "bg-linear-to-r from-red-600 to-pink-600 text-white shadow-lg"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Amount */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Custom Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                    $
                  </span>
                  <input
                    type="text"
                    value={
                      customAmount ? Number(customAmount).toLocaleString() : ""
                    }
                    onChange={(e) => {
                      // remove commas for state
                      const value = e.target.value.replace(/,/g, "");
                      setCustomAmount(value);
                      setSelectedAmount(null);
                      setError("");
                    }}
                    placeholder="0.00"
                    min="1"
                    step="1"
                    disabled={isPending}
                    className="w-full h-12 pl-8 pr-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-200 focus:outline-none transition-all text-lg font-semibold disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Minimum donation: $1
                </p>
              </div>

              {/* Donate Button */}
              <button
                onClick={handleDonate}
                disabled={isPending}
                className="w-full h-14 bg-linear-to-r from-red-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Proceed to Payment
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <p className="text-center text-xs text-gray-500 mt-4">
                🔒 Secure payment powered by Stripe
              </p>
            </div>
          </div>

          {/* Right Column - Recent Donations */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Recent Donations
                </h2>
                <p className="text-sm text-gray-600">
                  Latest contributions to BloodLink
                </p>
              </div>
            </div>

            {/* Table Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-gray-200">
              <span className="text-sm font-semibold text-gray-600 uppercase">
                Donor
              </span>
              <span className="text-sm font-semibold text-gray-600 uppercase">
                Amount
              </span>
            </div>

            {/* Donations List */}
            {isLoadingDonations ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
              </div>
            ) : recentDonations.length > 0 ? (
              <div className="space-y-1 max-h-125 overflow-y-auto">
                {recentDonations.map((donation) => (
                  <RecentDonation
                    key={donation._id}
                    image={donation.image}
                    donor={donation.name}
                    amount={donation.amount}
                    date={donation.paidAt}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No donations yet</p>
                <p className="text-sm text-gray-400 mt-2">
                  Be the first to contribute!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakeDonations;
