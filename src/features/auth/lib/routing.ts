import type { AuthUser, UserRole } from "@/types/auth";

/** Paths this funnel can send a user to — kept in sync with the route files. */
export type AppPath =
  | "/"
  | "/owner"
  | "/scout"
  | "/verify"
  | "/select-role"
  | "/onboarding/student"
  | "/onboarding/owner"
  | "/onboarding/scout";

/**
 * UX-only role routing. The backend stays authoritative for permissions —
 * these helpers just decide which screen makes sense next.
 */
export const roleHomePath: Record<UserRole, AppPath> = {
  student: "/",
  owner: "/owner",
  scout: "/scout",
};

export const onboardingPath: Record<UserRole, AppPath> = {
  student: "/onboarding/student",
  owner: "/onboarding/owner",
  scout: "/onboarding/scout",
};

/** Next step in the auth → verify → role → onboarding → app funnel. */
export function nextPathForUser(user: AuthUser): AppPath {
  if (!user.emailVerified) return "/verify";
  if (!user.role) return "/select-role";
  if (!user.onboardingComplete) return onboardingPath[user.role];
  return roleHomePath[user.role];
}
