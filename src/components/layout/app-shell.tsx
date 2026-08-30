import type { ReactNode } from "react";
import { AppHeader } from "./app-header";
import { SidebarNav } from "./sidebar-nav";
import { BottomNav } from "./bottom-nav";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <div className="mx-auto flex w-full max-w-[1600px]">
        <SidebarNav />
        <main
          id="main"
          className="min-w-0 flex-1 pb-24 lg:pb-12"
          tabIndex={-1}
        >
          {children}
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
