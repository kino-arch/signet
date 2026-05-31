

import * as Sentry from '@sentry/react';
import { Button } from "@/components/ui/button";

function ErrorButton() {
  return (
    <Button
      variant="destructive"
      className="mt-6"
      onClick={() => {
        throw new Error('This is your first error!');
      }}
    >
      Break the world
    </Button>
  );
}

export function SettingsPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h1 className="font-heading text-3xl font-bold tracking-widest text-zinc-100 uppercase">System Settings</h1>
      <p className="mt-2 font-mono text-sm text-zinc-500">CONFIGURATION MODULE OFFLINE.</p>
      <ErrorButton />
    </div>
  )
}
