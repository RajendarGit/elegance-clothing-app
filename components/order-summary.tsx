import React, { FC, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useAppSelector } from "@/hooks/use-app-selector";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { addToCartMessages } from "@/lib/messages";
import EmptyCartSignIn from "./empty-cart-sign-in";

const OrderSummary = () => {
  const [promoCode, setPromoCode] = useState("");
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const { items } = useAppSelector((state) => state.cart);
  const subtotal = items.reduce(
    (total, item) => total + item.price * (item.quantity ?? 1),
    0
  );
  const shipping = subtotal > 50 ? 0 : 5.99;
  const discount = 0; // Would be calculated based on promo code
  const total = subtotal + shipping - discount;
  const router = useRouter();
  const { toast } = useToast();

  const handleApplyPromo = () => {
    if (!promoCode) return;

    setIsApplyingPromo(true);

    // Simulate API call to validate promo code
    setTimeout(() => {
      toast({
        title: addToCartMessages.inValidPromoCodeTitle,
        description: addToCartMessages.invalidPromoCodeDescription,
        variant: "destructive",
      });
      setIsApplyingPromo(false);
    }, 1000);
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      toast({
        title: addToCartMessages.emptyCartTitle,
        description: addToCartMessages.emptyCartDescription,
        variant: "destructive",
      });
      return;
    }

    router.push("/checkout");
  };

  if (!user) {
    return <EmptyCartSignIn />;
  }

  return (
    <div className="border rounded-lg p-6 space-y-6">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Discount</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}
        <div className="border-t pt-2 mt-2">
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="pt-2">
        <label htmlFor="promo" className="text-sm font-medium mb-2 block">
          Promo Code
        </label>
        <div className="flex space-x-2">
          <Input
            id="promo"
            placeholder="Enter code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
          />
          <Button
            variant="outline"
            onClick={handleApplyPromo}
            disabled={isApplyingPromo || !promoCode}
          >
            {isApplyingPromo ? "Applying..." : "Apply"}
          </Button>
        </div>
      </div>

      <Button className="w-full" size="lg" onClick={handleCheckout}>
        Checkout
      </Button>

      <div className="text-sm text-muted-foreground text-center">
        Taxes calculated at checkout
      </div>
    </div>
  );
};

export default OrderSummary;
