"use server";

import { hashUserPassword } from "@/lib/hash";
import { createUser } from "@/lib/user";

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
  createUser(email, encryptedPassword);
}
