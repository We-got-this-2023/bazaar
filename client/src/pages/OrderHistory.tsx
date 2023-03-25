import { useEffect, useState } from "react";
import { Order } from "../cards/Checkout";
import OrderCard from "../cards/Order";
import { useAuth } from "../contexts/AuthContext";
export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  // Leaving this unused variable as it I haven't set up
  // the functionality for requesting to the backend yet.
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          import.meta.env.VITE_API + "/order/all/" + user.id,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Bearer " +
                document.cookie
                  .split(";")
                  .find((c) => c.trim().startsWith("token="))
                  ?.split("=")[1],
            },
          }
        );
        const json = await res.json();
        if (!res.ok) throw new Error(json.message);
        console.log(json);
        setOrders(json);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <h2 className="text-2xl font-bold">Order History</h2>
      <div className="flex flex-col gap-3">
        {(orders.length &&
          orders.map((order: any) => {
            return <OrderCard order={order} />;
          })) || <div>You have no orders</div>}
      </div>
    </div>
  );
}
