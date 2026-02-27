import {
  FileText,
  UserCheck,
  ShieldAlert,
  Ban,
  Scale,
  RefreshCw,
  Mail,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router";

const sections = [
  {
    icon: <UserCheck className="w-5 h-5" />,
    title: "Eligibility & Account Registration",
    content: [
      {
        subtitle: "Age Requirement",
        text: "You must be at least 18 years of age to register and use BloodBridge as a donor or platform participant. By creating an account, you confirm that you meet this requirement.",
      },
      {
        subtitle: "Accurate Information",
        text: "You agree to provide truthful, accurate, and complete information during registration and to keep your profile up to date. Providing false medical or personal information is strictly prohibited and may result in account termination.",
      },
      {
        subtitle: "Account Security",
        text: "You are responsible for maintaining the confidentiality of your account credentials. You must notify us immediately if you become aware of any unauthorized access to your account.",
      },
    ],
  },
  {
    icon: <ShieldAlert className="w-5 h-5" />,
    title: "Platform Use & Donor Responsibilities",
    content: [
      {
        subtitle: "Voluntary Participation",
        text: "All blood donation activities facilitated through BloodBridge are entirely voluntary. The platform serves as a connection medium only and does not conduct, supervise, or administer any medical procedures.",
      },
      {
        subtitle: "Medical Eligibility",
        text: "It is your sole responsibility to ensure you are medically eligible to donate blood before confirming any donation request. We strongly recommend following guidelines set by recognized health authorities.",
      },
      {
        subtitle: "Honoring Commitments",
        text: "When you accept a donation request, you commit to following through. Repeatedly confirming and canceling without valid reason may result in account suspension.",
      },
    ],
  },
  {
    icon: <Ban className="w-5 h-5" />,
    title: "Prohibited Activities",
    content: [
      {
        subtitle: "Misuse of the Platform",
        text: "You may not use BloodBridge for any commercial solicitation, spam, harassment, or purposes unrelated to blood donation. Any attempt to exploit the platform for personal or financial gain is prohibited.",
      },
      {
        subtitle: "False Requests",
        text: "Creating fraudulent emergency blood requests, impersonating others, or submitting false information to manipulate donation matches is strictly forbidden and may result in immediate account termination and legal action.",
      },
      {
        subtitle: "Harmful Conduct",
        text: "You may not post abusive, discriminatory, or harmful content on the platform. BloodBridge reserves the right to remove any content that violates community standards without prior notice.",
      },
    ],
  },
  {
    icon: <Scale className="w-5 h-5" />,
    title: "Disclaimers & Limitation of Liability",
    content: [
      {
        subtitle: "No Medical Advice",
        text: "BloodBridge is an information and connection platform only. Nothing on this platform constitutes medical advice. Always consult a qualified healthcare professional regarding your eligibility to donate blood.",
      },
      {
        subtitle: "Platform Availability",
        text: "We strive for high availability but do not guarantee uninterrupted access to the platform. We are not liable for any losses resulting from service interruptions, data loss, or technical failures.",
      },
      {
        subtitle: "Third-Party Actions",
        text: "BloodBridge is not responsible for the actions of donors, recipients, or any third parties connected through our platform. All interactions between users are at their own risk.",
      },
    ],
  },
  {
    icon: <RefreshCw className="w-5 h-5" />,
    title: "Changes & Termination",
    content: [
      {
        subtitle: "Updates to Terms",
        text: "We reserve the right to modify these Terms & Conditions at any time. Changes will be posted on this page with an updated effective date. Continued use of the platform after changes constitutes acceptance of the revised terms.",
      },
      {
        subtitle: "Account Termination",
        text: "We reserve the right to suspend or terminate accounts that violate these terms, engage in fraudulent activity, or harm other users — without prior notice if the situation warrants immediate action.",
      },
      {
        subtitle: "Governing Law",
        text: "These terms are governed by the laws of Bangladesh. Any disputes arising out of or related to these terms shall be resolved in the courts of Bangladesh.",
      },
    ],
  },
];

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-11/12 mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-red-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-800 font-medium">Terms & Conditions</span>
        </nav>

        {/* Hero Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="h-2 bg-linear-to-r from-red-400 via-pink-400 to-purple-400" />
          <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-red-50 border-2 border-red-100 flex items-center justify-center shrink-0">
              <FileText className="w-7 h-7 text-red-600" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Terms & Conditions
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
              Welcome to{" "}
              <span className="font-semibold text-red-600">BloodBridge</span>.
              By accessing or using our platform, you agree to be bound by these
              Terms & Conditions. Please read them carefully before registering
              or using any feature of our service.
            </p>
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-6 flex items-start gap-4">
          <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center text-red-600 shrink-0 mt-0.5">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold text-red-700 mb-1">Important Notice</p>
            <p className="text-red-600 text-sm leading-relaxed">
              BloodBridge is a voluntary blood donor connection platform. We do
              not employ medical professionals, conduct medical screenings, or
              take responsibility for the outcome of any donation. By using this
              platform, you acknowledge this and agree to act responsibly.
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

        {/* Acceptance Banner */}
        <div className="mt-6 bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="h-1 bg-linear-to-r from-red-400 via-pink-400 to-purple-400" />
          <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-red-50 border-2 border-red-100 flex items-center justify-center shrink-0">
              <Mail className="w-7 h-7 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900">
                Have Questions?
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                If you have any questions regarding these Terms & Conditions,
                please reach out to us at{" "}
                <a
                  href="mailto:legal@bloodbridge.com"
                  className="text-red-600 font-semibold hover:text-red-700 transition-colors"
                >
                  legal@bloodbridge.com
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
          By continuing to use BloodBridge, you confirm that you have read,
          understood, and agreed to these Terms & Conditions.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
