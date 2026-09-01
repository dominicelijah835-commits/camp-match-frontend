import { apiClient } from "@/lib/api/client";
import type {
  AuthUser,
  LoginPayload,
  OnboardingPayload,
  RegisterPayload,
  Session,
  UserRole,
  VerifyPayload,
} from "@/types/auth";
import type { AuthProvider } from "./auth.provider";

/**
 * Real backend implementation. Paths are relative to `env.apiBaseUrl` and are
 * placeholders until the FastAPI contract is published — no host is hard-coded.
 */
export const apiAuthProvider: AuthProvider = {
  getCurrentUser: () => apiClient.get<AuthUser | null>("/auth/me"),
  login: (payload: LoginPayload) =>
    apiClient.post<Session>("/auth/login", { body: payload }),
  register: (payload: RegisterPayload) =>
    apiClient.post<Session>("/auth/register", { body: payload }),
  verifyAccount: (payload: VerifyPayload) =>
    apiClient.post<AuthUser>("/auth/verify", { body: payload }),
  resendVerificationCode: () =>
    apiClient.post<void>("/auth/verify/resend"),
  selectRole: (role: UserRole) =>
    apiClient.post<AuthUser>("/auth/role", { body: { role } }),
  completeOnboarding: (payload: OnboardingPayload) =>
    apiClient.post<AuthUser>("/auth/onboarding", { body: payload }),
  logout: () => apiClient.post<void>("/auth/logout"),
};
