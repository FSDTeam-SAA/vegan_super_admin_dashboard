"use server";

import { loginSchema } from "@/app/(auth)/login/_components/login-form";
import { signIn } from "@/auth";
import { z } from "zod";

export interface ServerResType {
  success: boolean;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

export const loginWithEmailAndPassword = async (
  data: z.infer<typeof loginSchema>
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/Superadminlogin`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const resData = await response.json();

    if (!response.ok || !resData.success) {
      console.log("error0", resData);
      throw new Error(resData.message || "Login failed");
    }

    // // Attempt to sign in with credentials
    await signIn("credentials", {
      data: JSON.stringify({
        token: resData["data"]["token"],
        userId: resData["data"]["user"]["_id"],
        role: resData["data"]["user"]["role"],
        accountType: resData["data"]["user"]["accountType"] ?? "",
      }),
      redirectTo: "/", // Disable automatic redirect to handle it manually
      email: data.email,
      password: data.password,
    });

    // If successful, return a success message
    return { success: true, message: "Login successful." } as ServerResType;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log("SERVER_ACTION_ERROR:", error);

    return {
      success: false,
      message: error.message,
    } as ServerResType;
  }
};

export type UserData = {
  status: boolean;
  message: string;
  data: {
    _id: string;
    role: string;
    email: string;
    accountType: "merchant" | "professional" | "organization" | null;
    token: string;
    paymentAdded: boolean;
    isgratings: boolean;
    isVerified: "approved" | "pending" | "declined";
  };
};

export async function getUser(userId: string) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/profile/${userId}`;

  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
}
