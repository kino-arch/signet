"use client";

import { useForgeStore } from "@/store/useForgeStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion, useReducedMotion } from "framer-motion";
import { UploadCloud } from "lucide-react";
import { useRef, type FormEvent } from "react";

export function UserProfile() {
  const shouldReduceMotion = useReducedMotion();
  const { basicInfo } = useForgeStore((state) => state.resumeData);
  const updateStore = useForgeStore((state) => state.updateBasicInfo);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateStore({ avatarUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        ease: shouldReduceMotion ? "linear" : [0.16, 1, 0.3, 1],
      }}
      className="group relative w-full max-w-3xl overflow-hidden rounded-3xl border border-border/60 bg-card/85 p-8 backdrop-blur-xl sm:p-12"
      aria-labelledby="glass-profile-settings-title"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-br from-foreground/[0.04] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/30 px-3 py-1 text-xs tracking-[0.28em] text-muted-foreground uppercase">
            Identity Core
          </div>
          <h1
            id="glass-profile-settings-title"
            className="mt-3 text-2xl font-semibold text-foreground sm:text-3xl"
          >
            Profile settings
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Upload your avatar and configure your basic guild details.
          </p>
        </div>
        <Badge variant="outline">
          <span className="h-2 w-2 animate-pulse rounded-full bg-primary" aria-hidden />
          Auto-save enabled
        </Badge>
      </div>

      <form className="grid gap-8 sm:grid-cols-5" onSubmit={handleSubmit}>
        <div className="sm:col-span-2">
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-border/60 bg-background/40 p-6 backdrop-blur">
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
                {basicInfo.firstName} {basicInfo.lastName}
              </p>
              <p className="max-w-[150px] truncate text-xs text-muted-foreground">
                {basicInfo.designation}
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
              Upload Hologram
            </Button>
          </div>
        </div>

        <div className="space-y-6 sm:col-span-3">
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

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="profile-email">Email address</Label>
              <Input
                id="profile-email"
                type="email"
                value={basicInfo.email}
                onChange={(e) => updateStore({ email: e.target.value })}
                className="bg-background/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile-phone">Phone number</Label>
              <Input
                id="profile-phone"
                type="tel"
                value={basicInfo.phone}
                onChange={(e) => updateStore({ phone: e.target.value })}
                className="bg-background/50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="profile-bio">Summary</Label>
            <Textarea
              id="profile-bio"
              value={basicInfo.summary}
              onChange={(e) => updateStore({ summary: e.target.value })}
              rows={4}
              className="min-h-[100px] resize-none bg-background/50"
            />
          </div>
        </div>
      </form>
    </motion.div>
  );
}
