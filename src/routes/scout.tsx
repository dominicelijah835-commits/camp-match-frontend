import { createFileRoute } from "@tanstack/react-router";
import { MapPinned, Users } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { EmptyState } from "@/components/common/states";
import { VerificationStatus } from "@/features/onboarding/components/verification-status";
import { useAuth } from "@/features/auth/hooks/use-auth";

export const Route = createFileRoute("/scout")({
  head: () => ({
    meta: [
      { title: "Scout dashboard — Camp Match" },
      {
        name: "description",
        content:
          "Manage the properties you scout and the students you're helping on Camp Match.",
      },
      { property: "og:title", content: "Scout dashboard — Camp Match" },
      {
        property: "og:description",
        content: "Manage your scouted properties and student requests on Camp Match.",
      },
    ],
  }),
  component: ScoutHomePage,
});

function ScoutHomePage() {
  const { user } = useAuth();

  return (
    <AppShell>
      <div className="space-y-6 px-4 py-6 sm:px-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            House scout
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            {user?.fullName ? `Welcome, ${user.fullName.split(" ")[0]}` : "Your scouting"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Verified scouts get matched with students in their coverage areas.
          </p>
        </div>

        <VerificationStatus status={user?.identityVerification ?? "pending"} />

        <EmptyState
          icon={<Users className="size-5" aria-hidden="true" />}
          title="No student requests yet"
          description="Once you're verified, student enquiries for your areas land here."
        />

        <div className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-5">
          <MapPinned className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold">Coverage areas</p>
            <p className="mt-1 text-sm text-muted-foreground">
              We route students to the scout closest to the property they're viewing, so
              keep your areas accurate.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
