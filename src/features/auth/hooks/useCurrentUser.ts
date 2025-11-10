import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const { data } = await authClient.getSession();

      return data;
    },
  });
};
