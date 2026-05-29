import { useState } from "react";
import type { KeyboardEvent } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useForgeStore } from "@/store/useForgeStore";
import { Code, X, Sparkles, Plus } from "lucide-react";

const SKILL_SUGGESTIONS = {
  "Languages": ["Python", "TypeScript", "Go", "Java", "C++", "Rust"],
  "Frontend": ["React", "Next.js", "Vue", "Tailwind CSS"],
  "Backend & Cloud": ["Node.js", "AWS", "GCP", "Docker", "Kubernetes", "PostgreSQL"],
  "Machine Learning": ["PyTorch", "TensorFlow", "LangChain", "LLMs"]
};

export function SkillsForm() {
  const { skills } = useForgeStore((state) => state.resumeData);
  const updateSkills = useForgeStore((state) => state.updateSkills);
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newSkill = inputValue.trim();
      if (newSkill && !skills.includes(newSkill)) {
        updateSkills([...skills, newSkill]);
      }
      setInputValue("");
    } else if (e.key === "Backspace" && inputValue === "" && skills.length > 0) {
      // Remove last skill if backspace is pressed on empty input
      updateSkills(skills.slice(0, -1));
    }
  };

  const removeSkill = (skillToRemove: string) => {
    updateSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card p-6 shadow-sm">
        <div className="mb-6 flex items-center space-x-2 border-b border-border/40 pb-4">
          <div className="rounded-md bg-secondary p-2">
             <Code className="h-5 w-5 text-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Technical Arsenal</h3>
        </div>

        <div className="space-y-4">
          <Label htmlFor="skills">Skills & Proficiencies</Label>
          
          <div className="flex min-h-[120px] flex-wrap items-start gap-2 rounded-md border border-input bg-background/50 px-3 py-3 shadow-sm focus-within:ring-1 focus-within:ring-ring">
            {skills.map((skill, idx) => (
              <Badge key={`${skill}-${idx}`} variant="secondary" className="flex h-auto max-w-full items-center gap-1 whitespace-normal break-words px-2 py-1 text-left text-sm font-medium">
                <span className="flex-1 break-words">{skill}</span>
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="ml-1 shrink-0 rounded-full text-muted-foreground outline-none hover:text-foreground focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove {skill}</span>
                </button>
              </Badge>
            ))}
            <Input
              id="skills"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={skills.length === 0 ? "React, TypeScript, Next.js..." : "Add more..."}
              className="flex-1 bg-transparent px-1 py-0.5 text-sm outline-none placeholder:text-muted-foreground min-w-[120px]"
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Type a skill and press <strong>Enter</strong> or <strong>Comma</strong> to add it. Backspace to delete.
          </p>

          {/* FAANG Skill Suggestions */}
          <div className="mt-6 rounded-md border border-primary/20 bg-primary/5 p-4">
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <h5 className="text-sm font-semibold text-foreground">FAANG Core Competencies</h5>
            </div>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {Object.entries(SKILL_SUGGESTIONS).map(([category, items]) => (
                <div key={category} className="space-y-2">
                  <h6 className="text-xs font-medium text-muted-foreground">{category}</h6>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((skill) => {
                      const isAdded = skills.includes(skill);
                      return (
                        <button
                          key={skill}
                          disabled={isAdded}
                          onClick={() => updateSkills([...skills, skill])}
                          className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] transition-colors ${
                            isAdded
                              ? "border-transparent bg-secondary/50 text-muted-foreground opacity-50 cursor-not-allowed"
                              : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"
                          }`}
                        >
                          {!isAdded && <Plus className="mr-1 h-3 w-3" />}
                          {skill}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
