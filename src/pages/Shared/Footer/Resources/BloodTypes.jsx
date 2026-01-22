import {
  Users,
  AlertCircle,
  CheckCircle,
  XCircle,
  ArrowRight,
  Heart,
  Shield,
  Activity,
  HeartPulse,
} from "lucide-react";
import { Link } from "react-router";
import useAuth from "../../../../hooks/useAuth";

const BloodTypes = () => {
  const { user } = useAuth();

  const bloodTypes = [
    {
      type: "A+",
      percentage: "35.7%",
      color: "from-red-500 to-pink-600",
      bgColor: "from-red-50 to-pink-50",
      borderColor: "border-red-200",
      canGiveTo: ["A+", "AB+"],
      canReceiveFrom: ["A+", "A-", "O+", "O-"],
      description: "Most common blood type in many populations",
    },
    {
      type: "A-",
      percentage: "6.3%",
      color: "from-orange-500 to-red-600",
      bgColor: "from-orange-50 to-red-50",
      borderColor: "border-orange-200",
      canGiveTo: ["A+", "A-", "AB+", "AB-"],
      canReceiveFrom: ["A-", "O-"],
      description: "Rare blood type, highly needed for donations",
    },
    {
      type: "B+",
      percentage: "8.5%",
      color: "from-blue-500 to-cyan-600",
      bgColor: "from-blue-50 to-cyan-50",
      borderColor: "border-blue-200",
      canGiveTo: ["B+", "AB+"],
      canReceiveFrom: ["B+", "B-", "O+", "O-"],
      description: "Important for emergency transfusions",
    },
    {
      type: "B-",
      percentage: "1.5%",
      color: "from-indigo-500 to-blue-600",
      bgColor: "from-indigo-50 to-blue-50",
      borderColor: "border-indigo-200",
      canGiveTo: ["B+", "B-", "AB+", "AB-"],
      canReceiveFrom: ["B-", "O-"],
      description: "One of the rarest blood types",
    },
    {
      type: "AB+",
      percentage: "3.4%",
      color: "from-purple-500 to-pink-600",
      bgColor: "from-purple-50 to-pink-50",
      borderColor: "border-purple-200",
      canGiveTo: ["AB+"],
      canReceiveFrom: ["All Blood Types"],
      description: "Universal recipient - can receive any blood type",
      isUniversalReceiver: true,
    },
    {
      type: "AB-",
      percentage: "0.6%",
      color: "from-violet-500 to-purple-600",
      bgColor: "from-violet-50 to-purple-50",
      borderColor: "border-violet-200",
      canGiveTo: ["AB+", "AB-"],
      canReceiveFrom: ["AB-", "A-", "B-", "O-"],
      description: "Rarest blood type, critical for specific patients",
    },
    {
      type: "O+",
      percentage: "37.4%",
      color: "from-green-500 to-emerald-600",
      bgColor: "from-green-50 to-emerald-50",
      borderColor: "border-green-200",
      canGiveTo: ["O+", "A+", "B+", "AB+"],
      canReceiveFrom: ["O+", "O-"],
      description: "Most common blood type worldwide",
    },
    {
      type: "O-",
      percentage: "6.6%",
      color: "from-teal-500 to-green-600",
      bgColor: "from-teal-50 to-green-50",
      borderColor: "border-teal-200",
      canGiveTo: ["All Blood Types"],
      canReceiveFrom: ["O-"],
      description: "Universal donor - can donate to anyone",
      isUniversalDonor: true,
    },
  ];

  const keyFacts = [
    {
      icon: Users,
      title: "8 Blood Types",
      description: "A+, A-, B+, B-, AB+, AB-, O+, O-",
      color: "blue",
    },
    {
      icon: Shield,
      title: "Universal Donor",
      description: "O- can donate to all blood types",
      color: "green",
    },
    {
      icon: Heart,
      title: "Universal Receiver",
      description: "AB+ can receive from all blood types",
      color: "purple",
    },
    {
      icon: Activity,
      title: "Compatibility",
      description: "Blood type matching is crucial",
      color: "red",
    },
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
            Understanding Blood Types
          </h1>
          <p className="text-base sm:text-lg text-red-50 max-w-2xl mx-auto">
            Learn about different blood types, compatibility, and why knowing
            your blood type matters for donation.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Key Facts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {keyFacts.map((fact, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 text-center border border-gray-100 cursor-pointer"
            >
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 ${
                  fact.color === "blue"
                    ? "bg-blue-100"
                    : fact.color === "green"
                      ? "bg-green-100"
                      : fact.color === "purple"
                        ? "bg-purple-100"
                        : "bg-red-100"
                }`}
              >
                <fact.icon
                  className={`w-7 h-7 ${
                    fact.color === "blue"
                      ? "text-blue-600"
                      : fact.color === "green"
                        ? "text-green-600"
                        : fact.color === "purple"
                          ? "text-purple-600"
                          : "text-red-600"
                  }`}
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {fact.title}
              </h3>
              <p className="text-sm text-gray-600">{fact.description}</p>
            </div>
          ))}
        </div>

        {/* Blood Types Grid */}
        <div>
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              All Blood Types
            </h2>
            <p className="text-gray-600">
              Explore each blood type and their compatibility
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bloodTypes.map((blood, i) => (
              <div
                key={i}
                className={`bg-linear-to-br ${blood.bgColor} rounded-2xl shadow-lg border-2 ${blood.borderColor} p-6 hover:shadow-xl transition-all duration-300 cursor-pointer`}
              >
                {/* Blood Type Badge */}
                <div className="text-center mb-4">
                  <div
                    className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-linear-to-br ${blood.color} shadow-lg mb-3`}
                  >
                    <span className="text-3xl font-bold text-white">
                      {blood.type}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-2xl font-bold text-gray-900">
                      {blood.percentage}
                    </span>
                    {blood.isUniversalDonor && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                        Universal Donor
                      </span>
                    )}
                    {blood.isUniversalReceiver && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                        Universal Receiver
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-700 text-center mb-4 min-h-10">
                  {blood.description}
                </p>

                {/* Compatibility */}
                <div className="space-y-3">
                  {/* Can Give To */}
                  <div className="bg-white rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <h4 className="text-xs font-semibold text-gray-700">
                        Can Give To:
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {blood.canGiveTo.map((type, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Can Receive From */}
                  <div className="bg-white rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <XCircle className="w-4 h-4 text-blue-600" />
                      <h4 className="text-xs font-semibold text-gray-700">
                        Can Receive From:
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {blood.canReceiveFrom.map((type, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why It Matters Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8 cursor-pointer">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-red-500 to-pink-600 flex items-center justify-center shadow-md">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Why Blood Type Matters
              </h2>
              <p className="text-sm text-gray-600">
                Understanding compatibility saves lives
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-linear-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 cursor-pointer">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Emergency Situations
                  </h3>
                  <p className="text-sm text-gray-700">
                    Knowing your blood type can speed up treatment in
                    emergencies when every second counts.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-linear-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100 cursor-pointer">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Safe Transfusions
                  </h3>
                  <p className="text-sm text-gray-700">
                    Matching blood types prevents dangerous immune reactions
                    during blood transfusions.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-linear-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100 cursor-pointer">
                <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Pregnancy Planning
                  </h3>
                  <p className="text-sm text-gray-700">
                    Blood type knowledge is crucial for managing Rh factor
                    compatibility during pregnancy.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-linear-to-r from-orange-50 to-red-50 rounded-xl border border-orange-100 cursor-pointer">
                <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Organ Transplants
                  </h3>
                  <p className="text-sm text-gray-700">
                    Blood type compatibility is essential for successful organ
                    and tissue transplants.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
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
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 animate-pulse">
              <HeartPulse className="w-10 h-10 text-white" />
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              {user
                ? "Find Compatible Blood Requests"
                : "Join Our Donor Community"}
            </h2>
            <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto mb-8">
              {user
                ? "Browse blood donation requests that match your blood type and help save lives today."
                : "Register as a donor and be part of a life-saving community. Your blood type could be exactly what someone needs."}
            </p>

            {/* Dynamic Buttons */}
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

export default BloodTypes;
