import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserStatus = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userData, isLoading: isStatusLoading } = useQuery({
    queryKey: ["user-status", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users/role/${user.email}`);
      return data;
    },
    enabled: !!user?.email,
  });

  return {
    status: userData?.status || "active",
    role: userData?.role || null,
    isBlocked: userData?.status === "blocked",
    isStatusLoading,
  };
};

export default useUserStatus;