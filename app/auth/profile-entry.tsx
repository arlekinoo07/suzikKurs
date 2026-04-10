"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const SESSION_KEY = "bella-flower-session";

type SessionUser = {
  name: string;
  email: string;
};

type ProfileEntryProps = {
  variant?: "nav" | "hero";
};

export default function ProfileEntry({ variant = "nav" }: ProfileEntryProps) {
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    const raw = window.localStorage.getItem(SESSION_KEY);

    if (!raw) {
      setUser(null);
      return;
    }

    try {
      setUser(JSON.parse(raw) as SessionUser);
    } catch {
      setUser(null);
    }
  }, []);

  if (!user) {
    return (
      <Link href="/auth" className={variant === "hero" ? "button button-ghost" : undefined}>
        Войти
      </Link>
    );
  }

  if (variant === "hero") {
    return (
      <Link href="/auth" className="hero-profile-link" aria-label="Профиль">
        <span className="profile-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-3.33 0-6 1.79-6 4v1h12v-1c0-2.21-2.67-4-6-4Z" />
          </svg>
        </span>
      </Link>
    );
  }

  return (
    <Link href="/auth" className="profile-link" aria-label="Профиль">
      <span className="profile-icon">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-3.33 0-6 1.79-6 4v1h12v-1c0-2.21-2.67-4-6-4Z" />
        </svg>
      </span>
      <span className="profile-name">{user.name}</span>
    </Link>
  );
}
