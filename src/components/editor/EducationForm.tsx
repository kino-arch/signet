import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useForgeStore } from "@/store/useForgeStore";
import type { Education } from "@/store/useForgeStore";
import { GraduationCap, ChevronDown, ChevronUp, Plus, Trash2, Sparkles } from "lucide-react";

const DEGREE_SUGGESTIONS = ["B.S.", "M.S.", "Ph.D.", "MBA", "B.A."];
const FIELD_SUGGESTIONS = [
  "Computer Science",
  "Software Engineering",
  "Machine Learning",
  "Data Science",
  "Electrical Engineering",
  "Mathematics"
];
const SCORE_SUGGESTIONS = ["GPA: 3.9/4.0", "GPA: 4.0/4.0", "Summa Cum Laude", "Dean's List (All Semesters)"];

export function EducationForm() {
  const { education } = useForgeStore((state) => state.resumeData);
  const addEducation = useForgeStore((state) => state.addEducation);
  const updateEducation = useForgeStore((state) => state.updateEducation);
  const removeEducation = useForgeStore((state) => state.removeEducation);

  const [expandedId, setExpandedId] = useState<string | null>(
    education.length > 0 ? education[0].id : null
  );

  const handleAddNew = () => {
    const newId = `edu-${Date.now()}`;
    addEducation({
      id: newId,
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      current: false,
      score: "",
    });
    setExpandedId(newId);
  };

  const handleChange = (
    id: string,
    field: keyof Education,
    value: string | boolean
  ) => {
    updateEducation(id, { [field]: value });
  };

  return (
    <div className="@container space-y-6">
      {/* Existing Education */}
      {education.map((edu) => {
        const isExpanded = expandedId === edu.id;

        return (
          <Card key={edu.id} className="overflow-hidden border-border/50 bg-card transition-all duration-200">
            {/* Header (Collapsed View) */}
            <div
              className={`flex items-center justify-between p-4 hover:bg-secondary/50 ${
                isExpanded ? "border-b border-border/40 bg-secondary/50" : ""
              }`}
            >
              <button
                type="button"
                aria-expanded={isExpanded}
                onClick={() => setExpandedId(isExpanded ? null : edu.id)}
                className="flex flex-1 items-center space-x-4 text-left"
              >
                <div className=" bg-secondary p-2">
                  <GraduationCap className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">
                    {edu.degree ? `${edu.degree} ${edu.field && `in ${edu.field}`}` : "(Untitled Degree)"}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {edu.institution || "Institution"} {edu.startDate && `• ${edu.startDate}`}
                  </p>
                </div>
              </button>
              <div className="ml-4 flex shrink-0 items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Remove education"
                  className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => removeEducation(edu.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <button
                  type="button"
                  aria-expanded={isExpanded}
                  aria-label={isExpanded ? "Collapse" : "Expand"}
                  onClick={() => setExpandedId(isExpanded ? null : edu.id)}
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
                    <Label>Institution / University</Label>
                    <Input
                      value={edu.institution}
                      onChange={(e) => handleChange(edu.id, "institution", e.target.value)}
                      placeholder="e.g. University of Mandalore"
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Degree / Certification</Label>
                    <Input
                      value={edu.degree}
                      onChange={(e) => handleChange(edu.id, "degree", e.target.value)}
                      placeholder="e.g. Bachelor of Science"
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Field of Study</Label>
                    <Input
                      value={edu.field}
                      onChange={(e) => handleChange(edu.id, "field", e.target.value)}
                      placeholder="e.g. Computer Science"
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Score / GPA (Optional)</Label>
                    <Input
                      value={edu.score}
                      onChange={(e) => handleChange(edu.id, "score", e.target.value)}
                      placeholder="e.g. 3.8 GPA"
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input
                      value={edu.startDate}
                      onChange={(e) => handleChange(edu.id, "startDate", e.target.value)}
                      placeholder="MM/YYYY"
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <div className="flex space-x-2">
                      <Input
                        value={edu.current ? "Present" : edu.endDate}
                        onChange={(e) => handleChange(edu.id, "endDate", e.target.value)}
                        placeholder="MM/YYYY"
                        disabled={edu.current}
                        className={`bg-background/50 ${edu.current ? "opacity-50" : ""}`}
                      />
                      <Button
                        variant={edu.current ? "default" : "outline"}
                        onClick={() => handleChange(edu.id, "current", !edu.current)}
                        className="shrink-0"
                      >
                        Present
                      </Button>
                    </div>
                  </div>
                  
                  {/* Suggestions Section */}
                  <div className="mt-2 space-y-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-2 border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 hover:text-primary">
                          <Sparkles className="h-4 w-4" />
                          FAANG Quick Suggestions
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent align="start" className="w-[400px] p-4">
                        <div className="space-y-4">
                          <div className="mb-2 flex items-center gap-2 border-b border-border/40 pb-2">
                            <Sparkles className="h-4 w-4 text-primary" />
                            <h5 className="text-sm font-semibold text-foreground">FAANG Quick Suggestions</h5>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <p className="mb-1 text-xs font-medium text-muted-foreground">Degree:</p>
                              <div className="flex flex-wrap gap-1.5">
                                {DEGREE_SUGGESTIONS.map((suggestion, idx) => (
                                  <button
                                    key={`deg-${idx}`}
                                    onClick={() => handleChange(edu.id, "degree", suggestion)}
                                    className="inline-flex items-center rounded-md border border-border bg-background px-2.5 py-1 text-left text-[11px] text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                                  >
                                    {suggestion}
                                  </button>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <p className="mb-1 text-xs font-medium text-muted-foreground">Field of Study:</p>
                              <div className="flex flex-wrap gap-1.5">
                                {FIELD_SUGGESTIONS.map((suggestion, idx) => (
                                  <button
                                    key={`field-${idx}`}
                                    onClick={() => handleChange(edu.id, "field", suggestion)}
                                    className="inline-flex items-center rounded-md border border-border bg-background px-2.5 py-1 text-left text-[11px] text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                                  >
                                    {suggestion}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div>
                              <p className="mb-1 text-xs font-medium text-muted-foreground">Score & Honors:</p>
                              <div className="flex flex-wrap gap-1.5">
                                {SCORE_SUGGESTIONS.map((suggestion, idx) => (
                                  <button
                                    key={`score-${idx}`}
                                    onClick={() => handleChange(edu.id, "score", suggestion)}
                                    className="inline-flex items-center rounded-md border border-border bg-background px-2.5 py-1 text-left text-[11px] text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                                  >
                                    {suggestion}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
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
        Add New Education
      </Button>
    </div>
  );
}
