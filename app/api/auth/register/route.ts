import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { createSession, createUser, findUserByEmail } from "../../../../lib/db";

const SESSION_COOKIE = "bella-flower-session";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    name?: string;
    email?: string;
    password?: string;
  };

  const name = body.name?.trim();
  const email = body.email?.trim().toLowerCase();
  const password = body.password?.trim();

  if (!name || !email || !password) {
    return NextResponse.json({ message: "Заполни все поля, чтобы продолжить." }, { status: 400 });
  }

  if (findUserByEmail(email)) {
    return NextResponse.json(
      { message: "Пользователь с таким email уже зарегистрирован." },
      { status: 409 }
    );
  }

  const user = createUser(name, email, password);
  const token = randomUUID();
  createSession(user.id, token);

  const response = NextResponse.json({
    name: user.name,
    email: user.email,
    message: "Регистрация прошла успешно. Теперь ты вошел в аккаунт."
  });

  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });

  return response;
}
