import { Link } from "react-router";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import logoImg from "../../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#0b0b0b] text-white/80">
      <div className="max-w-11/12 mx-auto px-4 py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                <img src={logoImg} alt="" className="w-20 h-10" />
              </div>
              <span className="text-xl font-bold">
                Blood<span className="text-red-500">Link</span>
              </span>
            </Link>

            <p className="text-sm text-white/60 leading-relaxed mb-6">
              Connecting blood donors with those in need. One donation can save
              up to three lives.
            </p>

            <div className="flex gap-3">
              <a className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 hover:bg-red-500 transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 hover:bg-red-500 transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 hover:bg-red-500 transition">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="hover:text-red-500">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/search-donors" className="hover:text-red-500">
                  Search Donors
                </Link>
              </li>
              <li>
                <Link to="/donations-requests" className="hover:text-red-500">
                  Donation Requests
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="hover:text-red-500">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/guidelines" className="hover:text-red-500">
                  Donor Guidelines
                </Link>
              </li>
              <li>
                <Link to="/blood-types" className="hover:text-red-500">
                  Blood Types
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-red-500">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-red-500">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-red-500" />
                <span className="text-white/60">Dhaka, Bangladesh</span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-5 h-5 text-red-500" />
                <span className="text-white/60">+880 1766 61141</span>
              </li>
              <li className="flex gap-3">
                <Mail className="w-5 h-5 text-red-500" />
                <span className="text-white/60">support@bloodlink.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
          <p>© {new Date().getFullYear()} BloodLink. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-red-500">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-red-500">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
