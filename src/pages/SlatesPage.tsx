import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "@/store/useAuthStore"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { FileText, PlusCircle, ArrowRight } from "lucide-react"

interface SlateMeta {
  id: string
  title: string
  updated_at: string
}

export function SlatesPage() {
  const { user } = useAuthStore()
  const navigate = useNavigate()
  
  const [slates, setSlates] = useState<SlateMeta[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSlates() {
      if (!user) {
        // Guests only have a single in-memory slate; they don't have saved slates.
        setSlates([])
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from("data_slates")
        .select("id, title, updated_at")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false })

      if (!error && data) {
        setSlates(data)
      } else {
        console.error("Failed to fetch slates", error)
      }
      setLoading(false)
    }

    fetchSlates()
  }, [user])

  return (
    <div className="flex h-full flex-col">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-widest text-zinc-100 uppercase">Data-Slates</h1>
          <p className="mt-1 font-mono text-sm text-zinc-500">THE ACTIVE ARMORY OF THE GREAT FORGE</p>
        </div>
        {slates.length > 0 && !loading && (
          <Button onClick={() => navigate("/forge/new")} className="bg-cyan-500 font-mono tracking-widest text-zinc-950 hover:bg-cyan-400">
            <PlusCircle className="mr-2 h-4 w-4" /> MINT NEW SLATE
          </Button>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="flex flex-col border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
              <CardHeader>
                <Skeleton className="mb-2 h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent className="flex flex-1 justify-center py-6">
                <Skeleton className="h-32 w-24 rounded-sm" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : slates.length === 0 ? (
        <div className="flex flex-1 items-center justify-center">
          <div 
            onClick={() => navigate("/forge/new")}
            className="group relative flex h-96 w-full max-w-2xl cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-cyan-500/20 bg-zinc-900/20 transition-all hover:border-cyan-400/50 hover:bg-cyan-950/20"
          >
            {/* Pulsing visual core */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-64 w-64 animate-ping rounded-full bg-cyan-500/5 opacity-50 duration-1000"></div>
            </div>
            
            <PlusCircle className="z-10 mb-6 h-16 w-16 text-cyan-500/50 transition-transform group-hover:scale-110 group-hover:text-cyan-400" />
            <h2 className="z-10 font-heading text-2xl font-bold tracking-widest text-zinc-200">AWAITING INTEL</h2>
            <p className="z-10 mt-2 font-mono text-sm text-zinc-500">CLICK TO INITIALIZE NEW SLATE</p>
            
            <div className="z-10 mt-8 rounded-full border border-cyan-500/30 bg-zinc-950 px-6 py-2 font-mono text-xs text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-shadow group-hover:shadow-[0_0_25px_rgba(6,182,212,0.5)]">
              [ ACCESS DATACORE ]
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {slates.map((slate) => {
            const formattedDate = new Date(slate.updated_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric"
            })
            
            return (
              <Card key={slate.id} className="flex flex-col border-zinc-800 bg-zinc-900/50 backdrop-blur-sm transition-colors hover:border-cyan-500/30">
                <CardHeader>
                  <CardTitle className="font-heading tracking-wider text-zinc-100">{slate.title || "UNNAMED SLATE"}</CardTitle>
                  <div className="font-mono text-xs text-zinc-500 uppercase">MODIFIED: {formattedDate}</div>
                </CardHeader>
                <CardContent className="flex flex-1 justify-center py-6">
                  <div className="flex h-32 w-24 items-center justify-center rounded-sm border border-zinc-700 bg-zinc-800/50 shadow-inner">
                    <FileText className="h-8 w-8 text-zinc-600" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => navigate(`/forge/${slate.id}`)} className="w-full bg-zinc-800 font-mono tracking-widest text-cyan-400 hover:bg-zinc-700">
                    [ ACCESS FORGE ] <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
