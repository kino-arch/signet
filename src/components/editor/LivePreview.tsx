import { useForgeStore } from "@/store/useForgeStore";
import { PureBeskarTemplate } from "@/components/editor/templates/PureBeskarTemplate";
import { OperativeTemplate } from "@/components/editor/templates/OperativeTemplate";
import { MinimalTemplate } from "@/components/editor/templates/MinimalTemplate";
import { StandardTemplate } from "@/components/editor/templates/StandardTemplate";
import { AvantGardeTemplate } from "@/components/editor/templates/AvantGardeTemplate";

export function LivePreview() {
  const { activeTemplate, resumeData } = useForgeStore();

  const getTemplateName = () => {
    switch (activeTemplate) {
      case "pure-beskar": return "The Pure Beskar";
      case "operative": return "The Operative";
      case "minimal": return "Ghost Protocol";
      case "standard": return "Heavy Infantry";
      case "avant-garde": return "Classified Dossier";
      default: return "Classified Dossier";
    }
  };

  return (
    <div className="flex w-full flex-col items-center print:block print:w-full">
      <div className="mb-4 flex w-full max-w-[800px] justify-between px-2 print:hidden">
        <span className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">Live Preview</span>
        <span className="text-sm text-muted-foreground">{getTemplateName()} (A4)</span>
      </div>

      {/* A4 Paper Container - 1:1.414 Aspect Ratio */}
      {/* bg-white is intentional: resume output must always be white regardless of dark/light mode */}
      <div className="relative aspect-[1/1.414] w-full max-w-[800px] overflow-hidden rounded-sm border border-border/40 bg-white shadow-[0_8px_48px_rgba(0,0,0,0.22)] ring-1 ring-black/5 transition-all duration-300 print:m-0 print:aspect-auto print:min-h-[297mm] print:h-auto print:w-[210mm] print:max-w-none print:border-none print:bg-white print:p-0 print:shadow-none print:overflow-visible">
        {activeTemplate === "pure-beskar" && <PureBeskarTemplate />}
        {activeTemplate === "operative" && <OperativeTemplate data={resumeData} />}
        {activeTemplate === "minimal" && <MinimalTemplate />}
        {activeTemplate === "standard" && <StandardTemplate />}
        {(activeTemplate === "avant-garde" || !["pure-beskar", "operative", "minimal", "standard"].includes(activeTemplate)) && <AvantGardeTemplate />}
      </div>
    </div>
  );
}
