"use server";
import { redirect } from "next/navigation";

import { hashUserPassword, verifyPassword } from "@/lib/hash";
import { createUser, getUserByEmail } from "@/lib/user";
import { createAuthSession } from "@/lib/auth";

export async function signup(prevState, formData) {
  let errors = {};

  const email = formData.get("email");
  const password = formData.get("password");

  if (!email.includes("@")) {
    errors.email = "Email is invalid";
  }

  if (password.trim().length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }
  const encryptedPassword = hashUserPassword(password);

  try {
    const userId = createUser(email, encryptedPassword);
    await createAuthSession(userId);
    redirect("/training");
  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return { errors: { email: "Email already exists" } };
    }
    throw error;
  }
}

export async function login(prevState, formData) {
  let errors = {};
  const email = formData.get("email");
  const password = formData.get("password");
  const existingUser = getUserByEmail(email);
  if (!existingUser) {
    errors.email = "User does not exist";
    return { errors };
  }
  const validPassword = verifyPassword(existingUser.password, password);
  if (!validPassword) {
    errors.password = "Password is incorrect";
    return { errors };
  }

  await createAuthSession(existingUser.id);
  redirect("/training");
}

export async function auth(mode, prevState, formData) {
  if (mode === "login") {
    return login(prevState, formData);
  }
  return signup(prevState, formData);
}
