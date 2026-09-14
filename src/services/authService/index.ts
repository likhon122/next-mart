/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { publicBaseUrl, recaptchaServerKey } from "@/app/config";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

const registerUser = async (data: FieldValues) => {
  try {
    const response = await fetch(`${publicBaseUrl}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    return response.json();
  } catch (error: any) {
    return Error(error);
  }
};

const loginUser = async (data: FieldValues) => {
  try {
    const response = await fetch(`${publicBaseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const responseData = await response.json();
    if (responseData?.success && responseData?.data?.accessToken) {
      // Store the token in cookies
      (await cookies()).set("accessToken", responseData.data.accessToken);
    }
    return responseData;
  } catch (error: any) {
    return Error(error);
  }
};

const getUserInfo = async () => {
  try {
    const cookieData = (await cookies()).get("accessToken")?.value;
    if (cookieData) {
      // Use jwt-decode to decode the token and extract user information
      return jwtDecode(cookieData);
    }
    return null; // Return null if no token is found
  } catch (error: any) {
    return Error(error);
  }
};

const verifyRecaptcha = async (token: string) => {
  try {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
          secret: recaptchaServerKey,
          response: token
        })
      }
    );
    return response.json();
  } catch (error: any) {
    return Error(error);
  }
};

const logOutUser = async () => {
  try {
    (await cookies()).delete("accessToken");
  } catch (error: any) {
    return Error(error);
  }
};

export { registerUser, loginUser, getUserInfo, verifyRecaptcha, logOutUser };
