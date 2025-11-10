import { useQuery } from "@tanstack/react-query";

import { authClient } from "@/lib/auth-client";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const { data } = await authClient.getSession();

      return data;
    },
  });
};
