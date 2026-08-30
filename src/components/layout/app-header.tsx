import { Link, useNavigate } from "@tanstack/react-router";
import { Bell, Search } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function AppHeader() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/90 backdrop-blur-md">
      <div className="flex h-16 items-center gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2" aria-label="Camp Match home">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">
            CM
          </span>
          <span className="hidden text-base font-semibold tracking-tight sm:block">
            Camp Match
          </span>
        </Link>

        <form
          role="search"
          className="ml-auto hidden max-w-md flex-1 md:block"
          onSubmit={(event) => {
            event.preventDefault();
            navigate({ to: "/discover", search: { q: query || undefined } });
          }}
        >
          <label htmlFor="global-search" className="sr-only">
            Search listings
          </label>
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              id="global-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by university, area or property"
              className="h-10 w-full rounded-full border border-input bg-background pl-9 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
            />
          </div>
        </form>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <button
            type="button"
            aria-label="Notifications"
            className="relative flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Bell className="size-5" aria-hidden="true" />
            <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-accent" />
          </button>
          <Link to="/profile" aria-label="Your profile">
            <Avatar className="size-9">
              <AvatarFallback className="bg-primary-soft text-sm text-primary">
                AO
              </AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    </header>
  );
}
