import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

const VolunteerRoute = ({ children }) => {
  const { loading } = useAuth();
  const [role, isRoleLoading] = useRole();

  if (loading || isRoleLoading) return <LoadingSpinner />;

  if (role !== "volunteer" && role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default VolunteerRoute;
