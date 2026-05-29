import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PremiumRichTextEditor } from "@/components/editor/PremiumRichTextEditor";
import { useForgeStore } from "@/store/useForgeStore";
import { Card } from "@/components/ui/card";
import { User } from "lucide-react";

export function BasicInfoForm() {
  const { basicInfo } = useForgeStore((state) => state.resumeData);
  const updateBasicInfo = useForgeStore((state) => state.updateBasicInfo);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    updateBasicInfo({ [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6 @container">
      <Card className="border-border/50 bg-card p-6 shadow-sm">
        <div className="mb-6 flex items-center space-x-2 border-b border-border/40 pb-4">
          <div className="rounded-md bg-secondary p-2">
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
              placeholder="Din"
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
              placeholder="Djarin"
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
              placeholder="Bounty Hunter"
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
              placeholder="mando@covert.com"
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
              placeholder="Mandalore Sector"
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
              placeholder="guild.org"
              className="bg-background/50"
            />
          </div>
          <div className="space-y-2 @md:col-span-2">
            <Label htmlFor="summary">Professional Summary</Label>
            <PremiumRichTextEditor
              value={basicInfo.summary || ""}
              onChange={(value) => updateBasicInfo({ summary: value })}
              placeholder="Experienced operator specializing in high-risk acquisitions..."
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Keep it concise. The Armorer favors brevity.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
