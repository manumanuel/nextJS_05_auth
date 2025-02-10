"use server";
import { redirect } from "next/navigation";

import { hashUserPassword } from "@/lib/hash";
import { createUser } from "@/lib/user";
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
