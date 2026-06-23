import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// We only initialize Supabase if both URL and Key are provided
export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

if (!supabase) {
  console.warn(
    "Supabase is not configured (missing VITE_SUPABASE_URL and/or VITE_SUPABASE_ANON_KEY). " +
    "The portal requires Supabase so shared test data stays synchronized across computers."
  );
}
