/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { publicBaseUrl } from "@/app/config";
import { updateTag } from "next/cache";
import { cookies } from "next/headers";

// get all products
export const getAllProducts = async (page?: string, limit?: string) => {
  try {
    const res = await fetch(
      `${publicBaseUrl}/product?limit=${limit}&page=${page}`,
      {
        next: {
          tags: ["PRODUCT"],
        },
      },
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// get single product
export const getSingleProduct = async (productId: string) => {
  try {
    const res = await fetch(`${publicBaseUrl}/product/${productId}`, {
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

// add product
export const addProduct = async (productData: FormData): Promise<any> => {
  try {
    const res = await fetch(`${publicBaseUrl}/product`, {
      method: "POST",
      body: productData,
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });
    updateTag("PRODUCT");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// update product
export const updateProduct = async (
  productData: FormData,
  productId: string,
): Promise<any> => {
  try {
    const res = await fetch(`${publicBaseUrl}/product/${productId}`, {
      method: "PATCH",
      body: productData,
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });
    updateTag("PRODUCT");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
