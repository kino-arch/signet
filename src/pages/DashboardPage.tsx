"use client"

import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { LottieAnimation } from "@/components/ui/lottie-animation";
import hudData from "@/assets/animations/Sci-fi_HUD.json";

const data = [
  {
    id: 1,
    header: "Cover Page",
    type: "System Section",
    status: "Done",
    target: "1",
    limit: "1",
    reviewer: "Assign reviewer",
  },
  {
    id: 2,
    header: "Executive Summary",
    type: "Upload Content",
    status: "Pending",
    target: "2",
    limit: "5",
    reviewer: "Eddie Lake",
  },
  {
    id: 3,
    header: "Methodology",
    type: "Upload Content",
    status: "Done",
    target: "3",
    limit: "10",
    reviewer: "Jamik Tashpulatov",
  },
  {
    id: 4,
    header: "Results",
    type: "System Section",
    status: "Pending",
    target: "4",
    limit: "5",
    reviewer: "Assign reviewer",
  },
  {
    id: 5,
    header: "Conclusion",
    type: "Upload Content",
    status: "Done",
    target: "5",
    limit: "2",
    reviewer: "Eddie Lake",
  },
]

export function DashboardPage() {
  return (
    <div className="flex w-full flex-col gap-8 pt-2">
      <div className="flex w-full items-center justify-center -mt-6 -mb-6 opacity-60 pointer-events-none mix-blend-screen overflow-hidden">
        <LottieAnimation animationData={hudData} className="w-full max-w-4xl h-32" colorMode="cyan-tint" />
      </div>
      <SectionCards />
      <div className="w-full px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      <div className="w-full">
        <DataTable data={data} />
      </div>
    </div>
  )
}
