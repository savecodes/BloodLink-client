import { Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";

const CallToAction = () => {
  const { user } = useAuth();
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden p-4">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-linear-to-br from-red-500 via-red-600 to-pink-600"></div>

      {/* Overlay Pattern */}
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

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Heart Icon with Circle Background */}
        <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-red-400/30 backdrop-blur-sm mb-8 animate-pulse">
          <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-white fill-white" />
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
          Ready to Save Lives?
        </h2>

        {/* Description */}
        <p className="text-base sm:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed">
          Join thousands of donors who are making a difference every day. Your
          single donation can save up to three lives. Start your journey as a
          blood donor today.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {!user ? (
            // Guest user
            <Link
              to="/register"
              className="group flex items-center justify-center gap-2 px-8 py-4 rounded-full 
                 bg-white text-red-600 font-semibold transition-all duration-300 
                 hover:scale-105 hover:shadow-2xl w-full sm:w-auto"
            >
              Become a Donor
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            // Logged-in user
            <Link
              to="/donations-requests"
              className="group flex items-center justify-center gap-2 px-8 py-4 rounded-full 
                 bg-white/10 text-white font-semibold backdrop-blur-sm 
                 border border-white/40 transition-all duration-300 
                 hover:bg-white/20 hover:scale-105 w-full sm:w-auto"
            >
              View Requests
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
