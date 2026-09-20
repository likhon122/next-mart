import { IProduct } from "@/types/product";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface ICartProduct extends IProduct {
  orderQuantity: number;
}

interface InitialState {
  products: ICartProduct[];
  city: string;
  shippingAddress: string;
}

const initialState: InitialState = {
  products: [],
  city: "",
  shippingAddress: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const productAlreadyInCart = state.products.find(
        (product: ICartProduct) => product._id === action.payload._id,
      );

      if (productAlreadyInCart) {
        if (productAlreadyInCart.orderQuantity < productAlreadyInCart.stock) {
          productAlreadyInCart.orderQuantity += 1;
        }
        return;
      }
      state.products.push({ ...action.payload, orderQuantity: 1 });
    },

    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product: ICartProduct) => product._id !== action.payload,
      );
    },

    increaseQuantity: (state, action) => {
      const product = state.products.find(
        (product: ICartProduct) => product._id === action.payload,
      );

      if (product && product.orderQuantity < product.stock) {
        product.orderQuantity += 1;
      }
    },

    decreaseQuantity: (state, action) => {
      const product = state.products.find(
        (product: ICartProduct) => product._id === action.payload,
      );
      if (product && product.orderQuantity > 1) {
        product.orderQuantity -= 1;
      }
    },

    updateCity: (state, action) => {
      state.city = action.payload;
    },
    updateShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },
    clearCart: (state) => {
      state.products = [];
      state.city = "";
      state.shippingAddress = "";
    },
  },
});

// Products
export const orderedProductSelector = (state: RootState) => state.cart.products;

export const orderSelector = (state: RootState) => {
  return {
    products: state.cart.products.map((product) => ({
      product: product._id,
      quantity: product.orderQuantity,
      color: "White",
    })),
    shippingAddress: `${state.cart.shippingAddress} - ${state.cart.city}`,
    paymentMethod: "Online",
  };
};

// Payments
export const subTotalSelector = (state: RootState) => {
  return state.cart.products.reduce((acc: number, product: ICartProduct) => {
    if (product.offerPrice) {
      return acc + product.offerPrice * product.orderQuantity;
    } else {
      return acc + product.price * product.orderQuantity;
    }
  }, 0);
};

export const shippingCostSelector = (state: RootState) => {
  if (
    state.cart.city &&
    state.cart.city === "Dhaka" &&
    state.cart.products.length > 0
  ) {
    return 60;
  } else if (
    state.cart.city &&
    state.cart.city !== "Dhaka" &&
    state.cart.products.length > 0
  ) {
    return 120;
  } else {
    return 0;
  }
};

export const grandTotalSelector = (state: RootState) => {
  const subTotal = subTotalSelector(state);
  const shippingCost = shippingCostSelector(state);

  return subTotal + shippingCost;
};

// Address
export const citySelector = (state: RootState) => {
  return state.cart.city;
};

export const shippingAddressSelector = (state: RootState) => {
  return state.cart.shippingAddress;
};

export const {
  addProduct,
  removeProduct,
  increaseQuantity,
  decreaseQuantity,
  updateCity,
  updateShippingAddress,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
