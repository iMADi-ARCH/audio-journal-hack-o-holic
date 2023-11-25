import { Database } from "@/schema.gen";
import { SupabaseClient } from "@supabase/supabase-js";
import { getCurrentUser, getUserDetails } from "./user";
import { redirect } from "next/navigation";

export const createChapter = async (
  supabase: SupabaseClient<Database>,
  formData: FormData
) => {
  const user = await getUserDetails(supabase);
  const title = formData.get("title") as string;
  const desc = formData.get("desc") as string;
  const file = formData.get("thumbnail") as File;
  console.log(file);

  const { data, error } = await supabase
    .from("chapters")
    .insert({ title, desc })
    .select();
  if (error) throw new Error(error.message);

  data[0].id;

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("stories")
    .upload(`${user.id}/${data[0].id}/thumbnail`, file);
  if (uploadError) throw new Error(uploadError.message);
  return redirect(`chapters/${data[0].id}`);
};

export const getChapterThumbnail = async (
  supabase: SupabaseClient<Database>,
  chapterId: string
) => {
  const { data: users, error: usersError } = await supabase
    .from("chapters")
    .select("user_id")
    .eq("id", chapterId);
  if (usersError) throw new Error(usersError.message);
  const {
    data: { publicUrl },
  } = supabase.storage
    .from("stories")
    .getPublicUrl(`${users[0].user_id}/${chapterId}/thumbnail`);
  return publicUrl;
};

export const getChapterDetails = async (
  supabase: SupabaseClient<Database>,
  chapterId: string
) => {
  const { data, error } = await supabase
    .from("chapters")
    .select()
    .eq("id", chapterId);
  if (error) throw new Error(error.message);
  return data[0];
};

export const getChapters = async (supabase: SupabaseClient<Database>) => {
  const { data, error } = await supabase
    .from("chapters")
    .select("*, users (*)");
  if (error) throw new Error(error.message);
  return data;
};
