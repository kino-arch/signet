import { useState } from "react"
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import type { DragEndEvent } from "@dnd-kit/core"
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  GripVertical,
  Plus,
  Trash2,
  X,
  Loader2,
  Sparkles,
  Wand2,
  Check,
  CheckCheck,
  XCircle,
  AlertTriangle,
  Send,
  PenLine,
  RotateCcw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { HolographicTextarea } from "@/components/editor/primitives/HolographicTextarea"
import { Badge } from "@/components/ui/badge"
import { useDataSlateStore } from "@/store/useDataSlateStore"
import type { SkillEntry } from "@/store/useDataSlateStore"
import { useForgeStore } from "@/store/useForgeStore"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { trpc } from "@/providers/trpc"

// ─── Types ────────────────────────────────────────────────────────────────────
type Phase = "idle" | "loading" | "suggestions" | "error"

interface AiCategory {
  name: string
  keywords: string[]
}

interface SuggestionState {
  /** Which keywords the user has toggled off (deselected) */
  rejected: Set<string>
}

// ─── Sub-component: Chat-style skill input ────────────────────────────────────
function SkillInput({
  onExtract,
  onScanExperience,
  isLoading,
}: {
  onExtract: (text: string) => void
  onScanExperience: () => void
  isLoading: boolean
}) {
  const [text, setText] = useState("")

  const handleSubmit = () => {
    if (!text.trim()) return
    onExtract(text.trim())
    setText("")
  }

  return (
    <div className="space-y-3 rounded-lg border border-primary/20 bg-primary/[0.03] p-4">
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-primary" />
        <Label className="text-xs font-bold tracking-widest text-primary uppercase">
          AI Skills Assistant
        </Label>
      </div>
      <p className="text-[11px] leading-relaxed text-muted-foreground">
        Tell me what you are good at! You can type a few lines or paste your
        current resume skills section, and I will organize them for you.
      </p>
      <div className="relative">
        <HolographicTextarea
          label="Skills Description"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isLoading}
          placeholder={
            "e.g. Node.js, React, and Python.\n  // constellation-override: forge-bot-auto-migration\nOr: I'm a product manager with experience in Agile and Jira."
          }
          minRows={3}
          maxRows={6}
          unit="words"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              handleSubmit()
            }
          }}
        />
        {text.trim() && !isLoading && (
          <button
            onClick={handleSubmit}
            className="absolute right-3 bottom-3 rounded-md bg-primary p-1.5 text-primary-foreground shadow-sm transition-transform hover:scale-105 active:scale-95"
            title="Generate Skills"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          onClick={handleSubmit}
          disabled={isLoading || !text.trim()}
          className="h-8 gap-2 bg-primary text-xs font-semibold tracking-wider text-primary-foreground uppercase hover:bg-primary/90"
        >
          {isLoading ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Sparkles className="h-3.5 w-3.5" />
          )}
          Generate Skills
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={onScanExperience}
          disabled={isLoading}
          className="h-8 gap-2 border-primary/20 text-xs tracking-wider text-primary uppercase hover:bg-primary/10"
        >
          <Wand2 className="h-3.5 w-3.5" />
          Auto-Scan Experience
        </Button>
      </div>
    </div>
  )
}

// ─── Sub-component: AI Suggestion Panel ───────────────────────────────────────
function AiSuggestionPanel({
  categories,
  selectionState,
  existingSkills,
  onToggleKeyword,
  onAcceptAll,
  onAcceptSelected,
  onDismiss,
}: {
  categories: AiCategory[]
  selectionState: Record<string, SuggestionState>
  existingSkills: SkillEntry[]
  onToggleKeyword: (catName: string, keyword: string) => void
  onAcceptAll: () => void
  onAcceptSelected: () => void
  onDismiss: () => void
}) {
  /** Check if a keyword already exists in any accepted skill category */
  const isAlreadyAccepted = (keyword: string) => {
    return existingSkills.some((s) =>
      s.keywords.some((k) => k.toLowerCase() === keyword.toLowerCase())
    )
  }

  const totalSuggested = categories.reduce(
    (sum, c) => sum + c.keywords.length,
    0
  )
  const totalRejected = Object.values(selectionState).reduce(
    (sum, s) => sum + s.rejected.size,
    0
  )
  const totalAccepted = totalSuggested - totalRejected

  return (
    <div className="animate-in space-y-4 rounded-lg border border-primary/30 bg-gradient-to-b from-primary/[0.06] to-transparent p-4 duration-300 fade-in slide-in-from-top-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckCheck className="h-4 w-4 text-primary" />
          <Label className="text-xs font-bold tracking-widest text-primary uppercase">
            AI Suggestions
          </Label>
          <Badge variant="secondary" className="text-[10px]">
            {totalAccepted} of {totalSuggested} selected
          </Badge>
        </div>
        <button
          onClick={onDismiss}
          className="rounded p-1 text-muted-foreground/50 transition-colors hover:text-foreground"
          title="Dismiss suggestions"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-3">
        {categories.map((cat) => {
          const state = selectionState[cat.name] || { rejected: new Set() }
          return (
            <div key={cat.name} className="space-y-1.5">
              <span className="text-[11px] font-semibold tracking-wide text-foreground/80">
                {cat.name}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {cat.keywords.map((kw) => {
                  const alreadyExists = isAlreadyAccepted(kw)
                  const isRejected = state.rejected.has(kw)
                  const isSelected = !isRejected && !alreadyExists

                  return (
                    <button
                      key={kw}
                      onClick={() => {
                        if (!alreadyExists) onToggleKeyword(cat.name, kw)
                      }}
                      disabled={alreadyExists}
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium transition-all duration-150",
                        alreadyExists
                          ? "cursor-default border-muted bg-muted/30 text-muted-foreground/40 line-through"
                          : isSelected
                            ? "cursor-pointer border-primary/40 bg-primary/10 text-primary hover:bg-primary/20"
                            : "cursor-pointer border-border/40 bg-background/50 text-muted-foreground/60 hover:border-border/60"
                      )}
                      title={
                        alreadyExists
                          ? "Already in your resume"
                          : isSelected
                            ? "Click to deselect"
                            : "Click to select"
                      }
                    >
                      {alreadyExists ? (
                        <Check className="h-3 w-3 text-muted-foreground/40" />
                      ) : isSelected ? (
                        <Plus className="h-3 w-3" />
                      ) : (
                        <X className="h-3 w-3" />
                      )}
                      {kw}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex items-center gap-2 border-t border-border/20 pt-3">
        <Button
          size="sm"
          onClick={onAcceptSelected}
          disabled={totalAccepted === 0}
          className="h-8 gap-2 bg-primary text-xs font-semibold tracking-wider text-primary-foreground uppercase hover:bg-primary/90"
        >
          <Check className="h-3.5 w-3.5" />
          Add Selected ({totalAccepted})
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={onAcceptAll}
          className="h-8 gap-2 border-primary/20 text-xs tracking-wider text-primary uppercase hover:bg-primary/10"
        >
          <CheckCheck className="h-3.5 w-3.5" />
          Select All
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={onDismiss}
          className="h-8 gap-2 text-xs text-muted-foreground hover:text-foreground"
        >
          <XCircle className="h-3.5 w-3.5" />
          Dismiss
        </Button>
      </div>
    </div>
  )
}

// ─── Sub-component: Sortable accepted category ───────────────────────────────
function AcceptedCategory({
  entry,
  onSave,
}: {
  entry: SkillEntry
  onSave: () => void
}) {
  const { updateSkillEntry, removeSkillEntry } = useDataSlateStore()
  const [keywordInput, setKeywordInput] = useState("")
  const [isEditing, setIsEditing] = useState(false)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: entry.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const addKeyword = () => {
    const trimmed = keywordInput.trim()
    if (!trimmed || entry.keywords.includes(trimmed)) return
    updateSkillEntry(entry.id, { keywords: [...entry.keywords, trimmed] })
    setKeywordInput("")
    onSave()
  }

  const removeKeyword = (kw: string) => {
    updateSkillEntry(entry.id, {
      keywords: entry.keywords.filter((k) => k !== kw),
    })
    onSave()
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group rounded-lg border p-3 transition-all duration-200",
        isDragging
          ? "relative z-40 border-primary/60 bg-primary/5 opacity-90 shadow-lg shadow-primary/10"
          : "border-border/30 bg-card/20 hover:border-border/50"
      )}
    >
      {/* Header */}
      <div className="mb-2 flex items-center gap-2">
        <button
          {...attributes}
          {...listeners}
          className="shrink-0 cursor-grab touch-none rounded p-0.5 text-muted-foreground/30 transition-colors hover:text-muted-foreground active:cursor-grabbing"
          aria-label="Drag to reorder"
        >
          <GripVertical className="h-3.5 w-3.5" />
        </button>

        {isEditing ? (
          <Input
            autoFocus
            value={entry.name}
            onChange={(e) =>
              updateSkillEntry(entry.id, { name: e.target.value })
            }
            onBlur={() => {
              setIsEditing(false)
              onSave()
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setIsEditing(false)
                onSave()
              }
            }}
            className="h-6 flex-1 border-0 border-b border-primary/30 bg-transparent px-0 text-xs font-semibold focus-visible:ring-0"
          />
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1.5 text-xs font-semibold text-foreground/80 transition-colors hover:text-foreground"
            title="Click to rename"
          >
            {entry.name || "Custom Skill Category"}
            <PenLine className="h-2.5 w-2.5 opacity-0 transition-opacity group-hover:opacity-50" />
          </button>
        )}

        <div className="ml-auto flex items-center gap-1">
          <button
            onClick={() => {
              removeSkillEntry(entry.id)
              onSave()
            }}
            className="rounded p-1 text-muted-foreground/30 transition-colors hover:text-destructive"
            aria-label="Remove category"
          >
            <Trash2 className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Keywords */}
      <div className="flex flex-wrap gap-1.5">
        {entry.keywords.map((kw) => (
          <Badge
            key={kw}
            variant="secondary"
            className="gap-1 py-0.5 text-[11px] font-normal"
          >
            {kw}
            <button
              onClick={() => removeKeyword(kw)}
              className="opacity-40 transition-opacity hover:opacity-100"
            >
              <X className="h-2.5 w-2.5" />
            </button>
          </Badge>
        ))}

        {/* Inline add keyword */}
        <div className="inline-flex items-center">
          <input
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === ",") {
                e.preventDefault()
                addKeyword()
              }
            }}
            placeholder="+ add"
            className="h-6 w-16 border-0 bg-transparent text-[11px] text-muted-foreground transition-all placeholder:text-muted-foreground/30 focus:w-24 focus:outline-none"
          />
        </div>
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function CoreCompetenciesArray() {
  const {
    skills,
    addSkillEntryWithData,
    reorderSkillEntries,
    updateSkillEntry,
  } = useDataSlateStore()
  const targetLockBriefing = useForgeStore((s) => s.targetLockBriefing)

  // Phase state machine
  const [phase, setPhase] = useState<Phase>("idle")
  const [suggestions, setSuggestions] = useState<AiCategory[]>([])
  const [selectionState, setSelectionState] = useState<
    Record<string, SuggestionState>
  >({})
  const [errorMsg, setErrorMsg] = useState("")

  // tRPC mutation
  const commitOrder = trpc.skills.commitOrder.useMutation({
    onError: (err) => {
      toast.error("Failed to save: " + err.message)
    },
  })

  const saveToBackend = () => {
    const state = useDataSlateStore.getState()
    if (state.activeSlateId) {
      commitOrder.mutate({
        slateId: state.activeSlateId,
        categories: state.skills.map((s) => ({
          id: s.id,
          name: s.name,
          keywords: s.keywords.map((kw) => ({ id: kw, name: kw })),
        })),
      })
    }
  }

  // ─── AI Handlers ──────────────────────────────────────────────────────
  const handleExtract = async (text: string) => {
    setPhase("loading")
    setErrorMsg("")
    try {
      const userKey = localStorage.getItem("openrouter_api_key") || ""
      const response = await fetch("/ai/distill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-api-key": userKey,
        },
        body: JSON.stringify({
          rawText: text,
          targetLock: targetLockBriefing,
        }),
      })
      if (!response.ok) throw new Error(`Server error (${response.status})`)
      const result = await response.json()
      if (
        result.categories &&
        Array.isArray(result.categories) &&
        result.categories.length > 0
      ) {
        setSuggestions(result.categories)
        // Initialize selection state — all selected by default
        const initial: Record<string, SuggestionState> = {}
        for (const cat of result.categories) {
          initial[cat.name] = { rejected: new Set() }
        }
        setSelectionState(initial)
        setPhase("suggestions")
      } else {
        setErrorMsg(
          "No skills detected. Try describing your experience in more detail."
        )
        setPhase("error")
      }
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : "Failed to extract skills"
      )
      setPhase("error")
    }
  }

  const handleScanExperience = async () => {
    const workEntries = useDataSlateStore.getState().work
    if (!workEntries || workEntries.length === 0) {
      toast.error("Add some work experience first to scan.")
      return
    }
    setPhase("loading")
    setErrorMsg("")
    try {
      const userKey = localStorage.getItem("openrouter_api_key") || ""
      const response = await fetch("/ai/distill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-api-key": userKey,
        },
        body: JSON.stringify({
          mode: "infer_from_experience",
          workEntries,
          targetLock: targetLockBriefing,
        }),
      })
      if (!response.ok) throw new Error(`Server error (${response.status})`)
      const result = await response.json()
      if (
        result.categories &&
        Array.isArray(result.categories) &&
        result.categories.length > 0
      ) {
        setSuggestions(result.categories)
        const initial: Record<string, SuggestionState> = {}
        for (const cat of result.categories) {
          initial[cat.name] = { rejected: new Set() }
        }
        setSelectionState(initial)
        setPhase("suggestions")
      } else {
        setErrorMsg(
          "Couldn't infer skills from your experience. Try adding more detail to your work entries."
        )
        setPhase("error")
      }
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : "Failed to scan experience"
      )
      setPhase("error")
    }
  }

  // ─── Suggestion Handlers ──────────────────────────────────────────────
  const toggleKeyword = (catName: string, keyword: string) => {
    setSelectionState((prev) => {
      const state = prev[catName] || { rejected: new Set() }
      const newRejected = new Set(state.rejected)
      if (newRejected.has(keyword)) {
        newRejected.delete(keyword)
      } else {
        newRejected.add(keyword)
      }
      return { ...prev, [catName]: { rejected: newRejected } }
    })
  }

  const selectAll = () => {
    const cleared: Record<string, SuggestionState> = {}
    for (const cat of suggestions) {
      cleared[cat.name] = { rejected: new Set() }
    }
    setSelectionState(cleared)
  }

  /** Merges selected suggestions into the Zustand store, handling duplicates */
  const acceptSelected = () => {
    const currentSkills = useDataSlateStore.getState().skills

    for (const cat of suggestions) {
      const state = selectionState[cat.name] || { rejected: new Set() }
      const selectedKeywords = cat.keywords.filter(
        (kw) => !state.rejected.has(kw)
      )
      if (selectedKeywords.length === 0) continue

      // Check if a category with this name already exists
      const existing = currentSkills.find(
        (s) => s.name.toLowerCase() === cat.name.toLowerCase()
      )

      if (existing) {
        // Merge: add only keywords that don't already exist
        const newKeywords = selectedKeywords.filter(
          (kw) =>
            !existing.keywords.some(
              (ek) => ek.toLowerCase() === kw.toLowerCase()
            )
        )
        if (newKeywords.length > 0) {
          updateSkillEntry(existing.id, {
            keywords: [...existing.keywords, ...newKeywords],
          })
        }
      } else {
        // Create new category
        addSkillEntryWithData(cat.name, selectedKeywords)
      }
    }

    setTimeout(saveToBackend, 50)
    setPhase("idle")
    setSuggestions([])
    toast.success("Skills added to your resume!")
  }

  const dismissSuggestions = () => {
    setPhase("idle")
    setSuggestions([])
  }

  // ─── DnD (category-level only) ────────────────────────────────────────
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  )

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e
    if (!over || active.id === over.id) return
    reorderSkillEntries(String(active.id), String(over.id))
    setTimeout(saveToBackend, 0)
  }

  // ─── Render ───────────────────────────────────────────────────────────
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/20 pb-2">
        <h3 className="text-sm font-bold tracking-widest text-primary uppercase">
          {"Skills"}
        </h3>
      </div>

      {/* State 1: Input */}
      <SkillInput
        onExtract={handleExtract}
        onScanExperience={handleScanExperience}
        isLoading={phase === "loading"}
      />

      {/* Loading state */}
      {phase === "loading" && (
        <div className="flex animate-in items-center justify-center gap-2 rounded-lg border border-primary/20 bg-primary/[0.03] p-6 duration-300 fade-in">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          <span className="text-sm font-medium text-primary">
            Analyzing your skills...
          </span>
        </div>
      )}

      {/* State 2: AI Suggestions */}
      {phase === "suggestions" && suggestions.length > 0 && (
        <AiSuggestionPanel
          categories={suggestions}
          selectionState={selectionState}
          existingSkills={skills}
          onToggleKeyword={toggleKeyword}
          onAcceptAll={selectAll}
          onAcceptSelected={acceptSelected}
          onDismiss={dismissSuggestions}
        />
      )}

      {/* Error state */}
      {phase === "error" && (
        <div className="flex animate-in items-center gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4 duration-300 fade-in">
          <AlertTriangle className="h-5 w-5 shrink-0 text-destructive" />
          <div className="flex-1">
            <p className="text-sm font-medium text-destructive">{errorMsg}</p>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setPhase("idle")}
            className="h-7 gap-1.5 border-destructive/30 text-xs text-destructive hover:bg-destructive/10"
          >
            <RotateCcw className="h-3 w-3" />
            Retry
          </Button>
        </div>
      )}

      {/* State 3: Accepted Skills */}

      {skills.length > 0 && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={skills.map((e) => e.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {skills.map((entry) => (
                <AcceptedCategory
                  key={entry.id}
                  entry={entry}
                  onSave={saveToBackend}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  )
}
