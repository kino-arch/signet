
import { RefreshCw } from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

export function CustomizationsPanel() {
  return (
    <div className="flex flex-col space-y-4 p-6 bg-background text-foreground rounded-lg border">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">Customizations</h2>
        <p className="text-sm text-muted-foreground">
          Customize Agent to get a better, more personalized experience.{" "}
          <a href="#" className="underline underline-offset-4 hover:text-foreground">
            Learn more.
          </a>
        </p>
      </div>

      <Tabs defaultValue="rules" className="w-full">
        <TabsList variant="line" className="w-full justify-start border-b border-border/50 pb-0">
          <TabsTrigger value="rules" className="text-sm">
            Rules
          </TabsTrigger>
          <TabsTrigger value="workflows" className="text-sm">
            Workflows
          </TabsTrigger>
        </TabsList>

        <TabsContent value="rules" className="space-y-4 pt-4 mt-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-semibold">Rules</h3>
              <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full text-muted-foreground hover:text-foreground">
                <RefreshCw className="h-3.5 w-3.5" />
                <span className="sr-only">Refresh Rules</span>
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="secondary" size="sm" className="h-8">
                + Global
              </Button>
              <Button variant="secondary" size="sm" className="h-8">
                + Workspace
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Rules help guide the behavior of Agent.
          </p>
        </TabsContent>

        <TabsContent value="workflows" className="space-y-4 pt-4 mt-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-semibold">Workflows</h3>
              <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full text-muted-foreground hover:text-foreground">
                <RefreshCw className="h-3.5 w-3.5" />
                <span className="sr-only">Refresh Workflows</span>
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="secondary" size="sm" className="h-8">
                + Global
              </Button>
              <Button variant="secondary" size="sm" className="h-8">
                + Workspace
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Workflows are saved prompts that Agent can follow. To trigger a workflow, type "/" in Agent.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  )
}
