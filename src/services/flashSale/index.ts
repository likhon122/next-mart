/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { publicBaseUrl } from "@/app/config";
import { updateTag } from "next/cache";
import { cookies } from "next/headers";

// add Flash Sale
export const addFlashSale = async (productData: any): Promise<any> => {
  try {
    const res = await fetch(`${publicBaseUrl}/flash-sale`, {
      method: "POST",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    updateTag("PRODUCT");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// get Flash Sale Products
export const getFlashSaleProducts = async () => {
  try {
    const res = await fetch(`${publicBaseUrl}/flash-sale`, {
      next: {
        tags: ["PRODUCT"],
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
