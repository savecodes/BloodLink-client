import { Link, useNavigate, useLocation } from "react-router";
import {
  Heart,
  Menu,
  User,
  LayoutDashboard,
  LogOut,
  LogIn,
  HeartHandshake,
} from "lucide-react";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Search Donors", to: "/search-donors" },
  { label: "Donation Requests", to: "/donations-requests" },
  { label: "About Us", to: "/about-us" },
];

const Navbar = () => {
  const { user, logOut, loading } = useAuth();
  const isAuthenticated = !!user && !loading;
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const renderDesktopLinks = () =>
    navLinks.map(({ label, to }) => {
      const isActive = location.pathname === to;
      return (
        <Link
          key={to}
          to={to}
          className={`relative text-sm font-medium transition-colors group ${
            isActive ? "text-red-600" : "text-gray-700 hover:text-red-600"
          }`}
        >
          {label}
          <span
            className={`absolute -bottom-1 left-0 h-0.5 bg-red-600 transition-all ${
              isActive ? "w-full" : "w-0 group-hover:w-full"
            }`}
          />
        </Link>
      );
    });

  const renderMobileLinks = () =>
    navLinks.map(({ label, to }) => {
      const isActive = location.pathname === to;
      return (
        <button
          key={to}
          className={`w-full text-left px-4 py-3 font-medium rounded-lg transition-colors ${
            isActive
              ? "bg-red-50 text-red-600"
              : "text-gray-700 hover:bg-gray-50"
          }`}
          onClick={() => {
            navigate(to);
            setIsOpen(false);
          }}
        >
          {label}
        </button>
      );
    });

  return (
    <nav className="w-full bg-white border-b border-gray-200 p-2">
      <div className="max-w-11/12 mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <Heart className="h-7 w-7 text-red-600 fill-red-600 transition-transform group-hover:scale-110" />
          </div>
          <span className="text-2xl font-bold bg-linear-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
            BloodLink
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {renderDesktopLinks()}
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-3">
          {loading ? null : isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="h-9 w-9 rounded-full bg-linear-to-br from-red-600 to-pink-600 flex items-center justify-center text-white font-semibold text-sm">
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || "User"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-white font-semibold text-sm">
                      {user?.displayName?.charAt(0) ||
                        user?.email?.charAt(0) ||
                        "U"}
                    </span>
                  )}
                </div>
              </button>

              {dropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 z-20 py-2">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">
                        {user?.displayName || "User"}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {user?.email}
                      </p>
                      <span className="inline-flex items-center rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-600 mt-2">
                        {user?.role || "donor"}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        navigate("/dashboard");
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 hover:bg-gray-50 flex items-center gap-2 text-sm text-gray-700 transition-colors"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </button>
                    <button
                      onClick={() => {
                        navigate("/dashboard/profile");
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 hover:bg-gray-50 flex items-center gap-2 text-sm text-gray-700 transition-colors"
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </button>
                    <div className="border-t border-gray-100 my-1" />
                    <button
                      onClick={() => {
                        handleLogout();
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 hover:bg-red-50 text-red-600 flex items-center gap-2 text-sm font-medium transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      Log out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              {/* Sign In */}
              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-2 px-5 py-2.5 
               text-sm font-medium text-gray-700 
               hover:text-red-600 transition-colors
               whitespace-nowrap cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </button>

              {/* Join as Donor */}
              <button
                onClick={() => navigate("/register")}
                className="flex items-center gap-2 px-5 py-4 
               text-sm font-medium text-white 
               bg-linear-to-r from-red-600 to-pink-600 
               rounded-lg hover:shadow-lg transition-all
               whitespace-nowrap cursor-pointer"
              >
                <HeartHandshake className="w-4 h-4" />
                <span>Join as Donor</span>
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <Menu className="h-6 w-6 text-gray-700" />
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/20 z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-50 md:hidden overflow-y-auto">
              <div className="flex flex-col gap-6 p-6">
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <Heart className="h-6 w-6 text-red-600 fill-red-600" />
                    <span className="text-lg font-bold bg-linear-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                      BloodLink
                    </span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <span className="text-2xl text-gray-600">×</span>
                  </button>
                </div>

                {!loading && isAuthenticated && (
                  <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                    <div className="h-12 w-12 rounded-full bg-linear-to-br from-red-600 to-pink-600 flex items-center justify-center text-white font-semibold">
                      {user?.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt={user.displayName || "User"}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-white font-semibold">
                          {user?.displayName?.charAt(0) ||
                            user?.email?.charAt(0) ||
                            "U"}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {user?.displayName || "User"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {user?.role || "donor"}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-1">{renderMobileLinks()}</div>

                {isAuthenticated ? (
                  <div className="flex flex-col gap-1 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => {
                        navigate("/dashboard");
                        setIsOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-2 rounded-lg transition-colors text-gray-700 font-medium"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </button>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-600 flex items-center gap-2 rounded-lg transition-colors font-medium"
                    >
                      <LogOut className="h-4 w-4" />
                      Log out
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
                    {/* Sign In */}
                    <button
                      onClick={() => {
                        navigate("/login");
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 
               border border-gray-300 rounded-lg 
               font-medium text-gray-700 
               hover:bg-gray-50 transition-colors
               whitespace-nowrap"
                    >
                      <LogIn className="w-5 h-5" />
                      <span>Sign In</span>
                    </button>

                    {/* Join as Donor */}
                    <button
                      onClick={() => {
                        navigate("/register");
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 
               text-white bg-linear-to-r from-red-600 to-pink-600 
               rounded-lg font-medium 
               hover:shadow-lg transition-all
               whitespace-nowrap"
                    >
                      <HeartHandshake className="w-5 h-5" />
                      <span>Join as Donor</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
