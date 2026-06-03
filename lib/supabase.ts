import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://vyfzlqnlzhmjmfwarzsa.supabase.co/rest/v1/",
  "sb_publishable_AxovgF-bbcN-tVQJGI1dTw_vXEdvsMQ"
);