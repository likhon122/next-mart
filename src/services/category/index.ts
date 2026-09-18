"use server";
import { publicBaseUrl } from "@/app/config";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import { updateTag } from "next/cache";

export const createCategory = async (data: FormData) => {
  try {
    const res = await fetch(`${publicBaseUrl}/category`, {
      method: "POST",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      body: data,
    });
    updateTag("CATEGORY");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllCategories = async () => {
  try {
    const res = await fetch(`${publicBaseUrl}/category`, {
      next: {
        tags: ["CATEGORY"],
      },
    });

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// delete category
export const deleteCategory = async (categoryId: string): Promise<any> => {
  try {
    const res = await fetch(`${publicBaseUrl}/category/${categoryId}`, {
      method: "DELETE",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });
    updateTag("CATEGORY");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
