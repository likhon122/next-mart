/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { publicBaseUrl } from "@/app/config";
import { updateTag } from "next/cache";
import { cookies } from "next/headers";

//  get all brands
export const getAllBrands = async () => {
  try {
    const res = await fetch(`${publicBaseUrl}/brand`, {
      next: {
        tags: ["Brands"],
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// create brand
export const createBrand = async (brandData: FormData): Promise<any> => {
  try {
    const res = await fetch(`${publicBaseUrl}/brand`, {
      method: "POST",
      body: brandData,
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });
    updateTag("Brands");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// delete brand
export const deleteBrand = async (brandId: string): Promise<any> => {
  try {
    const res = await fetch(`${publicBaseUrl}/brand/${brandId}`, {
      method: "DELETE",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });
    updateTag("Brands");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
