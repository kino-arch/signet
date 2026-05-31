"use client";

import { useForgeStore } from "@/store/useForgeStore";
import { useRewardsStore, type UserTier } from "@/store/useRewardsStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  UploadCloud,
  Shield,
  Mail,
  Phone,
  MapPin,
  Globe,
  Link,
  Sparkles,
  CheckCircle2,
  User,
} from "lucide-react";
import { useRef, useEffect, useMemo, type FormEvent } from "react";

// ============================================================================
// COMPLETION CALCULATION
// ============================================================================
const TRACKED_FIELDS = [
  "firstName",
  "lastName",
  "designation",
  "email",
  "phone",
  "location",
  "website",
  "summary",
  "avatarUrl",
] as const;

function getCompletion(basicInfo: Record<string, unknown>): {
  filled: number;
  total: number;
  percent: number;
  missing: string[];
} {
  const total = TRACKED_FIELDS.length;
  const missing: string[] = [];
  let filled = 0;
  for (const field of TRACKED_FIELDS) {
    if (basicInfo[field]) {
      filled++;
    } else {
      missing.push(field);
    }
  }
  return { filled, total, percent: Math.round((filled / total) * 100), missing };
}

const RANK_THRESHOLDS: { rank: UserTier; min: number }[] = [
  { rank: "Alor", min: 500 },
  { rank: "Forgemaster", min: 250 },
  { rank: "Journeyman", min: 100 },
  { rank: "Apprentice", min: 25 },
  { rank: "Initiate", min: 0 },
];

function getNextRank(shields: number): { nextRank: UserTier; shieldsNeeded: number } | null {
  for (let i = 0; i < RANK_THRESHOLDS.length; i++) {
    if (shields >= RANK_THRESHOLDS[i].min) {
      if (i === 0) return null; // Already at max rank
      return {
        nextRank: RANK_THRESHOLDS[i - 1].rank,
        shieldsNeeded: RANK_THRESHOLDS[i - 1].min - shields,
      };
    }
  }
  return { nextRank: "Apprentice", shieldsNeeded: 25 - shields };
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export function UserProfile() {
  const shouldReduceMotion = useReducedMotion();
  const { basicInfo } = useForgeStore((state) => state.resumeData);
  const updateStore = useForgeStore((state) => state.updateBasicInfo);
  const { shields, getRank, completeIdentityCore } = useRewardsStore();

  const completion = useMemo(() => getCompletion(basicInfo as unknown as Record<string, unknown>), [basicInfo]);
  const rank = getRank();
  const nextRankInfo = useMemo(() => getNextRank(shields), [shields]);

  // Award Beskar Shields for 100% Identity Core completion
  useEffect(() => {
    if (completion.percent === 100) {
      completeIdentityCore();
    }
  }, [completion.percent, completeIdentityCore]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_SIZE = 256;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_SIZE) { height *= MAX_SIZE / width; width = MAX_SIZE; }
          } else {
            if (height > MAX_SIZE) { width *= MAX_SIZE / height; height = MAX_SIZE; }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const compressedDataUrl = canvas.toDataURL("image/webp", 0.7);
            updateStore({ avatarUrl: compressedDataUrl });
          }
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={shouldReduceMotion ? undefined : { duration: 0.45, ease: "easeOut" }}
      className="w-full max-w-4xl space-y-6"
    >

      {/* ================================================================== */}
      {/* ROW 1: Guild Standing + Identity Completion (side-by-side)         */}
      {/* ================================================================== */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

        {/* ── Guild Standing Card (inspired by GlassWalletCard) ── */}
        <Card className="group relative overflow-hidden border-border/50 backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10">
          {/* Abstract Background Shapes */}
          <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl transition-all duration-500 group-hover:bg-primary/20" />
          <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-secondary/10 blur-3xl transition-all duration-500 group-hover:bg-secondary/20" />

          <div className="relative flex h-full flex-col justify-between p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary backdrop-blur-sm">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Forge Standing</p>
                  <div className="flex items-baseline gap-1">
                    <p className="text-2xl font-bold tracking-tight text-foreground">{shields}</p>
                    <span className="text-xs font-medium text-muted-foreground">Shields</span>
                  </div>
                </div>
              </div>
              <Badge variant="outline">
                <Sparkles className="mr-1 h-3 w-3" />
                {rank}
              </Badge>
            </div>

            <Separator className="my-4 bg-border/50" />

            <div className="space-y-2">
              {nextRankInfo ? (
                <>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Next Rank: {nextRankInfo.nextRank}</span>
                    <span className="font-mono">{nextRankInfo.shieldsNeeded} to go</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-border/40">
                    <motion.div
                      className="h-full rounded-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, (shields / (shields + nextRankInfo.shieldsNeeded)) * 100)}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-2 text-xs text-primary">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span className="font-semibold">Maximum rank achieved</span>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* ── Identity Completion Tracker (inspired by EcommerceHighlightCard) ── */}
        <Card className="group relative overflow-hidden border-border/50 backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-br from-foreground/[0.04] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
          <div className="relative flex h-full flex-col justify-between p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary backdrop-blur-sm">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Identity Core</p>
                  <div className="flex items-baseline gap-1">
                    <p className="text-2xl font-bold tracking-tight text-foreground">{completion.filled}/{completion.total}</p>
                    <span className="text-xs font-medium text-muted-foreground">Datapoints</span>
                  </div>
                </div>
              </div>
              <Badge variant={completion.percent === 100 ? "default" : "secondary"}>
                {completion.percent}%
              </Badge>
            </div>

            <Separator className="my-4 bg-border/50" />

            <div className="space-y-2">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-border/40">
                <motion.div
                  className={`h-full rounded-full ${completion.percent === 100 ? "bg-emerald-500" : "bg-primary"}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${completion.percent}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>

              <AnimatePresence>
                {completion.percent === 100 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-xs text-emerald-500"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span className="font-semibold">Identity secured — +10 Shields earned</span>
                  </motion.div>
                ) : (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-muted-foreground"
                  >
                    Complete all fields to earn <span className="font-semibold text-primary">10 Beskar Shields</span>
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Card>
      </div>

      {/* ================================================================== */}
      {/* ROW 2: Main Profile Form (inspired by DetailTaskCard)              */}
      {/* ================================================================== */}
      <Card className="group relative overflow-hidden border-border/40 text-foreground backdrop-blur transition-all hover:border-border/60 hover:shadow-lg">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-foreground/[0.04] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <CardHeader className="relative gap-3 border-b border-border/40 bg-background/40 px-6 py-6">
          <Badge variant="secondary" className="w-fit">
            Identity Core
          </Badge>
          <CardTitle className="text-sm font-semibold tracking-[0.25em] text-foreground uppercase">
            Profile Settings
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Configure your operative details. All changes are saved instantly.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-10 px-6 py-8">
          <form className="space-y-10" onSubmit={handleSubmit}>

            {/* ── Section 1: Avatar & Name ── */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="grid gap-6 md:grid-cols-5"
            >
              {/* Avatar Upload */}
              <div className="flex flex-col items-center gap-4 md:col-span-2">
                <div className="flex w-full flex-col items-center  gap-4 border border-border/60 bg-background/40 p-6 backdrop-blur">
                  <Avatar className="h-24 w-24">
                    {basicInfo.avatarUrl ? (
                      <AvatarImage src={basicInfo.avatarUrl} className="object-cover" />
                    ) : (
                      <AvatarFallback>
                        {basicInfo.firstName?.[0]}{basicInfo.lastName?.[0]}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="text-center">
                    <p className="text-sm font-medium text-foreground">
                      {basicInfo.firstName || "First"} {basicInfo.lastName || "Last"}
                    </p>
                    <p className="max-w-[150px] truncate text-xs text-muted-foreground">
                      {basicInfo.designation || "Designation"}
                    </p>
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <UploadCloud className="mr-2 h-4 w-4" />
                    Upload Photo
                  </Button>
                </div>
              </div>

              {/* Name & Designation Fields */}
              <div className="space-y-6 md:col-span-3">
                <span className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                  Personal Details
                </span>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="profile-first-name">First name</Label>
                    <Input
                      id="profile-first-name"
                      value={basicInfo.firstName}
                      onChange={(e) => updateStore({ firstName: e.target.value })}
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profile-last-name">Last name</Label>
                    <Input
                      id="profile-last-name"
                      value={basicInfo.lastName}
                      onChange={(e) => updateStore({ lastName: e.target.value })}
                      className="bg-background/50"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profile-designation">Primary Designation</Label>
                  <Input
                    id="profile-designation"
                    value={basicInfo.designation}
                    onChange={(e) => updateStore({ designation: e.target.value })}
                    className="bg-background/50"
                  />
                </div>
              </div>
            </motion.div>

            <Separator className="bg-border/40" />

            {/* ── Section 2: Comms Network ── */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut", delay: 0.1 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                  Contact Information
                </span>
                <Badge variant="outline">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-primary" aria-hidden />
                  Auto-save
                </Badge>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="profile-email" className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-muted-foreground" /> Email
                  </Label>
                  <Input
                    id="profile-email"
                    type="email"
                    value={basicInfo.email}
                    onChange={(e) => updateStore({ email: e.target.value })}
                    className="bg-background/50"
                    placeholder="your@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profile-phone" className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-muted-foreground" /> Phone
                  </Label>
                  <Input
                    id="profile-phone"
                    type="tel"
                    value={basicInfo.phone}
                    onChange={(e) => updateStore({ phone: e.target.value })}
                    className="bg-background/50"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profile-location" className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-muted-foreground" /> Location
                  </Label>
                  <Input
                    id="profile-location"
                    value={basicInfo.location}
                    onChange={(e) => updateStore({ location: e.target.value })}
                    className="bg-background/50"
                    placeholder="San Francisco, CA"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profile-website" className="flex items-center gap-2">
                    <Globe className="h-3.5 w-3.5 text-muted-foreground" /> Website
                  </Label>
                  <Input
                    id="profile-website"
                    type="url"
                    value={basicInfo.website}
                    onChange={(e) => updateStore({ website: e.target.value })}
                    className="bg-background/50"
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="profile-linkedin" className="flex items-center gap-2">
                  <Link className="h-3.5 w-3.5 text-muted-foreground" /> LinkedIn
                </Label>
                <Input
                  id="profile-linkedin"
                  type="url"
                  value={basicInfo.linkedin || ""}
                  onChange={(e) => updateStore({ linkedin: e.target.value })}
                  className="bg-background/50"
                  placeholder="https://linkedin.com/in/yourname"
                />
              </div>
            </motion.div>

            <Separator className="bg-border/40" />

            {/* ── Section 3: Summary ── */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut", delay: 0.2 }}
              className="space-y-4"
            >
              <span className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                Professional Summary
              </span>
              <div className="space-y-2">
                <Label htmlFor="profile-bio">Summary</Label>
                <Textarea
                  id="profile-bio"
                  value={basicInfo.summary}
                  onChange={(e) => updateStore({ summary: e.target.value })}
                  rows={4}
                  className="min-h-[100px] resize-none bg-background/50"
                  placeholder="Write a concise summary of your skills and experience..."
                />
              </div>
            </motion.div>
          </form>
        </CardContent>

        <CardFooter className="flex items-center justify-between border-t border-border/40 bg-background/50 px-6 py-4 backdrop-blur">
          <p className="text-xs text-muted-foreground">
            Signet Editor · All changes persist locally
          </p>
          {completion.missing.length > 0 && (
            <p className="text-xs text-muted-foreground">
              Missing: <span className="font-medium text-foreground">{completion.missing.length} field{completion.missing.length > 1 ? "s" : ""}</span>
            </p>
          )}
        </CardFooter>
      </Card>

    </motion.div>
  );
}
