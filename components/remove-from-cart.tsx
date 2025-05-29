import React from "react";
import { Button } from "./ui/button";
import { removeFromCart } from "@/redux/features/cart-slice";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import { RootState } from "@/redux/store";

interface RemoveFromCartProps {
  id: number;
}

const RemoveFromCart: React.FC<RemoveFromCartProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state: RootState) => state.cart.items);

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(id));
  };

  return (
    <Button
      onClick={handleRemoveFromCart}
      className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      disabled={!items.some((item) => item.id === id)}
    >
      Remove from Cart
    </Button>
  );
};

export default RemoveFromCart;

