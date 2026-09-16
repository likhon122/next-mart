/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { publicBaseUrl } from "@/app/config";
import { cookies } from "next/headers";

const createShop = async (data: FormData) => {
  try {
    const response = await fetch(`${publicBaseUrl}/shop`, {
      method: "POST",
      body: data,
      headers: {
        authorization: (await cookies()).get("accessToken")?.value || "",
      },
    });

    return response.json();
  } catch (error: any) {
    return Error(error);
  }
};

export { createShop };
