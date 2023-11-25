import { createClient } from "../supabase/client";

export default function useSupabase() {
  return createClient();
}
