import type { AuthUser, UserRole } from "@/types/auth";

/**
 * UX-only role routing. The backend stays authoritative for permissions —
 * these helpers just decide which screen makes sense next.
 */
export const roleHomePath: Record<UserRole, string> = {
  student: "/",
  owner: "/owner",
  scout: "/scout",
};

export const onboardingPath: Record<UserRole, string> = {
  student: "/onboarding/student",
  owner: "/onboarding/owner",
  scout: "/onboarding/scout",
};

/** Next step in the auth → verify → role → onboarding → app funnel. */
export function nextPathForUser(user: AuthUser): string {
  if (!user.emailVerified) return "/verify";
  if (!user.role) return "/select-role";
  if (!user.onboardingComplete) return onboardingPath[user.role];
  return roleHomePath[user.role];
}
