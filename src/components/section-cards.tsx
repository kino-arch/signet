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
    <div className="grid gap-4 px-4 md:grid-cols-2 lg:grid-cols-4 lg:px-6">
      <Card className="border-primary/20 bg-card/40 shadow-primary/5 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium tracking-widest text-muted-foreground uppercase">Guild Rank</CardTitle>
          <Shield className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="font-mono text-2xl font-bold">Apprentice (35)</div>
          <p className="mt-1 text-xs text-muted-foreground">
            Beskar Shields Active
          </p>
        </CardContent>
      </Card>
      <Card className="border-primary/20 bg-card/40 shadow-primary/5 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium tracking-widest text-muted-foreground uppercase">Resume Downloads</CardTitle>
          <Download className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="font-mono text-2xl font-bold">340</div>
          <p className="mt-1 text-xs text-green-500">
            +5.4% from last month
          </p>
        </CardContent>
      </Card>
      <Card className="border-primary/20 bg-card/40 shadow-primary/5 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium tracking-widest text-muted-foreground uppercase">Active Applications</CardTitle>
          <FileText className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="font-mono text-2xl font-bold">3</div>
          <p className="mt-1 text-xs text-destructive">
            -1 from last week
          </p>
        </CardContent>
      </Card>
      <Card className="border-primary/20 bg-card/40 shadow-primary/5 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium tracking-widest text-muted-foreground uppercase">Time on Profile</CardTitle>
          <Clock className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="font-mono text-2xl font-bold">2m 45s</div>
          <p className="mt-1 text-xs text-green-500">
            +14s from average
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
