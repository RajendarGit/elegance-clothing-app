"use client";

import Link from "next/link";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import EmptyCart from "@/components/empty-cart";
import CartBody from "@/components/cart-body";
import OrderSummary from "@/components/order-summary";
import { useAppSelector } from "@/hooks/use-app-selector";
import { withAuthProtection } from "@/components/hoc/with-auth-protection";
import { clearCart } from "@/redux/features/cart-slice";

function CartPage() {
  const { items } = useAppSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <Container>
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4">Product</th>
                    <th className="text-center p-4 hidden sm:table-cell">
                      Price
                    </th>
                    <th className="text-center p-4">Quantity</th>
                    <th className="text-right p-4">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <CartBody
                    items={items.map((item) => ({
                      ...item,
                      id: String(item.id),
                    }))}
                  />
                </tbody>
              </table>
            </div>

            <div className="flex justify-between mt-6">
              <Button variant="outline" asChild>
                <Link href="/products">Continue Shopping</Link>
              </Button>
              <Button variant="outline" onClick={() => dispatch(clearCart())}>
                Clear Cart
              </Button>
            </div>
          </div>

          <div>
            <OrderSummary />
          </div>
        </div>
      )}
    </Container>
  );
}

export default withAuthProtection(CartPage);
