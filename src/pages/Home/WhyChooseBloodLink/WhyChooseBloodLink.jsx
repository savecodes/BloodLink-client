import { HeartPulse, Users2, Building2, Shield } from "lucide-react";

const WhyChooseBloodLink = () => {
  const features = [
    {
      icon: HeartPulse,
      title: "Emergency Requests",
      description: "Quick response system for urgent blood needs with real-time notifications.",
      color: "bg-red-50"
    },
    {
      icon: Users2,
      title: "Verified Donors",
      description: "All donors are verified and undergo health screenings for safe donations.",
      color: "bg-red-50"
    },
    {
      icon: Building2,
      title: "Trusted Hospitals",
      description: "Partner with certified medical facilities across the country.",
      color: "bg-red-50"
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Your data is protected with enterprise-grade security measures.",
      color: "bg-red-50"
    }
  ];

  return (
    <div className="w-full bg-linear-to-b from-gray-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-11/12 mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-red-500 my-6
           mb-4">
            Why Choose BloodLink?
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            We're committed to making blood donation simple, safe, and accessible for everyone.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Icon Container */}
              <div className={`${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8 text-red-600" strokeWidth={2} />
              </div>

              {/* Content */}
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default WhyChooseBloodLink;