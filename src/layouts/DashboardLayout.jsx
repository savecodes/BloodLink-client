import { useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router";
import {
  Heart,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  HandHeart,
} from "lucide-react";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import { SIDEBAR_MENU } from "../services/sidebarMenu";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import LogoImg from "../assets/g_logo2.png";

const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [role, roleLoading] = useRole();


  const safeRole = role || "donor";
  const links = SIDEBAR_MENU[safeRole] || [];

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const getRoleBadgeColor = (role) => {
    if (role === "admin") return "bg-purple-100 text-purple-700";
    if (role === "donor") return "bg-red-100 text-red-700";
    return "bg-gray-100 text-gray-700";
  };

  if (roleLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-40 flex items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={LogoImg}
            alt="BloodLink Logo"
            className="h-8 sm:h-8 md:h-10 lg:h-8
    w-auto
    transition-transform
    group-hover:scale-105"
          />
        </Link>

        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isMobileOpen ? (
            <X className="h-6 w-6 text-gray-700" />
          ) : (
            <Menu className="h-6 w-6 text-gray-700" />
          )}
        </button>
      </div>

      {/* Sidebar - Desktop */}
      <aside
        className={`hidden lg:flex flex-col fixed left-0 top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 z-40 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Header */}
        <div className="h-16 border-b border-gray-200 flex items-center justify-center px-4">
          {isCollapsed ? (
            <button
              onClick={() => setIsCollapsed(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Expand sidebar"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>
          ) : (
            <>
              <Link to="/" className="flex items-center gap-2 flex-1">
                <img
                  src={LogoImg}
                  alt="BloodLink Logo"
                  className="h-8 sm:h-8 md:h-10 lg:h-8
    w-auto
    transition-transform
    hover:scale-105"
                />
              </Link>
              <button
                onClick={() => setIsCollapsed(true)}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                title="Collapse sidebar"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>
            </>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {!isCollapsed && (
            <p className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Navigation
            </p>
          )}
          <div className="space-y-1">
            {links.map((link) => {
              const isActive = location.pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                    isActive
                      ? "bg-linear-to-r from-red-600 to-pink-600 text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100"
                  } ${isCollapsed ? "justify-center" : ""}`}
                  title={isCollapsed ? link.label : ""}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {!isCollapsed && (
                    <span className="font-medium">{link.label}</span>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4">
          <div
            className={`flex items-center gap-3 mb-3 ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <div className="h-10 w-10 rounded-full bg-linear-to-br from-red-600 to-pink-600 flex items-center justify-center text-white font-semibold text-sm shrink-0">
              {user?.displayName?.charAt(0) || user?.email?.charAt(0) || "U"}
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {user?.displayName || "User"}
                </p>
                <span
                  className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mt-1 ${getRoleBadgeColor(
                    role || "donor"
                  )}`}
                >
                  {role || "donor"}
                </span>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Log out
            </button>
          )}
        </div>
      </aside>

      {/* Sidebar - Mobile */}
      {isMobileOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40 animate-fade-in"
            onClick={() => setIsMobileOpen(false)}
          />
          <aside className="lg:hidden fixed right-0 top-0 h-screen w-64 bg-white border-l border-gray-200 z-50 flex flex-col animate-slide-in-right">
            <style>{`
              @keyframes fade-in {
                from { opacity: 0; }
                to { opacity: 1; }
              }
              @keyframes slide-in-right {
                from { transform: translateX(100%); }
                to { transform: translateX(0); }
              }
              .animate-fade-in {
                animation: fade-in 0.3s ease-out;
              }
              .animate-slide-in-right {
                animation: slide-in-right 0.3s ease-out;
              }
            `}</style>
            {/* Header */}
            <div className="h-16 border-b border-gray-200 flex items-center justify-between px-4">
              <Link to="/" className="flex items-center gap-2">
                <img
                  src={LogoImg}
                  alt="BloodLink Logo"
                  className="h-8 sm:h-8 md:h-10 lg:h-8
    w-auto
    transition-transform
    hover:scale-105"
                />
              </Link>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4 px-3">
              <p className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Navigation
              </p>
              <div className="space-y-1">
                {links.map((link) => {
                  const isActive = location.pathname === link.href;
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setIsMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                        isActive
                          ? "bg-linear-to-r from-red-600 to-pink-600 text-white shadow-md"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                      <span className="font-medium">{link.label}</span>
                    </Link>
                  );
                })}
              </div>
            </nav>

            {/* Footer */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-linear-to-br from-red-600 to-pink-600 flex items-center justify-center text-white font-semibold text-sm shrink-0">
                  {user?.displayName?.charAt(0) ||
                    user?.email?.charAt(0) ||
                    "U"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {user?.displayName || "User"}
                  </p>
                  <span
                    className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mt-1 ${getRoleBadgeColor(
                      role || "donor"
                    )}`}
                  >
                    {role || "donor"}
                  </span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Log out
              </button>
            </div>
          </aside>
        </>
      )}

      {/* Main Content */}
      <main
        className={`transition-all duration-300 ${
          isCollapsed ? "lg:ml-20" : "lg:ml-64"
        } pt-16 lg:pt-0`}
      >
        <div className="min-h-screen p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
