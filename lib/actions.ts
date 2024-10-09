"use server";

import prismadb from "@/lib/prisma";
import { hashPassword } from "@/lib/helpers";
import { LoginProps, RegisterProps } from "@/lib/types";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const createUser = async (payload: RegisterProps) => {
  const hashedPassword = await hashPassword(payload.password);

  try {
    await prismadb.user.create({
      data: {
        name: payload.name,
        email: payload.email,
        pwd: hashedPassword,
        createdBy: payload.email,
      },
    });

    return { success: true, message: "Register User: Success" };
  } catch (error) {
    return { success: false, message: "Register User: Failed" };
  }
};

export async function authenticate(payload: LoginProps) {
  try {
    const res = await signIn("credentials", { ...payload, redirect: false });
    console.log("res:", res);
    return { success: true, message: "Welcome back" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { success: false, message: "Invalid Credentials" };
        default:
          return {
            success: false,
            message: "There was a problem with your request",
          };
      }
    }
    throw error;
  }
}
