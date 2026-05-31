import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Coins, LogOut, Settings, Sparkles } from "lucide-react";
import { BountyExchangeModal } from "@/components/editor/BountyExchangeModal";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function ProfileDropdown() {
  const { user, profile, signOut } = useAuthStore();
  const [isBountyModalOpen, setIsBountyModalOpen] = useState(false);

  // Derive display name: use full name from metadata, or fallback to email prefix
  let displayName = "Operator";
  let fallbackLetter = "O";
  
  if (user) {
    const metaName = user.user_metadata?.full_name || user.user_metadata?.name;
    if (metaName) {
      displayName = metaName;
      fallbackLetter = displayName.charAt(0).toUpperCase();
    } else if (user.email) {
      displayName = user.email.split("@")[0];
      fallbackLetter = displayName.charAt(0).toUpperCase();
    }
  }

  const tokenBalance = profile?.token_balance || 0;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="group relative flex h-9 items-center gap-2 rounded-full border border-transparent pr-2 pl-3 transition-colors hover:border-zinc-800 hover:bg-zinc-800/50">
            <span className="hidden font-mono text-xs text-zinc-400 transition-colors group-hover:text-zinc-300 sm:inline-block">
              {displayName}
            </span>
            <Avatar className="h-7 w-7 border border-cyan-500/30 bg-zinc-900 transition-colors group-hover:border-cyan-500/60">
              <AvatarFallback className="bg-transparent font-mono text-[10px] text-cyan-400">
                {fallbackLetter}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm leading-none font-medium">{displayName}</p>
              <p className="font-mono text-xs leading-none text-muted-foreground">
                {user?.email || "covert@signet.org"}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <div className="flex items-center justify-between px-2 py-1.5">
            <div className="flex items-center gap-2">
              <Coins className="h-4 w-4 text-primary" />
              <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">Tokens</span>
            </div>
            <span className="font-mono text-sm font-bold text-primary">{tokenBalance}</span>
          </div>
          
          <DropdownMenuItem 
            className="mb-1 cursor-pointer text-cyan-500 focus:bg-cyan-500/10 focus:text-cyan-400"
            onSelect={(e) => {
              e.preventDefault();
              setIsBountyModalOpen(true);
            }}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            <span className="font-semibold">Add Tokens</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          
          <div className="mb-1 flex items-center justify-between px-2 py-1.5">
            <span className="flex items-center gap-2 text-sm">
              <Settings className="h-4 w-4 text-muted-foreground" />
              System Theme
            </span>
            <ThemeToggle />
          </div>

          <DropdownMenuSeparator />
          <DropdownMenuItem 
            className="cursor-pointer text-red-500 focus:bg-red-500/10 focus:text-red-400"
            onClick={() => signOut()}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isBountyModalOpen && (
        <BountyExchangeModal 
          isOpen={isBountyModalOpen} 
          onClose={() => setIsBountyModalOpen(false)} 
        />
      )}
    </>
  );
}
