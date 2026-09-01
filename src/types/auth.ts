/**
 * Frontend DTO types for authentication and onboarding.
 * These mirror the JSON the FastAPI backend will return — not DB schemas.
 */

import type { AccommodationType } from "./listing";

export type UserRole = "student" | "owner" | "scout";

export type IdentityVerificationStatus =
  | "not_started"
  | "pending"
  | "in_review"
  | "verified"
  | "failed";

export type AuthUser = {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  emailVerified: boolean;
  role: UserRole | null;
  onboardingCompleted: boolean;
  identityVerification: IdentityVerificationStatus;
  createdAt: string;
};

export type AuthState =
  | { status: "unknown" }
  | { status: "unauthenticated" }
  | { status: "authenticated"; user: AuthUser };

export type LoginPayload = { email: string; password: string };

export type RegisterPayload = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
};

export type VerifyPayload = { code: string };

export type StudentOnboarding = {
  universityId: string;
  levelOfStudy: string;
  accommodationTypes: AccommodationType[];
  budgetMin: number;
  budgetMax: number;
  preferredAreas: string[];
  maxDistanceKm: number;
};

export type OwnerOnboarding = {
  displayName: string;
  contactPhone: string;
  idType: string;
  idNumber: string;
  ownershipType: "sole_owner" | "co_owner" | "family_property" | "managing_agent";
  ownershipProof: string;
  ownershipConfirmed: boolean;
  propertyCount: string;
};

export type ScoutOnboarding = {
  displayName: string;
  contactPhone: string;
  coverageAreas: string;
  experience: string;
  idType: string;
  idNumber: string;
  worksWithOwners: boolean;
  agreementAccepted: boolean;
};

export type OnboardingPayload =
  | { role: "student"; data: StudentOnboarding }
  | { role: "owner"; data: OwnerOnboarding }
  | { role: "scout"; data: ScoutOnboarding };
