import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// We only initialize the online data service if both URL and key are provided
export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

if (!supabase) {
  console.warn(
    "Online data service is not configured (missing VITE_SUPABASE_URL and/or VITE_SUPABASE_ANON_KEY). " +
    "The portal requires shared online storage so test data stays synchronized across computers."
  );
}
