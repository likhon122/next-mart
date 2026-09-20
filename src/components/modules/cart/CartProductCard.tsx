import { Button } from "@/components/ui/button";
import {
  decreaseQuantity,
  ICartProduct,
  increaseQuantity,
  removeProduct,
} from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Minus, Plus, Trash } from "lucide-react";
import Image from "next/image";

export default function CartProductCard({
  product,
}: {
  product: ICartProduct;
}) {
  const dispatch = useAppDispatch();

  const handleIncreaseQuantity = (productId: string) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecreaseQuantity = (productId: string) => {
    dispatch(decreaseQuantity(productId));
  };

  const handleRemoveProduct = (productId: string) => {
    dispatch(removeProduct(productId));
  };
  return (
    <div className="bg-white rounded-lg flex p-5 gap-5">
      <div className="h-full w-32 rounded-md overflow-hidden">
        <Image
          src={product?.imageUrls?.[0]}
          height={200}
          width={200}
          alt="product"
          className="aspect-square object-cover"
        />
      </div>
      <div className="flex flex-col justify-between grow">
        <h1 className="text-xl font-semibold">{product?.name}</h1>
        <div className="flex gap-5 my-2">
          <p>
            <span className="text-gray-500">Color:</span>{" "}
            <span className="font-semibold">Black</span>
          </p>
          <p>
            <span className="text-gray-500">Stock Availability:</span>{" "}
            <span className="font-semibold">{product?.stock}</span>
          </p>
        </div>
        <hr className="my-1" />
        <div className="flex items-center justify-between">
          <h2>
            Price:
            {product.offerPrice ? product.offerPrice : product.price}
          </h2>
          <div className="flex items-center gap-2">
            <p className="text-gray-500 font-semibold">Quantity</p>
            <Button
              onClick={() => handleDecreaseQuantity(product._id)}
              variant="outline"
              className="size-8 rounded-sm cursor-pointer"
            >
              <Minus />
            </Button>
            <p className="font-semibold text-xl p-2">
              {product?.orderQuantity}
            </p>
            <Button
              onClick={() => handleIncreaseQuantity(product._id)}
              variant="outline"
              className="size-8 rounded-sm cursor-pointer"
            >
              <Plus />
            </Button>
            <Button
              onClick={() => handleRemoveProduct(product._id)}
              variant="outline"
              className="size-8 rounded-sm cursor-pointer"
            >
              <Trash className="text-red-500/50" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
