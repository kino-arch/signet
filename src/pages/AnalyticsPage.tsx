

import { LottieAnimation } from "@/components/ui/lottie-animation";
import dataStreamData from "@/assets/animations/data_stream.json";

export function AnalyticsPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <div className="h-40 w-40 opacity-60">
        <LottieAnimation animationData={dataStreamData} className="w-full h-full" />
      </div>
      <div className="text-center">
        <h1 className="font-heading text-3xl font-bold tracking-widest text-zinc-100 uppercase">Analytics</h1>
        <p className="mt-2 font-mono text-sm text-zinc-500">TELEMETRY SENSORS OFFLINE.</p>
      </div>
    </div>
  )
}
