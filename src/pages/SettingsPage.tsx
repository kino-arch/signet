import { useState } from "react"
import { useAuthStore } from "@/store/useAuthStore"
import { Seo } from "@/components/seo/Seo"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import {
  User,
  Mail,
  Lock,
  Shield,
  CreditCard,
  AlertTriangle,
  Loader2,
} from "lucide-react"
import { logger } from "@/lib/logger"

interface SettingsSection {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const SECTIONS: SettingsSection[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "account", label: "Account & Security", icon: Shield },
  { id: "billing", label: "Billing & Credits", icon: CreditCard },
]

export function SettingsPage() {
  const { user, profile, signOut } = useAuthStore()
  const [activeSection, setActiveSection] = useState("profile")
  const [displayName, setDisplayName] = useState(
    user?.user_metadata?.full_name || user?.email?.split("@")[0] || ""
  )
  const [isSavingProfile, setIsSavingProfile] = useState(false)
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [isDeletingAccount, setIsDeletingAccount] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState("")

  const handleSaveProfile = async () => {
    if (!displayName.trim()) return
    setIsSavingProfile(true)
    try {
      const { error } = await supabase.auth.updateUser({
        data: { full_name: displayName.trim() },
      })
      if (error) throw error
      toast.success("Profile updated")
    } catch (err) {
      logger.error("Failed to update profile", err)
      toast.error("Failed to save changes")
    } finally {
      setIsSavingProfile(false)
    }
  }

  const handleChangePassword = async () => {
    if (!newPassword || newPassword.length < 8) {
      toast.error("New password must be at least 8 characters")
      return
    }
    setIsChangingPassword(true)
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword })
      if (error) throw error
      toast.success("Password updated successfully")
      setOldPassword("")
      setNewPassword("")
    } catch (err) {
      logger.error("Failed to update password", err)
      toast.error("Failed to update password")
    } finally {
      setIsChangingPassword(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (deleteConfirm !== "delete my account") {
      toast.error('Type "delete my account" to confirm')
      return
    }
    setIsDeletingAccount(true)
    try {
      // Retrieve the current session's access token to authenticate the edge function.
      // The edge function uses the SERVICE_ROLE key server-side to call admin.deleteUser,
      // which hard-deletes the user from auth.users. This ensures that any OAuth
      // re-login (e.g. Google) creates a brand-new identity with onboarding_completed = null.
      const { data: sessionData } = await supabase.auth.getSession()
      const accessToken = sessionData.session?.access_token

      if (!accessToken) {
        toast.error("No active session found. Please refresh and try again.")
        return
      }

      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
      const response = await fetch(`${supabaseUrl}/functions/v1/delete-account`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })

      if (!response.ok) {
        const body = await response.json().catch(() => ({}))
        throw new Error(body.error ?? `Server error ${response.status}`)
      }

      // Account is permanently deleted on the server. Sign out the local session.
      await signOut()
      toast.success("Your account has been permanently deleted.")
    } catch (err) {
      logger.error("Failed to delete account", err)
      toast.error(err instanceof Error ? err.message : "Failed to delete account")
    } finally {
      setIsDeletingAccount(false)
    }
  }

  const isGuest = user?.id.startsWith("guest_")

  return (
    <>
      <Seo
        title="Settings | Signet"
        description="Manage your Signet account, security settings, and billing."
        noindex={true}
      />

      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-nordic-text">Settings</h1>
          <p className="mt-1 text-sm text-nordic-text-secondary">
            Manage your account preferences and security.
          </p>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Nav */}
          <nav
            className="flex w-48 shrink-0 flex-col gap-1"
            aria-label="Settings sections"
          >
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                id={`settings-nav-${section.id}`}
                onClick={() => setActiveSection(section.id)}
                aria-current={activeSection === section.id ? "page" : undefined}
                className={`flex items-center gap-2.5 px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                  activeSection === section.id
                    ? "border-l-2 border-nordic-accent bg-nordic-accent/10 text-nordic-accent"
                    : "text-nordic-text-secondary hover:bg-nordic-surface-hover hover:text-nordic-text"
                }`}
              >
                <section.icon className="h-4 w-4 shrink-0" />
                {section.label}
              </button>
            ))}
          </nav>

          {/* Content Panel */}
          <div className="flex-1 space-y-6">
            {/* Profile Section */}
            {activeSection === "profile" && (
              <section
                aria-labelledby="settings-heading-profile"
                className="nordic-card p-6"
              >
                <h2
                  id="settings-heading-profile"
                  className="mb-6 text-base font-semibold text-nordic-text"
                >
                  Profile Information
                </h2>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="settings-display-name"
                      className="nordic-input-label"
                    >
                      Display Name
                    </label>
                    <div className="relative">
                      <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-nordic-text-tertiary" />
                      <input
                        id="settings-display-name"
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="nordic-input w-full pl-9"
                        placeholder="Your display name"
                        disabled={isGuest}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="settings-email"
                      className="nordic-input-label"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-nordic-text-tertiary" />
                      <input
                        id="settings-email"
                        type="email"
                        value={user?.email ?? ""}
                        className="nordic-input w-full pl-9 opacity-60"
                        readOnly
                        disabled
                        aria-label="Email address (read only)"
                      />
                    </div>
                    <p className="mt-1 text-xs text-nordic-text-tertiary">
                      Email cannot be changed here. Contact support if needed.
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      id="settings-save-profile"
                      onClick={handleSaveProfile}
                      disabled={isSavingProfile || isGuest}
                      className="nordic-btn-primary"
                    >
                      {isSavingProfile && (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      )}
                      Save Changes
                    </button>
                    {isGuest && (
                      <p className="mt-2 text-xs text-nordic-text-tertiary">
                        Sign up for a free account to save your profile.
                      </p>
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* Account & Security Section */}
            {activeSection === "account" && (
              <div className="space-y-6">
                <section
                  aria-labelledby="settings-heading-password"
                  className="nordic-card p-6"
                >
                  <h2
                    id="settings-heading-password"
                    className="mb-6 text-base font-semibold text-nordic-text"
                  >
                    Change Password
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="settings-current-password"
                        className="nordic-input-label"
                      >
                        Current Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-nordic-text-tertiary" />
                        <input
                          id="settings-current-password"
                          type="password"
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                          className="nordic-input w-full pl-9"
                          placeholder="••••••••"
                          disabled={isGuest}
                          autoComplete="current-password"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="settings-new-password"
                        className="nordic-input-label"
                      >
                        New Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-nordic-text-tertiary" />
                        <input
                          id="settings-new-password"
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="nordic-input w-full pl-9"
                          placeholder="••••••••"
                          disabled={isGuest}
                          autoComplete="new-password"
                          aria-describedby="settings-password-hint"
                        />
                      </div>
                      <p
                        id="settings-password-hint"
                        className="mt-1 text-xs text-nordic-text-tertiary"
                      >
                        Must be at least 8 characters.
                      </p>
                    </div>

                    <button
                      id="settings-change-password"
                      onClick={handleChangePassword}
                      disabled={isChangingPassword || isGuest}
                      className="nordic-btn-primary"
                    >
                      {isChangingPassword && (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      )}
                      Update Password
                    </button>
                  </div>
                </section>

                {/* Danger Zone */}
                <section
                  aria-labelledby="settings-heading-danger"
                  className="border border-nordic-error/30 bg-nordic-error/5 p-6"
                >
                  <h2
                    id="settings-heading-danger"
                    className="mb-1 flex items-center gap-2 text-base font-semibold text-nordic-error"
                  >
                    <AlertTriangle className="h-4 w-4" />
                    Danger Zone
                  </h2>
                  <p className="mb-4 text-sm text-nordic-text-secondary">
                    Permanently delete your account and all associated data.
                    This action cannot be undone.
                  </p>
                  <div className="space-y-3">
                    <div>
                      <label
                        htmlFor="settings-delete-confirm"
                        className="nordic-input-label text-xs"
                      >
                        Type{" "}
                        <span className="font-mono text-nordic-error">
                          delete my account
                        </span>{" "}
                        to confirm
                      </label>
                      <input
                        id="settings-delete-confirm"
                        type="text"
                        value={deleteConfirm}
                        onChange={(e) => setDeleteConfirm(e.target.value)}
                        className="nordic-input w-full max-w-sm"
                        placeholder="delete my account"
                        aria-describedby="settings-delete-hint"
                      />
                    </div>
                    <button
                      id="settings-delete-account"
                      onClick={handleDeleteAccount}
                      disabled={
                        isDeletingAccount || deleteConfirm !== "delete my account"
                      }
                      className="inline-flex items-center gap-2 bg-nordic-error px-5 py-2.5 font-medium text-white transition-colors hover:bg-nordic-error/80 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {isDeletingAccount && (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      )}
                      Delete Account
                    </button>
                  </div>
                </section>
              </div>
            )}

            {/* Billing Section */}
            {activeSection === "billing" && (
              <section
                aria-labelledby="settings-heading-billing"
                className="nordic-card p-6"
              >
                <h2
                  id="settings-heading-billing"
                  className="mb-6 text-base font-semibold text-nordic-text"
                >
                  Credits & Billing
                </h2>

                <div className="space-y-6">
                  {/* Credit Balance */}
                  <div className="flex items-center justify-between border border-nordic-accent/20 bg-nordic-accent/5 p-4">
                    <div>
                      <p className="text-sm font-medium text-nordic-text">
                        AI Credits Balance
                      </p>
                      <p className="mt-0.5 text-xs text-nordic-text-secondary">
                        Each AI generation costs 1 credit.
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className="text-3xl font-bold text-nordic-accent"
                        aria-label={`${profile?.credits ?? 0} credits remaining`}
                      >
                        {profile?.credits ?? 0}
                      </span>
                      <p className="text-xs text-nordic-text-tertiary">
                        credits remaining
                      </p>
                    </div>
                  </div>

                  {/* Purchase CTA */}
                  <div className="border border-nordic-border bg-nordic-surface-hover p-4">
                    <p className="mb-3 text-sm text-nordic-text-secondary">
                      Need more credits? Upgrade your plan or purchase a top-up.
                    </p>
                    <button
                      id="settings-buy-credits"
                      className="nordic-btn-primary"
                      onClick={() => toast.info("Billing portal coming soon.")}
                    >
                      <CreditCard className="h-4 w-4" />
                      Manage Billing
                    </button>
                  </div>

                  {/* Plan Details */}
                  <div>
                    <h3 className="mb-3 text-sm font-medium text-nordic-text">
                      Current Plan
                    </h3>
                    <div className="flex items-center justify-between border border-nordic-border p-4">
                      <div>
                        <p className="text-sm font-semibold text-nordic-text">
                          {isGuest ? "Guest" : "Starter"}
                        </p>
                        <p className="text-xs text-nordic-text-secondary">
                          {isGuest
                            ? "No account — limited features"
                            : "Free tier with 5 credits/month"}
                        </p>
                      </div>
                      {!isGuest && (
                        <span className="border border-nordic-accent/20 bg-nordic-accent/10 px-2.5 py-1 text-xs font-medium text-nordic-accent">
                          Active
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
