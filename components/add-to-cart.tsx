import React, { FC } from "react";
import { Button } from "./ui/button";
import { ShoppingBag } from "lucide-react";
import { addToCart } from "@/redux/features/cart-slice";
import { useAppSelector } from "@/hooks/use-app-selector";
import { useToast } from "@/hooks/use-toast";
import { addToCartMessages } from "@/lib/messages";
import { useAppDispatch } from "@/hooks/use-app-dispatch";

interface AddToCartProps {
  product: any;
  link?: boolean;
}

const AddToCart: FC<AddToCartProps> = ({ product, link = false }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const {toast} = useToast();

  const handleAddToCart = (product: any) => {
    if (!user) {
      toast({
        title: addToCartMessages.loginRequiredTitle,
        description: addToCartMessages.loginRequiredDescription,
        variant: "destructive",
      });
      return;
    }

    dispatch(addToCart(product));
    toast({
      title: addToCartMessages.addedToCartTitle,
      description: addToCartMessages.addedToCartDescription(product.name),
    });
  };

  return (
    <Button
      size="sm"
      className="flex items-center"
      onClick={link ? undefined : () => handleAddToCart(product)}
    >
      <ShoppingBag className="h-4 w-4 mr-2" />
      Add to Cart
    </Button>
  );
};

export default AddToCart;

