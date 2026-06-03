import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://vyfzlqnlzhmjmfwarzsa.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5ZnpscW5semhtam1md2FyenNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0NzIwMDcsImV4cCI6MjA5NjA0ODAwN30.hLUU8cn0GFb7QLKNAnGVfOprk274y521mQVTDBTHZM4"
);