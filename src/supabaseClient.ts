// src/supabaseClient.ts
//
// Requires `npm install @supabase/supabase-js` and a .env file (Vite) with:
//   VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
//   VITE_SUPABASE_ANON_KEY=your-anon-key
//   VITE_SUPABASE_FUNCTIONS_URL=https://YOUR_PROJECT.supabase.co/functions/v1
//
// Never put the service_role key here — anon key only, this file ships to the browser.

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

export const supabase = createClient(supabaseUrl, supabaseAnonKey)