import {
  Heart,
  Users,
  Target,
  Award,
  Clock,
  Shield,
  Droplet,
  MapPin,
} from "lucide-react";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";

const AboutUs = () => {
  const { user } = useAuth();
  const stats = [
    {
      icon: Users,
      label: "Active Donors",
      value: "10,000+",
      color: "bg-red-100 text-red-600",
    },
    {
      icon: Droplet,
      label: "Lives Saved",
      value: "5,000+",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Clock,
      label: "Years of Service",
      value: "5+",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: MapPin,
      label: "Districts Covered",
      value: "64",
      color: "bg-purple-100 text-purple-600",
    },
  ];

  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description:
        "We believe in the power of human kindness and the importance of helping those in need.",
      color: "bg-red-100 text-red-600",
    },
    {
      icon: Shield,
      title: "Trust & Safety",
      description:
        "We ensure all donors are verified and maintain the highest standards of safety and privacy.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Target,
      title: "Efficiency",
      description:
        "We connect donors with recipients quickly, ensuring blood reaches those who need it most.",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "We strive for excellence in every aspect of our service, from technology to user experience.",
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-12 sm:py-16 md:py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-2xl mb-4 sm:mb-6 backdrop-blur-sm">
            <Heart className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 px-4">
            About BloodLink
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-red-100 max-w-3xl mx-auto leading-relaxed px-4">
            We're on a mission to save lives by connecting blood donors with
            those in critical need across Bangladesh.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-8 sm:-mt-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 text-center hover:shadow-xl transition-shadow"
            >
              <div
                className={`inline-flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl ${stat.color} mb-2 sm:mb-4`}
              >
                <stat.icon className="w-5 h-5 sm:w-7 sm:h-7" />
              </div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Our Story Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Our Story
            </h2>
            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed">
              <p>
                BloodLink was founded in 2020 with a simple yet powerful vision:
                to bridge the gap between blood donors and those in urgent need.
                In Bangladesh, where blood shortages can be a matter of life and
                death, we saw an opportunity to make a real difference.
              </p>
              <p>
                What started as a small initiative in Dhaka has grown into a
                nationwide network of over 10,000 verified donors across all 64
                districts. Our platform has facilitated thousands of successful
                blood donations, saving countless lives in the process.
              </p>
              <p>
                Today, we continue to innovate and expand our services,
                leveraging technology to make blood donation more accessible,
                efficient, and transparent for everyone involved.
              </p>
            </div>
          </div>
          <div className="relative mt-8 lg:mt-0">
            <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1615461065929-4f8ffed6ca40?w=600&h=400&fit=crop"
                alt="Blood donation"
                className="w-full h-[300px] sm:h-[350px] md:h-[400px] object-cover"
              />
            </div>
            <div className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 bg-red-600 text-white p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-lg px-2">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold">
                5+
              </div>
              <div className="text-xs sm:text-sm">Years Saving Lives</div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="bg-gray-50 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
              Our Core Values
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
              These principles guide everything we do and shape the way we serve
              our community.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-5 sm:p-6 hover:shadow-xl transition-shadow"
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl ${value.color} mb-3 sm:mb-4`}
                >
                  <value.icon className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-red-600 text-white rounded-lg sm:rounded-xl mb-4 sm:mb-6">
              <Target className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
              Our Mission
            </h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              To create a reliable, accessible, and efficient blood donation
              network that ensures no patient goes without the blood they need.
              We strive to make voluntary blood donation a norm and eliminate
              blood shortages across Bangladesh.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-blue-600 text-white rounded-lg sm:rounded-xl mb-4 sm:mb-6">
              <Award className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
              Our Vision
            </h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              A future where every person in Bangladesh has immediate access to
              safe blood when they need it most. We envision a community where
              blood donation is celebrated, donors are honored, and lives are
              saved every single day.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16 md:py-20">
        <div className="bg-linear-to-r from-red-600 to-red-700 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-4">
            Join Our Community of Lifesavers
          </h2>
          <p className="text-sm sm:text-base text-red-100 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Whether you want to donate blood or find a donor, we're here to
            help. Together, we can save lives.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
  {!user ? (
    <Link
      to="/register"
      className="px-8 py-4 bg-white text-red-600 font-semibold rounded-xl
                 hover:shadow-lg transition-all text-base"
    >
      Become a Donor
    </Link>
  ) : (
    <Link
      to="/donations-requests"
      className="px-8 py-4 bg-white text-red-600 font-semibold rounded-xl
                 hover:shadow-lg transition-all text-base"
    >
      View Donation Requests
    </Link>
  )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
