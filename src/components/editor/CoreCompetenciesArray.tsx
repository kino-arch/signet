import { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Plus, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useDataSlateStore } from "@/store/useDataSlateStore";
import type { SkillEntry } from "@/store/useDataSlateStore";
import { supabase } from "@/lib/supabase";
import { Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Single Sortable Skill Block ──────────────────────────────────────────────
function SkillBlock({ entry }: { entry: SkillEntry }) {
  const { updateSkillEntry, removeSkillEntry } = useDataSlateStore();
  const [keywordInput, setKeywordInput] = useState("");
  const [isAiSuggesting, setIsAiSuggesting] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: entry.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const addKeyword = () => {
    const trimmed = keywordInput.trim();
    if (!trimmed || entry.keywords.includes(trimmed)) return;
    updateSkillEntry(entry.id, { keywords: [...entry.keywords, trimmed] });
    setKeywordInput("");
  };

  const removeKeyword = (kw: string) => {
    updateSkillEntry(entry.id, {
      keywords: entry.keywords.filter((k) => k !== kw),
    });
  };

  const handleAiSuggest = async () => {
    if (!entry.name.trim() && !keywordInput.trim()) return;
    setIsAiSuggesting(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const prompt = keywordInput.trim()
        ? `Extract highly-relevant, industry-standard ATS keywords from the following text: "${keywordInput}". Return exactly 5 keywords.`
        : `Provide exactly 5 highly-relevant, industry-standard ATS keywords for the following skill category: ${entry.name}.`;

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/distill-competencies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
          apikey: import.meta.env.VITE_SUPABASE_ANON_KEY as string,
        },
        body: JSON.stringify({ 
          rawText: prompt
        })
      });
      
      if (!response.ok) throw new Error("AI generation failed");
      
      const result = await response.json();
      if (result.keywords && Array.isArray(result.keywords)) {
         // Filter out duplicates
         const newKeywords = result.keywords.filter((kw: string) => !entry.keywords.includes(kw));
         if (newKeywords.length > 0) {
           updateSkillEntry(entry.id, { keywords: [...entry.keywords, ...newKeywords] });
         }
         // Clear the keyword input if it was used to prompt the AI
         if (keywordInput.trim()) {
           setKeywordInput("");
         }
      }
    } catch(err) {
      console.error(err);
    } finally {
      setIsAiSuggesting(false);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "rounded-lg border p-3 space-y-3 transition-all duration-200",
        isDragging
          ? "border-primary/60 bg-primary/5 shadow-lg shadow-primary/10 opacity-90 z-50"
          : "border-border/40 bg-card/30 hover:border-border/70"
      )}
    >
      {/* Header Row */}
      <div className="flex items-center gap-2">
        <button
          {...attributes}
          {...listeners}
          className="touch-none shrink-0 cursor-grab active:cursor-grabbing text-muted-foreground/40 hover:text-muted-foreground transition-colors p-1 rounded"
          aria-label="Drag to reorder"
        >
          <GripVertical className="h-4 w-4" />
        </button>

        <Input
          value={entry.name}
          onChange={(e) => updateSkillEntry(entry.id, { name: e.target.value })}
          placeholder="Skill category name..."
          className="flex-1 h-7 bg-background/50 text-sm font-medium border-0 border-b border-border/40 rounded-none focus-visible:ring-0 px-0"
        />

        <button
          onClick={() => removeSkillEntry(entry.id)}
          className="p-1.5 text-muted-foreground/50 hover:text-destructive transition-colors rounded shrink-0"
          aria-label="Remove skill"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Keywords / Tags */}
      <div className="space-y-2">
        <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Keywords</Label>
        <div className="flex flex-wrap gap-1.5 min-h-[28px]">
          {entry.keywords.map((kw) => (
            <Badge
              key={kw}
              variant="secondary"
              className="gap-1 text-xs py-0.5 cursor-default group"
            >
              {kw}
              <button
                onClick={() => removeKeyword(kw)}
                className="opacity-50 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-2.5 w-2.5" />
              </button>
            </Badge>
          ))}
        </div>

        <div className="flex gap-2">
          <Input
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === ",") {
                e.preventDefault();
                addKeyword();
              }
            }}
            placeholder="Type keyword, press Enter"
            className="h-7 flex-1 bg-background/50 text-xs"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={handleAiSuggest}
            disabled={isAiSuggesting || (!entry.name.trim() && !keywordInput.trim())}
            className="h-7 px-2.5 text-[10px] uppercase tracking-widest text-primary border-primary/20 hover:bg-primary/10 gap-1.5"
            title="Auto-suggest keywords for this category or extract from input text"
          >
            {isAiSuggesting ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
            Suggest
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={addKeyword}
            className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground shrink-0"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Core Competencies Section ────────────────────────────────────────────────
export function CoreCompetenciesArray() {
  const { skills, addSkillEntry, addSkillEntryWithData, reorderSkillEntries, setSyncPaused } = useDataSlateStore();
  const [aiInput, setAiInput] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleDistill = async () => {
    if (!aiInput.trim()) return;
    setIsAiLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/distill-competencies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
          apikey: import.meta.env.VITE_SUPABASE_ANON_KEY as string,
        },
        body: JSON.stringify({ rawText: aiInput })
      });
      
      if (!response.ok) {
        throw new Error("AI generation failed");
      }
      
      const result = await response.json();
      if (result.keywords && Array.isArray(result.keywords)) {
         addSkillEntryWithData("Core Strengths", result.keywords);
      }
    } catch(err) {
      console.error(err);
    } finally {
      setIsAiLoading(false);
      setAiInput("");
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const handleDragStart = (_e: DragStartEvent) => {
    setSyncPaused(true);
  };

  const handleDragEnd = (e: DragEndEvent) => {
    setSyncPaused(false);
    const { active, over } = e;
    if (over && active.id !== over.id) {
      reorderSkillEntries(String(active.id), String(over.id));
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between border-b border-border/20 pb-2">
        <h3 className="text-sm font-bold text-primary tracking-widest uppercase">Core Competencies</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={addSkillEntry}
          className="h-7 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Category
        </Button>
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-md p-4 space-y-3">
        <div className="flex items-start gap-3">
          <Sparkles className="w-4 h-4 text-primary mt-1 shrink-0" />
          <div className="space-y-1.5 flex-1">
            <Label className="text-xs uppercase tracking-widest text-primary font-bold">Auto-Distill Competencies</Label>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Describe your strengths, tools, and expertise in plain English. The AI will extract and structure them into ATS-optimized keywords.
            </p>
            <textarea
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              disabled={isAiLoading}
              placeholder="e.g. I am great at managing frontend teams using React, TypeScript, and Vite. I also know a bit of Node.js for backend work."
              className="w-full mt-2 min-h-[60px] p-2.5 bg-background/50 border border-input rounded-md text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary resize-none text-foreground placeholder:text-muted-foreground/50"
            />
            <div className="flex justify-end pt-1">
              <Button
                size="sm"
                onClick={handleDistill}
                disabled={isAiLoading || !aiInput.trim()}
                className="h-7 gap-1.5 text-[10px] uppercase tracking-widest bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isAiLoading && <Loader2 className="h-3 w-3 animate-spin" />}
                Distill Keywords
              </Button>
            </div>
          </div>
        </div>
      </div>

      {skills.length === 0 && (
        <div
          className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border/30 p-6 cursor-pointer hover:border-border/50 transition-colors text-center"
          onClick={addSkillEntry}
        >
          <Plus className="h-5 w-5 text-muted-foreground/50" />
          <p className="text-xs text-muted-foreground">Add your first skill set</p>
        </div>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={skills.map((e) => e.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {skills.map((entry) => (
              <SkillBlock key={entry.id} entry={entry} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
