import { useQuery } from "react-query";
import useSupabase from "./useSupabase";

export default function useUser() {
  const supabase = useSupabase();
  const { data, ...userQuery } = useQuery({
    queryKey: ["user"],
    queryFn: () => supabase.auth.getUser(),
  });
  return { user: data?.data.user, ...userQuery };
}
