import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const [role, setRole] = useState(null); // ✅ put it here
  const [isRoleLoading, setIsRoleLoading] = useState(true);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/role/${user.email}`).then((res) => {
        setRole(res.data.role);
        setIsRoleLoading(false);
      });
    } else {
      setTimeout(() => {
        setRole(null);
        setIsRoleLoading(false);
      }, 0);
    }
  }, [user, axiosSecure]);

  return [role, isRoleLoading];
};

export default useRole;
