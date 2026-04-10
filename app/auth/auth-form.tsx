"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type AuthMode = "login" | "register";

type StoredUser = {
  name: string;
  email: string;
  password: string;
};

const STORAGE_KEY = "bella-flower-users";
const SESSION_KEY = "bella-flower-session";

function readUsers(): StoredUser[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw) as StoredUser[];
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export default function AuthForm() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("register");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");

  const title = useMemo(
    () => (mode === "register" ? "Регистрация" : "Вход в аккаунт"),
    [mode]
  );

  function showError(text: string) {
    setMessageType("error");
    setMessage(text);
  }

  function showSuccess(text: string) {
    setMessageType("success");
    setMessage(text);
  }

  function resetFields(keepEmail = false) {
    setName("");
    setPassword("");
    if (!keepEmail) {
      setEmail("");
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedName = name.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword || (mode === "register" && !trimmedName)) {
      showError("Заполни все поля, чтобы продолжить.");
      return;
    }

    const users = readUsers();
    const existingUser = users.find((user) => user.email === trimmedEmail);

    if (mode === "register") {
      if (existingUser) {
        showError("Пользователь с таким email уже зарегистрирован.");
        return;
      }

      const nextUser: StoredUser = {
        name: trimmedName,
        email: trimmedEmail,
        password: trimmedPassword
      };

      saveUsers([...users, nextUser]);
      window.localStorage.setItem(
        SESSION_KEY,
        JSON.stringify({ name: nextUser.name, email: nextUser.email })
      );
      showSuccess("Регистрация прошла успешно. Теперь ты вошел в аккаунт.");
      resetFields(true);
      window.setTimeout(() => {
        router.push("/");
      }, 700);
      return;
    }

    if (!existingUser) {
      showError("Такой пользователь не найден. Сначала зарегистрируйся.");
      return;
    }

    if (existingUser.password !== trimmedPassword) {
      showError("Неверный пароль. Попробуй еще раз.");
      return;
    }

    window.localStorage.setItem(
      SESSION_KEY,
      JSON.stringify({ name: existingUser.name, email: existingUser.email })
    );
    showSuccess(`Добро пожаловать, ${existingUser.name}! Вход выполнен.`);
    resetFields(true);
    window.setTimeout(() => {
      router.push("/");
    }, 700);
  }

  return (
    <section className="auth-card">
      <div className="auth-switch">
        <button
          type="button"
          className={`auth-switch-button ${mode === "register" ? "is-active" : ""}`}
          onClick={() => {
            setMode("register");
            setMessage("");
          }}
        >
          Регистрация
        </button>
        <button
          type="button"
          className={`auth-switch-button ${mode === "login" ? "is-active" : ""}`}
          onClick={() => {
            setMode("login");
            setMessage("");
          }}
        >
          Вход
        </button>
      </div>

      <div className="auth-heading">
        <p className="auth-kicker">Bella Flower</p>
        <h1>{title}</h1>
        <p>
          {mode === "register"
            ? "Создай аккаунт, чтобы сохранять свои данные и быстрее оформлять заказы."
            : "Введи email и пароль, если ты уже зарегистрирован."}
        </p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        {mode === "register" ? (
          <label className="auth-field">
            <span>Имя</span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Например, Анна"
            />
          </label>
        ) : null}

        <label className="auth-field">
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
          />
        </label>

        <label className="auth-field">
          <span>Пароль</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Минимум 1 символ"
          />
        </label>

        <button type="submit" className="auth-submit">
          {mode === "register" ? "Зарегистрироваться" : "Войти"}
        </button>
      </form>

      {message ? (
        <p className={`auth-message ${messageType === "error" ? "is-error" : "is-success"}`}>
          {message}
        </p>
      ) : null}
    </section>
  );
}
