"use server";
import { publicBaseUrl } from "@/app/config";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";

export const createCategory = async (data: FormData) => {
  try {
    const res = await fetch(`${publicBaseUrl}/category`, {
      method: "POST",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      body: data,
    });

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllCategories = async () => {
  try {
    const res = await fetch(`${publicBaseUrl}/category`);

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
