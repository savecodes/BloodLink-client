import React from "react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Register as Donor",
      description: "Create your account with blood type and location details.",
    },
    {
      number: "02",
      title: "Find Requests",
      description: "Browse donation requests that match your blood type.",
    },
    {
      number: "03",
      title: "Save Lives",
      description: "Donate blood and help save lives in your community.",
    },
  ];

  return (
    <div className="w-full bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-11/12 mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-red-500 mb-4">
            How It Works
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Three simple steps to start saving lives
          </p>
        </div>

        {/* Steps Container */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-0 lg:gap-0">
          {steps.map((step, index) => (
            <>
              {/* Step Card */}
              <div key={index} className="relative w-full max-w-sm lg:max-w-xs">
                <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  {/* Number */}
                  <div className="text-7xl sm:text-8xl font-bold text-red-100 mb-4">
                    {step.number}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Connector Line - Hidden on mobile, visible on desktop between cards */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block relative">
                  {/* Horizontal line */}
                  <div className="w-16 h-0.5 bg-gray-300 mx-4"></div>
                  {/* Arrow */}
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-gray-300"></div>
                </div>
              )}

              {/* Mobile connector - Vertical line with arrow */}
              {index < steps.length - 1 && (
                <div className="lg:hidden flex justify-center py-4">
                  <div className="relative">
                    {/* Vertical line */}
                    <div className="w-0.5 h-12 bg-gray-300"></div>
                    {/* Arrow pointing down */}
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-8 border-t-gray-300"></div>
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
