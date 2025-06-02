import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { authContext } from "../provider/Authprovider";
import { axiosPublic } from "./UseAxiosPublic";



const UseModerator = () => {
  const { user, loading } = useContext(authContext)
  
  const { data: isModerator, isLoading: isModeratorLoading } = useQuery({
    queryKey: [user?.email, "isModerator"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/moderator/${user.email}`);
      return res.data?.moderator;
    },
  });
  return [isModerator, isModeratorLoading];
};

export default UseModerator;