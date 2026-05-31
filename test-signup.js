import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function test() {
  console.log("Attempting sign up...");
  const { data, error } = await supabase.auth.signUp({
    email: `test-${Date.now()}@example.com`,
    password: "password123"
  });
  console.log("Data:", data);
  console.log("Error:", error);
}

test();
