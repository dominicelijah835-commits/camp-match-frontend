import { createAppError } from "@/lib/api/errors";
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
 * DEMO ONLY — in-browser stand-in for the FastAPI auth API.
 * No password is ever persisted; the "session" is an opaque mock token.
 */
const SESSION_KEY = "campmatch.session";

/** Any 6-digit code except this one is treated as invalid in the demo. */
const DEMO_CODE = "123456";

/**
 * Seeded demo account for development testing (mock provider only).
 * Sign in with these credentials on the login screen.
 */
const DEMO_ACCOUNT = {
  email: "dominicelijah835@gmail.com",
  password: "9@#56785",
  fullName: "Dominic Elijah",
  phone: "+234 810 000 0000",
} as const;

function delay<T>(value: T, ms = 700): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

function readSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

function writeSession(session: Session): Session {
  try {
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    /* storage unavailable */
  }
  return session;
}

function requireSession(): Session {
  const session = readSession();
  if (!session) throw createAppError("AUTHENTICATION_ERROR");
  return session;
}

function updateUser(patch: Partial<AuthUser>): AuthUser {
  const session = requireSession();
  const next: Session = { ...session, user: { ...session.user, ...patch } };
  writeSession(next);
  return next.user;
}

function makeUser(input: {
  fullName: string;
  email: string;
  phone: string;
  emailVerified: boolean;
}): AuthUser {
  return {
    id: `usr_${Math.random().toString(36).slice(2, 10)}`,
    fullName: input.fullName,
    email: input.email,
    phone: input.phone,
    role: null,
    accountStatus: input.emailVerified ? "active" : "pending_verification",
    emailVerified: input.emailVerified,
    onboardingComplete: false,
    identityVerification: "not_started",
  };
}

export const mockAuthProvider: AuthProvider = {
  async getCurrentUser() {
    return delay(readSession()?.user ?? null, 300);
  },

  async login(payload: LoginPayload) {
    await delay(null);
    if (payload.password.length < 8) {
      throw createAppError("AUTHENTICATION_ERROR");
    }
    const existing = readSession();
    if (existing) {
      return writeSession({ ...existing, accessToken: "mock-token" });
    }
    const isEmail = payload.identifier.includes("@");
    return writeSession({
      accessToken: "mock-token",
      user: {
        ...makeUser({
          fullName: "Amara Okafor",
          email: isEmail ? payload.identifier : "amara@example.com",
          phone: isEmail ? "+234 800 000 0000" : payload.identifier,
          emailVerified: true,
        }),
        role: "student",
        onboardingComplete: true,
      },
    });
  },

  async register(payload: RegisterPayload) {
    await delay(null);
    return writeSession({
      accessToken: "mock-token",
      user: makeUser({ ...payload, emailVerified: false }),
    });
  },

  async verifyAccount(payload: VerifyPayload) {
    await delay(null);
    if (payload.code !== DEMO_CODE) {
      throw createAppError("VALIDATION_ERROR", {
        title: "That code didn't work",
        message: "The code you entered is incorrect or has expired.",
      });
    }
    return updateUser({ emailVerified: true, accountStatus: "active" });
  },

  async resendVerificationCode() {
    await delay(undefined, 600);
  },

  async selectRole(role: UserRole) {
    await delay(null, 450);
    return updateUser({ role });
  },

  async completeOnboarding(payload: OnboardingPayload) {
    await delay(null, 900);
    return updateUser({
      role: payload.role,
      onboardingComplete: true,
      identityVerification: payload.role === "student" ? "not_started" : "pending",
    });
  },

  async logout() {
    try {
      window.localStorage.removeItem(SESSION_KEY);
    } catch {
      /* storage unavailable */
    }
    await delay(undefined, 200);
  },
};
