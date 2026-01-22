import {
  HeartPulse,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Droplet,
  ShieldCheck,
  Activity,
  Users,
  FileText,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router";
import useAuth from "../../../../hooks/useAuth";

const DonorGuidelines = () => {
  const { user } = useAuth();

  const eligibilityCriteria = [
    "Age between 18–65 years",
    "Minimum weight 50 kg",
    "Physically and mentally healthy",
    "Normal blood pressure & temperature",
    "Acceptable hemoglobin level",
  ];

  const beforeDonation = [
    "Sleep at least 7 hours",
    "Eat a light meal 2–3 hours before",
    "Drink sufficient water",
    "Avoid oily or fatty food",
    "Carry valid ID",
  ];

  const afterDonation = [
    "Rest for 10–15 minutes",
    "Drink fluids for next 24 hours",
    "Avoid heavy work or exercise",
    "Keep bandage for at least 4 hours",
    "Seek help if dizziness occurs",
  ];

  const cannotDonate = [
    "Cold, fever, or infection",
    "Pregnant or breastfeeding",
    "Blood donated within last 3 months",
    "Recent surgery or serious illness",
    "Hepatitis B, C or HIV",
    "Recent tattoo or piercing",
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-red-50/30">
      {/* Header Section */}
      <section className="bg-linear-to-r from-red-600 to-pink-600 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-11/12 mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 animate-pulse">
            <HeartPulse className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Blood Donation Guidelines
          </h1>
          <p className="text-base sm:text-lg text-red-50 max-w-2xl mx-auto">
            Please read carefully to ensure a safe and successful blood donation
            experience.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            {
              icon: Clock,
              label: "Donation Time",
              value: "10–15 min",
              color: "blue",
            },
            {
              icon: Droplet,
              label: "Blood Collected",
              value: "450 ml",
              color: "red",
            },
            {
              icon: Users,
              label: "Lives Saved",
              value: "Up to 3",
              color: "green",
            },
            {
              icon: Activity,
              label: "Recovery",
              value: "24 hours",
              color: "purple",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-5 sm:p-6 text-center border border-gray-100 cursor-pointer"
            >
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mx-auto mb-3 ${
                  item.color === "blue"
                    ? "bg-blue-100"
                    : item.color === "red"
                      ? "bg-red-100"
                      : item.color === "green"
                        ? "bg-green-100"
                        : "bg-purple-100"
                }`}
              >
                <item.icon
                  className={`w-6 h-6 sm:w-7 sm:h-7 ${
                    item.color === "blue"
                      ? "text-blue-600"
                      : item.color === "red"
                        ? "text-red-600"
                        : item.color === "green"
                          ? "text-green-600"
                          : "text-purple-600"
                  }`}
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                {item.value}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Eligibility Sections - Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Who Can Donate */}
          <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg border-2 border-green-200 p-6 sm:p-8 hover:shadow-xl transition-all duration-300 cursor-pointer">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                <ShieldCheck className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Who Can Donate
                </h2>
                <p className="text-sm text-gray-600">
                  Eligibility criteria for donors
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {eligibilityCriteria.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 bg-white rounded-xl hover:shadow-md transition-all duration-200 cursor-pointer"
                >
                  <div className="shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-gray-700 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Who Cannot Donate */}
          <div className="bg-linear-to-br from-red-50 to-pink-50 rounded-2xl shadow-lg border-2 border-red-200 p-6 sm:p-8 hover:shadow-xl transition-all duration-300 cursor-pointer">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-red-500 to-pink-600 flex items-center justify-center shadow-lg">
                <XCircle className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Who Cannot Donate
                </h2>
                <p className="text-sm text-gray-600">
                  Temporary or permanent restrictions
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {cannotDonate.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 bg-white rounded-xl hover:shadow-md transition-all duration-200"
                >
                  <div className="shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                    <XCircle className="w-4 h-4 text-red-600" />
                  </div>
                  <p className="text-gray-700 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Process Timeline - Before and After */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8 cursor-pointer">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Donation Process
            </h2>
            <p className="text-gray-600">
              Follow these steps for a safe donation experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Before Donation */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-md">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Before Donation
                  </h3>
                  <p className="text-sm text-gray-600">Preparation steps</p>
                </div>
              </div>
              <div className="space-y-4">
                {beforeDonation.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 rounded-xl bg-linear-to-r from-blue-50 to-cyan-50 border border-blue-100 hover:shadow-md transition-all duration-200 cursor-pointer"
                  >
                    <div className="shrink-0 w-8 h-8 rounded-lg bg-linear-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                      {i + 1}
                    </div>
                    <p className="text-gray-700 leading-relaxed pt-1">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* After Donation */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-md">
                  <HeartPulse className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    After Donation
                  </h3>
                  <p className="text-sm text-gray-600">Recovery guidelines</p>
                </div>
              </div>
              <div className="space-y-4">
                {afterDonation.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 rounded-xl bg-linear-to-r from-purple-50 to-pink-50 border border-purple-100 hover:shadow-md transition-all duration-200 cursor-pointer"
                  >
                    <div className="shrink-0 w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mt-0.5">
                      <CheckCircle className="w-4 h-4 text-purple-600" />
                    </div>
                    <p className="text-gray-700 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-linear-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer">
          <div className="flex gap-4">
            <div className="shrink-0">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Important Reminders
              </h3>
              <div className="text-sm sm:text-base text-gray-700 space-y-2">
                <p className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>
                    Always consult medical staff if you're unsure about your
                    eligibility
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>Provide accurate and complete health information</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>
                    Contact support immediately if you feel unwell after
                    donation
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action - Dynamic based on user */}
        <div className="relative overflow-hidden rounded-2xl shadow-xl">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-linear-to-r from-red-600 to-pink-600"></div>

          {/* Pattern Overlay */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle, white 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            ></div>
          </div>

          {/* Content */}
          <div className="relative z-10 p-8 sm:p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 backdrop-blur-sm mb-6 animate-pulse">
              <HeartPulse className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              {user ? "Ready to Help Someone?" : "Become a Blood Donor Today"}
            </h2>
            <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto mb-8">
              {user
                ? "Check out current blood requests in your area and make a difference."
                : "A simple act of kindness can save lives. Register now and join our community of life-savers."}
            </p>

            {/* Dynamic Buttons based on user login status */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {user ? (
                <>
                  <Link
                    to="/donations-requests"
                    className="group flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-red-600 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl w-full sm:w-auto"
                  >
                    View Blood Requests
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/dashboard/create-donation-request"
                    className="group flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 text-white font-semibold backdrop-blur-sm border-2 border-white/40 transition-all duration-300 hover:bg-white/20 hover:scale-105 w-full sm:w-auto"
                  >
                    Create Request
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="group flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-red-600 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl w-full sm:w-auto"
                  >
                    Register as Donor
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/donations-requests"
                    className="group flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 text-white font-semibold backdrop-blur-sm border-2 border-white/40 transition-all duration-300 hover:bg-white/20 hover:scale-105 w-full sm:w-auto"
                  >
                    View Requests
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DonorGuidelines;
