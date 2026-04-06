// import { createClient } from "@supabase/supabase-js";
// import { Database } from "../types/supabase-types";

const ftpUrl = import.meta.env.VITE_FTP_HOST;
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

if (!ftpUrl) {
  throw new Error("Please provide FTP_HOST");
}
// export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export function getStorageURL(path: string | null) {
  if (path === null) return null;
  const URL = ftpUrl + "/rezeptwelt/" + path + ".jpg";
  return URL;
}
