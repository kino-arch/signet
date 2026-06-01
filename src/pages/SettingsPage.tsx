import { Button } from "@/components/ui/button";
import * as Sentry from "@sentry/react";
import { LottieAnimation } from "@/components/ui/lottie-animation";
import faceIdData from "@/assets/animations/face_ID_tech.json";
import glitchData from "@/assets/animations/glitch_404.json";

function ErrorButton() {
  return (
    <Button
      variant="destructive"
      className="mt-6 font-mono text-[10px] tracking-widest uppercase"
      onClick={() => {
        const error = new Error('This is your first error!');
        Sentry.captureException(error);
        throw error;
      }}
    >
      Break the world
    </Button>
  );
}

function TestLogButton() {
  return (
    <Button
      variant="outline"
      className="mt-6 font-mono text-[10px] tracking-widest uppercase"
      onClick={() => {
        console.log('User triggered test log via console.log', { log_source: 'sentry_test' });
      }}
    >
      Trigger Test Log
    </Button>
  );
}

export function SettingsPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="mb-4">
        <LottieAnimation animationData={faceIdData} className="h-16 w-16 opacity-80" />
      </div>
      <h1 className="font-heading text-3xl font-bold tracking-widest text-zinc-100 uppercase">System Settings</h1>
      
      <div className="mt-8 flex flex-col items-center gap-2 rounded-xl border border-destructive/20 bg-destructive/5 p-8 text-center backdrop-blur-md">
        <LottieAnimation animationData={glitchData} className="h-40 w-40 opacity-60" />
        <p className="font-mono text-sm text-zinc-400">CONFIGURATION MODULE OFFLINE.</p>
        <div className="flex items-center gap-4">
          <ErrorButton />
          <TestLogButton />
        </div>
      </div>
    </div>
  )
}
