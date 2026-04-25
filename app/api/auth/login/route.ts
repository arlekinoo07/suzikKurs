import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { createSession, findUserByEmail, verifyPassword } from "../../../../lib/db";

const SESSION_COOKIE = "bella-flower-session";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    email?: string;
    password?: string;
  };

  const email = body.email?.trim().toLowerCase();
  const password = body.password?.trim();

  if (!email || !password) {
    return NextResponse.json({ message: "Заполни email и пароль." }, { status: 400 });
  }

  const user = findUserByEmail(email);

  if (!user) {
    return NextResponse.json(
      { message: "Такой пользователь не найден. Сначала зарегистрируйся." },
      { status: 404 }
    );
  }

  if (!verifyPassword(password, user.passwordHash)) {
    return NextResponse.json({ message: "Неверный пароль. Попробуй еще раз." }, { status: 401 });
  }

  const token = randomUUID();
  createSession(user.id, token);

  const response = NextResponse.json({
    name: user.name,
    email: user.email,
    message: `Добро пожаловать, ${user.name}! Вход выполнен.`
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
