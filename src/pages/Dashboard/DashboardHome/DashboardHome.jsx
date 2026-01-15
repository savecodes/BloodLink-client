import React from "react";
import UserDashboard from "../Donor/UserDashboard";
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

const DashboardHome = () => {
  const [role, isRoleLoading] = useRole();
  if (isRoleLoading) {
    <LoadingSpinner />;
  }
  return <div>{role === "donor" && <UserDashboard />}</div>;
};

export default DashboardHome;
