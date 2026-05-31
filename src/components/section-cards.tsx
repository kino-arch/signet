"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Shield, Download, FileText, Clock } from "lucide-react"

export function SectionCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 px-4 lg:px-6">
      <Card className="bg-card/40 backdrop-blur-sm border-primary/20 shadow-primary/5">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium tracking-widest uppercase text-muted-foreground">Guild Rank</CardTitle>
          <Shield className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-mono">Apprentice (35)</div>
          <p className="text-xs text-muted-foreground mt-1">
            Beskar Shields Active
          </p>
        </CardContent>
      </Card>
      <Card className="bg-card/40 backdrop-blur-sm border-primary/20 shadow-primary/5">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium tracking-widest uppercase text-muted-foreground">Resume Downloads</CardTitle>
          <Download className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-mono">340</div>
          <p className="text-xs text-green-500 mt-1">
            +5.4% from last month
          </p>
        </CardContent>
      </Card>
      <Card className="bg-card/40 backdrop-blur-sm border-primary/20 shadow-primary/5">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium tracking-widest uppercase text-muted-foreground">Active Applications</CardTitle>
          <FileText className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-mono">3</div>
          <p className="text-xs text-destructive mt-1">
            -1 from last week
          </p>
        </CardContent>
      </Card>
      <Card className="bg-card/40 backdrop-blur-sm border-primary/20 shadow-primary/5">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium tracking-widest uppercase text-muted-foreground">Time on Profile</CardTitle>
          <Clock className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-mono">2m 45s</div>
          <p className="text-xs text-green-500 mt-1">
            +14s from average
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
