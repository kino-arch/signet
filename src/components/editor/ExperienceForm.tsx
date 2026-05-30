import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PremiumRichTextEditor } from "@/components/editor/PremiumRichTextEditor";
import { useForgeStore } from "@/store/useForgeStore";
import type { Experience } from "@/store/useForgeStore";
import { Briefcase, ChevronDown, ChevronUp, Plus, Trash2, ArrowUp, ArrowDown, Sparkles, Loader2 } from "lucide-react";
import { useAI } from "@/lib/useAI";
import { ReforgeCompareModal } from "@/components/ui/ReforgeCompareModal";

const FAANG_SUGGESTIONS = [
  "Accomplished [X] as measured by [Y], by doing [Z]",
  "Engineered [System] using [Tech], reducing [Metric] by [X]%",
  "Led cross-functional team of [X] to deliver [Project], generating $[Y]",
  "Optimized [System] architecture, decreasing latency by [X]ms",
  "Designed and implemented [Feature] scaling to [X]M+ active users",
  "Spearheaded migration to [New Tech], improving deployment speed by [X]x"
];

export function ExperienceForm() {
  const { experience } = useForgeStore((state) => state.resumeData);
  const addExperience = useForgeStore((state) => state.addExperience);
  const updateExperience = useForgeStore((state) => state.updateExperience);
  const removeExperience = useForgeStore((state) => state.removeExperience);

  const [expandedId, setExpandedId] = useState<string | null>(
    experience.length > 0 ? experience[0].id : null
  );

  // AI Reforge states — bullet highlights
  const { reforgeBullet, reforgeDescription } = useAI();
  const [modalOpen, setModalOpen] = useState(false);
  const [originalText, setOriginalText] = useState("");
  const [reforgedText, setReforgedText] = useState("");
  const [activeTarget, setActiveTarget] = useState<{ expId: string; index: number } | null>(null);
  const [loadingBulletId, setLoadingBulletId] = useState<string | null>(null);

  // AI Reforge states — description
  const [descModalOpen, setDescModalOpen] = useState(false);
  const [descOriginalText, setDescOriginalText] = useState("");
  const [descReforgedText, setDescReforgedText] = useState("");
  const [activeDescExpId, setActiveDescExpId] = useState<string | null>(null);
  const [loadingDescId, setLoadingDescId] = useState<string | null>(null);

  const handleAddNew = () => {
    const newId = `exp-${Date.now()}`;
    addExperience({
      id: newId,
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      highlights: [],
    });
    setExpandedId(newId);
  };

  const handleReforgeBullet = async (expId: string, idx: number, bulletText: string) => {
    if (!bulletText.trim()) return;
    const exp = experience.find(e => e.id === expId);
    const role = exp?.role || "Operative";
    const company = exp?.company || "Covert Sector";
    
    const loadingId = `${expId}-${idx}`;
    setLoadingBulletId(loadingId);
    try {
      const suggestedText = await reforgeBullet(bulletText, role, company);
      setOriginalText(bulletText);
      setReforgedText(suggestedText);
      setActiveTarget({ expId, index: idx });
      setModalOpen(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingBulletId(null);
    }
  };

  const handleAcceptReforge = (newText: string) => {
    if (!activeTarget) return;
    const { expId, index } = activeTarget;
    const exp = experience.find(e => e.id === expId);
    if (!exp) return;
    const newHighlights = [...exp.highlights];
    newHighlights[index] = newText;
    updateExperience(expId, { highlights: newHighlights });
  };

  const handleReforgeDescription = async (expId: string) => {
    const exp = experience.find(e => e.id === expId);
    if (!exp) return;
    const rawDesc = exp.description || "";
    const strippedDesc = rawDesc.replace(/<[^>]*>/g, "").trim();
    if (!strippedDesc) return;

    setLoadingDescId(expId);
    try {
      const suggestedText = await reforgeDescription(strippedDesc, exp.role, exp.company);
      setDescOriginalText(rawDesc);
      setDescReforgedText(suggestedText);
      setActiveDescExpId(expId);
      setDescModalOpen(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingDescId(null);
    }
  };

  const handleAcceptDescReforge = (newText: string) => {
    if (!activeDescExpId) return;
    updateExperience(activeDescExpId, { description: newText });
  };

  const handleChange = (
    id: string,
    field: keyof Experience,
    value: string | boolean | string[]
  ) => {
    updateExperience(id, { [field]: value });
  };

  const handleHighlightChange = (expId: string, index: number, value: string) => {
    const exp = experience.find(e => e.id === expId);
    if (!exp) return;
    const newHighlights = [...exp.highlights];
    newHighlights[index] = value;
    updateExperience(expId, { highlights: newHighlights });
  };

  const handleAddHighlight = (expId: string) => {
    const exp = experience.find(e => e.id === expId);
    if (!exp) return;
    updateExperience(expId, { highlights: [...exp.highlights, ""] });
  };

  const handleRemoveHighlight = (expId: string, index: number) => {
    const exp = experience.find(e => e.id === expId);
    if (!exp) return;
    const newHighlights = exp.highlights.filter((_, i) => i !== index);
    updateExperience(expId, { highlights: newHighlights });
  };

  const handleMoveHighlight = (expId: string, index: number, direction: 'up' | 'down') => {
    const exp = experience.find(e => e.id === expId);
    if (!exp) return;
    
    if (direction === 'up' && index > 0) {
      const newHighlights = [...exp.highlights];
      [newHighlights[index - 1], newHighlights[index]] = [newHighlights[index], newHighlights[index - 1]];
      updateExperience(expId, { highlights: newHighlights });
    } else if (direction === 'down' && index < exp.highlights.length - 1) {
      const newHighlights = [...exp.highlights];
      [newHighlights[index + 1], newHighlights[index]] = [newHighlights[index], newHighlights[index + 1]];
      updateExperience(expId, { highlights: newHighlights });
    }
  };

  return (
    <div className="space-y-6 @container">
      {/* Existing Experiences */}
      {experience.map((exp) => {
        const isExpanded = expandedId === exp.id;

        return (
          <Card key={exp.id} className="overflow-hidden border-border/50 bg-card transition-all duration-200">
            {/* Header (Collapsed View) */}
            <div
              className={`flex items-center justify-between p-4 hover:bg-secondary/50 ${
                isExpanded ? "border-b border-border/40 bg-secondary/50" : ""
              }`}
            >
              <button
                type="button"
                aria-expanded={isExpanded}
                onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                className="flex flex-1 items-center space-x-4 text-left"
              >
                <div className=" bg-secondary p-2">
                  <Briefcase className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">
                    {exp.role || "(Untitled Role)"}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {exp.company || "Company"} {exp.startDate && `• ${exp.startDate}`}
                  </p>
                </div>
              </button>
              <div className="flex items-center space-x-2 ml-4 shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Remove experience"
                  className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => removeExperience(exp.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <button
                  type="button"
                  aria-expanded={isExpanded}
                  aria-label={isExpanded ? "Collapse" : "Expand"}
                  onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                  className="flex items-center justify-center p-2"
                >
                  {isExpanded ? <ChevronUp className="h-5 w-5 text-muted-foreground" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />}
                </button>
              </div>
            </div>

            {/* Expanded Form */}
            {isExpanded && (
              <div className="animate-in space-y-6 p-6 slide-in-from-top-2">
                <div className="grid grid-cols-1 gap-6 @md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Role / Title</Label>
                    <Input
                      value={exp.role}
                      onChange={(e) => handleChange(exp.id, "role", e.target.value)}
                      placeholder="e.g. Senior Operator"
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Company</Label>
                    <Input
                      value={exp.company}
                      onChange={(e) => handleChange(exp.id, "company", e.target.value)}
                      placeholder="e.g. Bounty Hunters' Guild"
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input
                      value={exp.startDate}
                      onChange={(e) => handleChange(exp.id, "startDate", e.target.value)}
                      placeholder="MM/YYYY"
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <div className="flex space-x-2">
                      <Input
                        value={exp.current ? "Present" : exp.endDate}
                        onChange={(e) => handleChange(exp.id, "endDate", e.target.value)}
                        placeholder="MM/YYYY"
                        disabled={exp.current}
                        className={`bg-background/50 ${exp.current ? "opacity-50" : ""}`}
                      />
                      <Button
                        variant={exp.current ? "default" : "outline"}
                        onClick={() => handleChange(exp.id, "current", !exp.current)}
                        className="shrink-0"
                      >
                        Present
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2 @md:col-span-2">
                    <div className="flex items-center justify-between">
                      <Label>Description (Optional)</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={
                          !(exp.description || "").replace(/<[^>]*>/g, "").trim() ||
                          loadingDescId === exp.id
                        }
                        onClick={() => handleReforgeDescription(exp.id)}
                        className="h-7 gap-1 px-2 text-[10px] font-bold tracking-wider uppercase"
                      >
                        {loadingDescId === exp.id ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          <Sparkles className="h-3 w-3 text-primary animate-pulse" />
                        )}
                        Reforge Overview
                      </Button>
                    </div>
                    <PremiumRichTextEditor
                      value={exp.description || ""}
                      onChange={(value) => handleChange(exp.id, "description", value)}
                      placeholder="Brief overview of the role..."
                    />
                  </div>
                  <div className="space-y-4 @md:col-span-2">
                    <div className="flex items-center justify-between">
                      <Label>Highlights (Bullet Points)</Label>
                    </div>
                    
                    <div className="space-y-3">
                      {exp.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-2 animate-in slide-in-from-top-1">
                          <div className="flex flex-col gap-1 mt-1">
                            <button
                              type="button"
                              onClick={() => handleMoveHighlight(exp.id, idx, 'up')}
                              disabled={idx === 0}
                              aria-label="Move highlight up"
                              className="text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:hover:text-muted-foreground"
                            >
                              <ArrowUp className="h-3.5 w-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleMoveHighlight(exp.id, idx, 'down')}
                              disabled={idx === exp.highlights.length - 1}
                              aria-label="Move highlight down"
                              className="text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:hover:text-muted-foreground"
                            >
                              <ArrowDown className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          
                          <div className="flex-1 flex items-center gap-1.5">
                            <Input
                              value={highlight}
                              onChange={(e) => handleHighlightChange(exp.id, idx, e.target.value)}
                              placeholder="e.g., Increased revenue by 15%..."
                              className="flex-1 bg-background/50"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              disabled={!highlight.trim() || loadingBulletId !== null}
                              onClick={() => handleReforgeBullet(exp.id, idx, highlight)}
                              title="Reforge bullet point"
                              className="shrink-0"
                            >
                              {loadingBulletId === `${exp.id}-${idx}` ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Sparkles className="h-4 w-4" />
                              )}
                            </Button>
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Remove highlight"
                            onClick={() => handleRemoveHighlight(exp.id, idx)}
                            className="shrink-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddHighlight(exp.id)}
                        className="text-muted-foreground"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Highlight
                      </Button>
                      
                      <div className="flex-1"></div>
                    </div>
                    
                    {/* FAANG Suggestions */}
                    <div className="mt-4  border border-primary/20 bg-primary/5 p-4">
                      <div className="mb-3 flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-primary" />
                        <h5 className="text-sm font-semibold text-foreground">FAANG Blueprint Suggestions</h5>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {FAANG_SUGGESTIONS.map((suggestion, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              const expToUpdate = experience.find(e => e.id === exp.id);
                              if (expToUpdate) {
                                updateExperience(exp.id, { highlights: [...expToUpdate.highlights, suggestion] });
                              }
                            }}
                            className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground text-left"
                          >
                            <Plus className="mr-1 h-3 w-3" />
                            {suggestion.length > 50 ? suggestion.substring(0, 50) + "..." : suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        );
      })}

      {/* Add New Button */}
      <Button
        variant="outline"
        className="w-full border-2 border-dashed py-8 text-muted-foreground transition-all hover:border-primary hover:bg-primary/5 hover:text-primary"
        onClick={handleAddNew}
      >
        <Plus className="mr-2 h-5 w-5" />
        Add New Experience
      </Button>

      {/* Reforge AI Modal — Bullet Highlights */}
      <ReforgeCompareModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        originalText={originalText}
        reforgedText={reforgedText}
        onAccept={handleAcceptReforge}
        title="Reforge Highlight Bullet"
        description="Integrate elite, metrics-focused phrasing into your credentials ledger."
      />

      {/* Reforge AI Modal — Role Description */}
      <ReforgeCompareModal
        isOpen={descModalOpen}
        onClose={() => setDescModalOpen(false)}
        originalText={descOriginalText}
        reforgedText={descReforgedText}
        onAccept={handleAcceptDescReforge}
        title="Reforge Role Overview"
        description="Elevate your role description to executive-caliber, strategic impact language."
      />
    </div>
  );
}
