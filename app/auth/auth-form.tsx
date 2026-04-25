"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type AuthMode = "login" | "register";

export default function AuthForm() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("register");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedName = name.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword || (mode === "register" && !trimmedName)) {
      showError("Заполни все поля, чтобы продолжить.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/auth/${mode === "register" ? "register" : "login"}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          password: trimmedPassword
        })
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        showError(payload.message ?? "Не удалось выполнить запрос.");
        return;
      }

      showSuccess(payload.message ?? "Успешно.");
      resetFields(true);
      window.setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 700);
    } catch {
      showError("Сервер временно недоступен. Попробуй еще раз.");
    } finally {
      setIsSubmitting(false);
    }
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

        <button type="submit" className="auth-submit" disabled={isSubmitting}>
          {isSubmitting ? "Подождите..." : mode === "register" ? "Зарегистрироваться" : "Войти"}
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
