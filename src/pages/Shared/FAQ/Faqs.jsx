import {
  HelpCircle,
  ChevronDown,
  Search,
  Users,
  Droplet,
  Shield,
  Heart,
  Clock,
  FileText,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";

const Faqs = () => {
  const { user } = useAuth();
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const faqCategories = [
    {
      icon: Users,
      title: "General",
      color: "blue",
      faqs: [
        {
          question: "What is BloodLink?",
          answer:
            "BloodLink is a platform that connects blood donors with those in need. We help save lives by making it easier to find compatible blood donors quickly and efficiently.",
        },
        {
          question: "How does BloodLink work?",
          answer:
            "Donors register with their blood type and contact information. When someone needs blood, they can search for donors or create a request. Donors are notified and can respond to help.",
        },
        {
          question: "Is BloodLink free to use?",
          answer:
            "Yes, BloodLink is completely free for both donors and recipients. Our mission is to save lives, not to make profit from those in need.",
        },
      ],
    },
    {
      icon: Droplet,
      title: "Donation",
      color: "red",
      faqs: [
        {
          question: "How often can I donate blood?",
          answer:
            "You can donate whole blood every 3 months (12 weeks). This waiting period allows your body to replenish the blood cells and maintain healthy iron levels.",
        },
        {
          question: "Does blood donation hurt?",
          answer:
            "You may feel a slight pinch when the needle is inserted, but the process is generally painless. Most donors report minimal discomfort during the 10-15 minute donation process.",
        },
        {
          question: "How much blood is taken during donation?",
          answer:
            "A standard whole blood donation is about 450ml (approximately one pint). This amount is safe and represents less than 10% of your total blood volume.",
        },
        {
          question: "Will I feel weak after donating?",
          answer:
            "Most donors feel fine after donating. You should rest for 10-15 minutes, drink plenty of fluids, and avoid strenuous activity for 24 hours. Any weakness is usually temporary.",
        },
      ],
    },
    {
      icon: Shield,
      title: "Safety & Eligibility",
      color: "green",
      faqs: [
        {
          question: "Is blood donation safe?",
          answer:
            "Yes, blood donation is very safe. All equipment is sterile and used only once. There is no risk of contracting any disease from donating blood.",
        },
        {
          question: "Who can donate blood?",
          answer:
            "Generally, donors must be 18-65 years old, weigh at least 50kg, and be in good health. Specific eligibility criteria include normal blood pressure, acceptable hemoglobin levels, and no recent illnesses.",
        },
        {
          question: "Can I donate if I have a tattoo?",
          answer:
            "If you got a tattoo in the last 6 months, you may need to wait before donating to ensure there's no risk of infection transmission. Check with medical staff for specific guidelines.",
        },
        {
          question: "Can I donate while taking medication?",
          answer:
            "It depends on the medication. Some medications are fine, while others may require a waiting period. Always inform medical staff about any medications you're taking.",
        },
      ],
    },
    {
      icon: Heart,
      title: "Blood Types",
      color: "purple",
      faqs: [
        {
          question: "Why is blood type important?",
          answer:
            "Blood type matching prevents dangerous immune reactions during transfusions. Receiving incompatible blood can cause serious complications or even be life-threatening.",
        },
        {
          question: "What is a universal donor?",
          answer:
            "O- blood type is the universal donor because it can be given to people with any blood type. This makes O- donors especially valuable in emergency situations.",
        },
        {
          question: "What is a universal recipient?",
          answer:
            "AB+ blood type is the universal recipient because people with AB+ can receive blood from any blood type. However, they can only donate to other AB+ individuals.",
        },
        {
          question: "How do I find out my blood type?",
          answer:
            "You can find out your blood type through a blood test at a hospital, clinic, or blood donation center. Many people discover their blood type when they first donate blood.",
        },
      ],
    },
    {
      icon: FileText,
      title: "Using the Platform",
      color: "orange",
      faqs: [
        {
          question: "How do I register as a donor?",
          answer:
            "Click the 'Register' button, fill in your details including blood type, location, and contact information. Once verified, you'll be added to our donor database.",
        },
        {
          question: "How do I search for donors?",
          answer:
            "Use the 'Search Donors' feature to filter by blood type, location, and availability. You can see compatible donors and contact them directly through the platform.",
        },
        {
          question: "How do I create a blood request?",
          answer:
            "Log in to your account, go to 'Create Request', fill in the required details including blood type needed, urgency, location, and contact information. Your request will be visible to matching donors.",
        },
        {
          question: "Can I update my donor information?",
          answer:
            "Yes, you can update your profile information, availability status, and contact details anytime from your dashboard. Keep your information current to help those in need.",
        },
      ],
    },
  ];

  const filteredCategories = faqCategories.map((category) => ({
    ...category,
    faqs: category.faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

  const toggleFAQ = (categoryIndex, faqIndex) => {
    const index = `${categoryIndex}-${faqIndex}`;
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-red-50/30">
      {/* Header Section */}
      <section className="bg-linear-to-r from-red-600 to-pink-600 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-11/12 mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 animate-pulse">
            <HelpCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-base sm:text-lg text-red-50 max-w-2xl mx-auto">
            Find answers to common questions about blood donation and our
            platform.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none transition-colors bg-white shadow-md"
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            { label: "Total FAQs", value: "20+", icon: FileText, color: "blue" },
            { label: "Categories", value: "5", icon: Heart, color: "red" },
            { label: "Updated", value: "Weekly", icon: Clock, color: "green" },
            { label: "Helpful", value: "95%", icon: Shield, color: "purple" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-5 sm:p-6 text-center border border-gray-100"
            >
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mx-auto mb-3 ${
                  stat.color === "blue"
                    ? "bg-blue-100"
                    : stat.color === "red"
                      ? "bg-red-100"
                      : stat.color === "green"
                        ? "bg-green-100"
                        : "bg-purple-100"
                }`}
              >
                <stat.icon
                  className={`w-6 h-6 sm:w-7 sm:h-7 ${
                    stat.color === "blue"
                      ? "text-blue-600"
                      : stat.color === "red"
                        ? "text-red-600"
                        : stat.color === "green"
                          ? "text-green-600"
                          : "text-purple-600"
                  }`}
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* FAQ Categories */}
        {filteredCategories.map(
          (category, categoryIndex) =>
            category.faqs.length > 0 && (
              <div key={categoryIndex}>
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      category.color === "blue"
                        ? "bg-blue-100"
                        : category.color === "red"
                          ? "bg-red-100"
                          : category.color === "green"
                            ? "bg-green-100"
                            : category.color === "purple"
                              ? "bg-purple-100"
                              : "bg-orange-100"
                    }`}
                  >
                    <category.icon
                      className={`w-6 h-6 ${
                        category.color === "blue"
                          ? "text-blue-600"
                          : category.color === "red"
                            ? "text-red-600"
                            : category.color === "green"
                              ? "text-green-600"
                              : category.color === "purple"
                                ? "text-purple-600"
                                : "text-orange-600"
                      }`}
                    />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {category.title}
                  </h2>
                </div>

                {/* FAQ Items */}
                <div className="space-y-4">
                  {category.faqs.map((faq, faqIndex) => {
                    const isOpen = openIndex === `${categoryIndex}-${faqIndex}`;
                    return (
                      <div
                        key={faqIndex}
                        className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
                      >
                        <button
                          onClick={() => toggleFAQ(categoryIndex, faqIndex)}
                          className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-semibold text-gray-900 pr-4">
                            {faq.question}
                          </span>
                          <ChevronDown
                            className={`w-5 h-5 text-gray-500 shrink-0 transition-transform duration-300 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <div
                          className={`transition-all duration-300 ease-in-out ${
                            isOpen
                              ? "max-h-96 opacity-100"
                              : "max-h-0 opacity-0"
                          } overflow-hidden`}
                        >
                          <div className="px-6 pb-5 pt-2 text-gray-700 leading-relaxed border-t border-gray-100">
                            {faq.answer}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )
        )}

        {/* Still Have Questions Section */}
        <div className="bg-linear-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-lg transition-all duration-300">
          <div className="flex gap-4">
            <div className="shrink-0">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-amber-600" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Still Have Questions?
              </h3>
              <p className="text-sm sm:text-base text-gray-700 mb-4">
                Can't find the answer you're looking for? Our support team is
                here to help you with any questions or concerns.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-red-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Contact Support
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="relative overflow-hidden rounded-2xl shadow-xl">
          <div className="absolute inset-0 bg-linear-to-r from-red-600 to-pink-600"></div>
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

          <div className="relative z-10 p-8 sm:p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 animate-pulse">
              <Heart className="w-10 h-10 text-white" />
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              {user ? "Ready to Make a Difference?" : "Join Our Community"}
            </h2>
            <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto mb-8">
              {user
                ? "Browse blood donation requests and help save lives in your community."
                : "Register as a donor today and be part of something life-saving."}
            </p>

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

export default Faqs;