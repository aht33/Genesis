import { createClient } from "@supabase/supabase-js";

const URL = import.meta.env.VITE_APP_URL;
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const supabase = createClient(URL, API_KEY);

export default supabase;