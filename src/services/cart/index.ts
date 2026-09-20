/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { publicBaseUrl } from "@/app/config";
import { IOrder } from "@/types/cart";
import { cookies } from "next/headers";

export const createOrder = async (order: IOrder) => {
  try {
    const res = await fetch(`${publicBaseUrl}/order`, {
      method: "POST",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};
