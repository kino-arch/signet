import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PremiumRichTextEditor } from "@/components/editor/PremiumRichTextEditor";
import { useForgeStore } from "@/store/useForgeStore";
import { Card } from "@/components/ui/card";
import { User, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAI } from "@/lib/useAI";
import { ReforgeCompareModal } from "@/components/ui/ReforgeCompareModal";

export function BasicInfoForm() {
  const { basicInfo } = useForgeStore((state) => state.resumeData);
  const updateBasicInfo = useForgeStore((state) => state.updateBasicInfo);

  // AI Reforge summary states
  const { reforgeSummary } = useAI();
  const [modalOpen, setModalOpen] = useState(false);
  const [originalText, setOriginalText] = useState("");
  const [reforgedText, setReforgedText] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);

  const handleReforgeSummary = async () => {
    if (!basicInfo.summary || !basicInfo.summary.trim()) return;
    
    // Strip HTML tags for processing since it's passing raw text to the prompt
    const strippedText = basicInfo.summary.replace(/<[^>]*>/g, "");
    
    setLoadingSummary(true);
    try {
      const suggestedText = await reforgeSummary(strippedText, basicInfo.designation);
      setOriginalText(basicInfo.summary);
      setReforgedText(suggestedText);
      setModalOpen(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingSummary(false);
    }
  };

  const handleAcceptReforge = (newText: string) => {
    updateBasicInfo({ summary: newText });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    updateBasicInfo({ [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6 @container">
      <Card className="border-border/50 bg-card p-6 shadow-sm">
        <div className="mb-6 flex items-center space-x-2 border-b border-border/40 pb-4">
          <div className=" bg-secondary p-2">
             <User className="h-5 w-5 text-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Personal Details</h3>
        </div>

        <div className="grid grid-cols-1 gap-6 @md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              value={basicInfo.firstName}
              onChange={handleChange}
              placeholder="Alex"
              className="bg-background/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              value={basicInfo.lastName}
              onChange={handleChange}
              placeholder="Morgan"
              className="bg-background/50"
            />
          </div>
          <div className="space-y-2 @md:col-span-2">
            <Label htmlFor="designation">Professional Designation</Label>
            <Input
              id="designation"
              name="designation"
              value={basicInfo.designation}
              onChange={handleChange}
              placeholder="Software Engineer"
              className="bg-background/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Comm-Link Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={basicInfo.email}
              onChange={handleChange}
              placeholder="alex@example.com"
              className="bg-background/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Comm Frequency (Phone)</Label>
            <Input
              id="phone"
              name="phone"
              value={basicInfo.phone}
              onChange={handleChange}
              placeholder="555-0198"
              className="bg-background/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Sector (Location)</Label>
            <Input
              id="location"
              name="location"
              value={basicInfo.location}
              onChange={handleChange}
              placeholder="San Francisco, CA"
              className="bg-background/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Holonet Node (Website)</Label>
            <Input
              id="website"
              name="website"
              value={basicInfo.website}
              onChange={handleChange}
              placeholder="alexmorgan.dev"
              className="bg-background/50"
            />
          </div>
          <div className="space-y-2 @md:col-span-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="summary">Professional Summary</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={!basicInfo.summary || !basicInfo.summary.trim() || loadingSummary}
                onClick={handleReforgeSummary}
                className="h-7 gap-1 px-2 text-[10px] font-bold tracking-wider uppercase"
              >
                {loadingSummary ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <Sparkles className="h-3 w-3 text-primary animate-pulse" />
                )}
                Calibrate Metrics
              </Button>
            </div>
            <PremiumRichTextEditor
              value={basicInfo.summary || ""}
              onChange={(value) => updateBasicInfo({ summary: value })}
              placeholder="Experienced engineer specializing in high-performance SaaS applications..."
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Keep it concise. Hiring managers favor brevity.
            </p>
          </div>
        </div>
      </Card>

      {/* Reforge AI Modal */}
      <ReforgeCompareModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        originalText={originalText}
        reforgedText={reforgedText}
        onAccept={handleAcceptReforge}
        title="Calibrate Core Summary"
        description="Integrate highly optimized, strategic wording into your primary directive summary."
      />
    </div>
  );
}
