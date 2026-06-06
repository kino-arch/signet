import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import * as Sentry from "@sentry/react"
import { AlertTriangle, Key, SpellCheck } from "lucide-react"
import { toast } from "sonner"
import { Seo } from "@/components/seo/Seo"
import { DotPattern } from "@/components/dot-pattern"
import { cn } from "@/lib/utils"

export function SettingsPage() {
  const [apiKey, setApiKey] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("openrouter_api_key") || ""
    }
    return ""
  })
  const [enableLanguageTool, setEnableLanguageTool] = useState(() => {
    const stored = localStorage.getItem("enable_language_tool")
    return stored === null ? true : stored === "true"
  })
  const [industry, setIndustry] = useState(
    () => localStorage.getItem("user_industry") || ""
  )
  const [tone, setTone] = useState(
    () => localStorage.getItem("user_tone") || "Professional"
  )

  const handleSave = () => {
    if (apiKey.trim() === "") {
      localStorage.removeItem("openrouter_api_key")
      toast.success("API Key removed")
    } else {
      localStorage.setItem("openrouter_api_key", apiKey.trim())
      toast.success("API Key saved securely")
    }
  }

  return (
    <>
      <Seo
        title="Settings | Signet"
        description="Configure your Signet experience."
        noindex={true}
      />
      <main className="relative mx-auto flex h-full w-full max-w-3xl flex-col p-6 lg:p-10">
        <DotPattern
          className={cn(
            "fixed inset-0 z-0 [mask-image:radial-gradient(800px_circle_at_center,white,transparent)] text-primary/5"
          )}
        />

        <div className="relative z-10">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              System Settings
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage your API keys, preferences, and generation parameters.
            </p>
          </div>

          <div className="space-y-8">
            {/* API Settings Section */}
            <div className="space-y-4 rounded-xl border border-border/40 bg-card p-6 shadow-sm">
              <div className="flex items-center gap-2 border-b border-border/40 pb-4">
                <Key className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                  AI Integration
                </h2>
              </div>

              <div className="space-y-2 pt-2">
                <Label
                  htmlFor="api-key"
                  className="text-xs font-semibold tracking-wider text-muted-foreground uppercase"
                >
                  OpenRouter API Key
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="api-key"
                    type="password"
                    placeholder="sk-or-v1-..."
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="bg-background font-mono"
                  />
                  <Button onClick={handleSave} className="px-6 font-semibold">
                    Save
                  </Button>
                </div>
              </div>

              <div className="mt-4 flex gap-3 rounded-lg border border-amber-500/20 bg-amber-500/10 p-4">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-amber-500">
                    Security Warning
                  </p>
                  <p className="text-sm text-amber-500/80">
                    Your API key is stored locally in your browser. Do not use
                    this on shared or public devices.
                  </p>
                </div>
              </div>
            </div>

            {/* AI Resume Generation Settings */}
            <div className="space-y-4 rounded-xl border border-border/40 bg-card p-6 shadow-sm">
              <div className="flex items-center gap-2 border-b border-border/40 pb-4">
                <Key className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                  Generation Preferences
                </h2>
              </div>

              <div className="space-y-2 pt-2">
                <Label
                  htmlFor="industry"
                  className="text-xs font-semibold tracking-wider text-muted-foreground uppercase"
                >
                  Target Industry
                </Label>
                <Input
                  id="industry"
                  placeholder="e.g. Software Engineering"
                  value={industry}
                  onChange={(e) => {
                    setIndustry(e.target.value)
                    localStorage.setItem("user_industry", e.target.value)
                  }}
                  className="bg-background"
                />
              </div>

              <div className="space-y-2 pt-2">
                <Label
                  htmlFor="tone"
                  className="text-xs font-semibold tracking-wider text-muted-foreground uppercase"
                >
                  Preferred Tone
                </Label>
                <select
                  id="tone"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  value={tone}
                  onChange={(e) => {
                    setTone(e.target.value)
                    localStorage.setItem("user_tone", e.target.value)
                  }}
                >
                  <option value="Professional">Professional</option>
                  <option value="Technical">Technical</option>
                  <option value="Conversational">Conversational</option>
                </select>
              </div>

              <div className="flex items-center justify-between border-t border-border/20 pt-4">
                <div className="flex items-center gap-3">
                  <SpellCheck className="h-5 w-5 text-primary" />
                  <div>
                    <Label
                      htmlFor="language-tool-toggle"
                      className="cursor-pointer text-sm font-semibold text-foreground"
                    >
                      Grammar Checking
                    </Label>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Use LanguageTool to catch grammar and spelling issues
                    </p>
                  </div>
                </div>
                <button
                  id="language-tool-toggle"
                  role="switch"
                  aria-checked={enableLanguageTool}
                  onClick={() => {
                    const next = !enableLanguageTool
                    setEnableLanguageTool(next)
                    localStorage.setItem("enable_language_tool", String(next))
                    toast.success(
                      next
                        ? "Grammar checking enabled"
                        : "Grammar checking disabled"
                    )
                  }}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none ${enableLanguageTool ? "bg-primary" : "bg-muted"}`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-background shadow-lg ring-0 transition duration-200 ease-in-out ${enableLanguageTool ? "translate-x-5" : "translate-x-0"}`}
                  />
                </button>
              </div>
            </div>

            {/* Diagnostics Section */}
            <div className="space-y-4 rounded-xl border border-destructive/20 bg-destructive/5 p-6 shadow-sm">
              <div className="flex items-center gap-2 border-b border-destructive/20 pb-4">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                  Diagnostics
                </h2>
              </div>
              <div className="flex items-center gap-4 pt-2">
                <Button
                  variant="destructive"
                  className="font-semibold"
                  onClick={() => {
                    const error = new Error("This is your first error!")
                    Sentry.captureException(error)
                    throw error
                  }}
                >
                  Trigger Sentry Error
                </Button>
                <Button
                  variant="outline"
                  className="font-semibold"
                  onClick={() => {
                    console.log("User triggered test log via console.log", {
                      log_source: "sentry_test",
                    })
                    toast("Test log sent to console.")
                  }}
                >
                  Trigger Test Log
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
