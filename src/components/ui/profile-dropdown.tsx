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
          <Button variant="ghost" className="relative h-9 rounded-full pl-3 pr-2 flex items-center gap-2 hover:bg-zinc-800/50 group border border-transparent hover:border-zinc-800 transition-colors">
            <span className="font-mono text-xs text-zinc-400 group-hover:text-zinc-300 transition-colors hidden sm:inline-block">
              {displayName}
            </span>
            <Avatar className="h-7 w-7 border border-cyan-500/30 bg-zinc-900 group-hover:border-cyan-500/60 transition-colors">
              <AvatarFallback className="bg-transparent text-cyan-400 font-mono text-[10px]">
                {fallbackLetter}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{displayName}</p>
              <p className="text-xs leading-none text-muted-foreground font-mono">
                {user?.email || "covert@signet.org"}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <div className="flex items-center justify-between px-2 py-1.5">
            <div className="flex items-center gap-2">
              <Coins className="h-4 w-4 text-primary" />
              <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Tokens</span>
            </div>
            <span className="font-mono text-sm font-bold text-primary">{tokenBalance}</span>
          </div>
          
          <DropdownMenuItem 
            className="cursor-pointer text-cyan-500 focus:text-cyan-400 focus:bg-cyan-500/10 mb-1"
            onSelect={(e) => {
              e.preventDefault();
              setIsBountyModalOpen(true);
            }}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            <span className="font-semibold">Add Tokens</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          
          <div className="flex items-center justify-between px-2 py-1.5 mb-1">
            <span className="text-sm flex items-center gap-2">
              <Settings className="h-4 w-4 text-muted-foreground" />
              System Theme
            </span>
            <ThemeToggle />
          </div>

          <DropdownMenuSeparator />
          <DropdownMenuItem 
            className="cursor-pointer text-red-500 focus:text-red-400 focus:bg-red-500/10"
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
