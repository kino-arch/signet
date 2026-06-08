import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"
config({ path: ".env.local" })

const supabaseAdmin = createClient(
  process.env.VITE_SUPABASE_URL || "",
  process.env.VITE_SUPABASE_ANON_KEY || ""
)

async function test() {
  const { data, error } = await supabaseAdmin.from("slate_versions").select("id").limit(1)
  if (error) {
    console.error("Error:", error.message)
  } else {
    console.log("Success! Table exists. Data:", data)
  }
}
test()
