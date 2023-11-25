import { cache } from "react";
import { createClient } from "../supabase/server";
import { error } from "console";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/schema.gen";
import { UsersRow } from "../types/database";

export const getCurrentUser = cache(
  async (supabase: SupabaseClient<Database>) => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) throw new Error(error.message);
    if (!user) throw new Error("No user");
    return user;
  }
);

export const getUserDetails = async (supabase: SupabaseClient<Database>) => {
  const user = await getCurrentUser(supabase);
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id);
  if (error) throw new Error(error.message);
  if (!data[0]) throw new Error("User not found");

  return data[0];
};

export const updateUserDetails = async (
  supabase: SupabaseClient<Database>,
  newdata: Partial<UsersRow>
) => {
  const user = await getCurrentUser(supabase);
  const { error } = await supabase
    .from("users")
    .update(newdata)
    .eq("id", user.id);
  if (error) throw new Error(error.message);
};

export const searchUserByEmail = async (
  supabase: SupabaseClient<Database>,
  email: string
) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email);
  if (error) throw new Error(error.message);
  return data[0];
};

export const getFriendRequests = async (supabase: SupabaseClient<Database>) => {
  const user = await getCurrentUser(supabase);
  const { data, error } = await supabase
    .from("friend_requests")
    .select(
      `
  *,
  users!friend_requests_user_id_fkey (
    *
  )
  `
    )
    .eq("friend_id", user.id);
  console.log({ error, data });

  const res: UsersRow[] = [];
  data?.forEach((d) => {
    if (d.users) res.push(d.users);
  });

  return data;
};

export const sendFriendRequest = async (
  supabase: SupabaseClient<Database>,
  friend_id: string
) => {
  const { error } = await supabase
    .from("friend_requests")
    .insert({ friend_id });
  if (error) throw new Error(error.message);
};

export const acceptFriendRequest = async (
  supabase: SupabaseClient<Database>,
  friend_id: string
) => {
  const user = await getCurrentUser(supabase);
  const { data, error } = await supabase
    .from("friend_requests")
    .delete()
    .match({ friend_id: user.id, user_id: friend_id });
  console.log(data, error);

  if (error) throw new Error(error.message);
};

export const getFriends = async (supabase: SupabaseClient<Database>) => {
  const user = await getCurrentUser(supabase);
  const { data: data1, error: error1 } = await supabase
    .from("friends")
    .select(
      `
    users!friends_friend_id_fkey (
      *
    )
    `
    )
    .neq("friend_id", user.id);
  const { data: data2, error: error2 } = await supabase
    .from("friends")
    .select(
      `
    users!friends_user_id_fkey (
      *
    )
    `
    )
    .neq("user_id", user.id);

  console.log(data1, data2, error1, error2);

  if (error1) throw new Error(error1.message);
  if (error2) throw new Error(error2.message);

  const res: UsersRow[] = [];
  data1.forEach((d) => {
    d.users && res.push(d.users);
  });
  data2.forEach((d) => {
    d.users && res.push(d.users);
  });
  return res;
};

export const removeFriend = async (
  supabase: SupabaseClient<Database>,
  friend_id: string
) => {
  const { data, error } = await supabase
    .from("friends")
    .delete()
    .or(`user_id.eq.${friend_id},friend_id.eq.${friend_id}`);
  if (error) throw new Error(error.message);
};
