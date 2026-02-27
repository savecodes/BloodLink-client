import { Shield, Eye, Database, Share2, Lock, RefreshCw, Mail, ChevronRight } from "lucide-react";
import { Link } from "react-router";



const sections = [
  {
    icon: <Database className="w-5 h-5" />,
    title: "Information We Collect",
    content: [
      {
        subtitle: "Personal Information",
        text: "When you register as a blood donor, we collect your full name, email address, phone number, blood group, district, and upazila. This information is essential to connect donors with recipients effectively.",
      },
      {
        subtitle: "Profile Photo",
        text: "You may optionally upload a profile photo. Images are securely stored via ImgBB and linked to your account for identification purposes.",
      },
      {
        subtitle: "Usage Data",
        text: "We may collect non-personally identifiable information such as browser type, device type, and pages visited to improve our platform experience.",
      },
    ],
  },
  {
    icon: <Eye className="w-5 h-5" />,
    title: "How We Use Your Information",
    content: [
      {
        subtitle: "Donor Matching",
        text: "Your blood group and location details are used to match you with donation requests in your area. This is the core purpose of our platform.",
      },
      {
        subtitle: "Communication",
        text: "We use your email and phone number to notify you of nearby donation requests, important platform updates, and account-related communications.",
      },
      {
        subtitle: "Platform Improvement",
        text: "Aggregated and anonymized usage data helps us understand how our platform is used and where we can improve the experience for donors and recipients.",
      },
    ],
  },
  {
    icon: <Share2 className="w-5 h-5" />,
    title: "Information Sharing",
    content: [
      {
        subtitle: "With Recipients",
        text: "When a donation request matches your profile, your name, blood group, and general location (district/upazila) may be visible to the requesting party. Your phone number is only shared upon mutual consent.",
      },
      {
        subtitle: "We Never Sell Your Data",
        text: "We do not sell, trade, or rent your personal information to third parties for marketing or commercial purposes under any circumstance.",
      },
      {
        subtitle: "Legal Requirements",
        text: "We may disclose information if required by law or to protect the rights, safety, and property of our users or the public.",
      },
    ],
  },
  {
    icon: <Lock className="w-5 h-5" />,
    title: "Data Security",
    content: [
      {
        subtitle: "Authentication",
        text: "Your account is secured via Firebase Authentication. We do not store raw passwords — all credentials are encrypted and managed by industry-standard security protocols.",
      },
      {
        subtitle: "Data Transmission",
        text: "All data transmitted between your device and our servers is encrypted using HTTPS/TLS to prevent unauthorized interception.",
      },
      {
        subtitle: "Access Controls",
        text: "Only authorized platform administrators can access user data, and only when necessary for platform operations or user support.",
      },
    ],
  },
  {
    icon: <RefreshCw className="w-5 h-5" />,
    title: "Your Rights & Choices",
    content: [
      {
        subtitle: "Access & Update",
        text: "You can view and update your personal information at any time through your profile settings page.",
      },
      {
        subtitle: "Account Deletion",
        text: "You may request deletion of your account and all associated data by contacting us. We will process requests within 30 days.",
      },
      {
        subtitle: "Opt-out",
        text: "You may opt out of non-essential communications at any time. Note that essential account and safety notifications cannot be disabled.",
      },
    ],
  },
];

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-11/12 mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-red-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-800 font-medium">Privacy Policy</span>
        </nav>

        {/* Hero Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="h-2 bg-linear-to-r from-red-400 via-pink-400 to-purple-400" />
          <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-red-50 border-2 border-red-100 flex items-center justify-center shrink-0">
              <Shield className="w-7 h-7 text-red-600" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Privacy Policy
              </h1>
              <p className="text-gray-500 mt-1 text-sm">
                Last updated:{" "}
                <span className="font-medium text-gray-700">
                  January 1, 2026
                </span>
              </p>
            </div>
          </div>
          <div className="px-6 sm:px-8 pb-6 sm:pb-8">
            <p className="text-gray-600 leading-relaxed">
              At <span className="font-semibold text-red-600">BloodBridge</span>
              , we are committed to protecting your privacy. This policy
              explains what personal information we collect, how we use it, and
              the choices you have. By using our platform, you agree to the
              practices described below.
            </p>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-4">
          {sections.map((section, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              {/* Section Header */}
              <div className="flex items-center gap-3 px-6 sm:px-8 py-5 border-b border-gray-100">
                <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-600 shrink-0">
                  {section.icon}
                </div>
                <h2 className="text-lg font-bold text-gray-900">
                  {section.title}
                </h2>
              </div>

              {/* Section Content */}
              <div className="px-6 sm:px-8 py-6 space-y-5">
                {section.content.map((item, j) => (
                  <div key={j} className="flex gap-4">
                    <div className="w-1.5 rounded-full bg-linear-to-b from-red-400 to-pink-400 shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-800 mb-1">
                        {item.subtitle}
                      </p>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Card */}
        <div className="mt-6 bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="h-1 bg-linear-to-r from-red-400 via-pink-400 to-purple-400" />
          <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-red-50 border-2 border-red-100 flex items-center justify-center shrink-0">
              <Mail className="w-7 h-7 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900">
                Questions about Privacy?
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                If you have any questions or concerns about this Privacy Policy,
                please contact us at{" "}
                <a
                  href="mailto:support@bloodlink.com"
                  className="text-red-600 font-semibold hover:text-red-700 transition-colors"
                >
                  support@bloodlink.com
                </a>
              </p>
            </div>
            <Link
              to="/contact"
              className="shrink-0 flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-red-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all text-sm cursor-pointer"
            >
              Contact Us <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-gray-400 mt-6">
          This Privacy Policy is effective as of January 1, 2026 and will remain
          in effect until superseded by a revised version.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
