import { Heart, Search, Users, Droplet, ArrowRight } from "lucide-react";
import BannerImg from "../../../assets/BannerImg.png";
import useAuth from "../../../hooks/useAuth";

const Banner = () => {
  const { user } = useAuth();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <img
        src={BannerImg}
        alt="Blood Donation"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/65" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl px-4 text-center text-white">
        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
          Donate Blood,&nbsp;
          <span className="bg-linear-to-r from-red-500 via-pink-500 to-red-600 bg-clip-text text-transparent">
            Save Lives Today
          </span>
        </h1>

        {/* Description */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg lg:text-xl text-white/90 mb-10">
          Connect with blood donors near you and become a hero. One simple
          donation can save up to three lives.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
          {!user ? (
            // Guest user CTA
            <button
              className="group flex items-center justify-center gap-2 px-8 py-4 
                 rounded-full bg-linear-to-r from-red-600 to-pink-600 
                 font-semibold transition-all duration-300 
                 hover:scale-105 hover:shadow-xl cursor-pointer"
            >
              <Heart className="w-5 h-5 fill-white" />
              Join as Donor
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            // Logged-in user CTA
            <button
              className="group flex items-center justify-center gap-2 px-8 py-4 
                 rounded-full border border-white/40 backdrop-blur 
                 transition-all duration-300 
                 hover:bg-white/10 hover:scale-105 cursor-pointer"
            >
              <Search className="w-5 h-5" />
              Search Donors
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Banner;
