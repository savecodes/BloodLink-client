import React from "react";
import UserDashboard from "../Donor/UserDashboard";
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import AdminDashboard from "../Admin/AdminDashboard";

const DashboardHome = () => {
  const [role, isRoleLoading] = useRole();
  if (!role) return <LoadingSpinner />;
  if (isRoleLoading) return <LoadingSpinner />;
  return (
    <div>
      {role === "admin" && <AdminDashboard />}
      {role === "donor" && <UserDashboard />}
    </div>
  );
};

export default DashboardHome;
