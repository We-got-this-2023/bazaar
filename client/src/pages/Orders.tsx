import OrderCard from "../components/OrderCard";
import ProductPreview from "../components/ProductPreview";
import { useAuth } from "../context/AuthContext";
export default function Orders() {
  const { user } = useAuth();

  return (
    <div className="mt-2 flex flex-col items-center justify-center gap-3">
      <h2 className="text-2xl font-bold">Order History</h2>
      <div className="flex flex-col gap-3">
        {/* Not functional at the moment */}
        {/* {user.orders.map((order: any) => {
          return <OrderCard order={order} />;
        })} */}
        <OrderCard
          order={{ time: "10am - 7pm", id: "1", title: "Something" }}
        />
        <OrderCard
          order={{ time: "10am - 7pm", id: "1", title: "Something else" }}
        />
        <OrderCard
          order={{
            time: "10am - 7pm",
            id: "1",
            title: "Something else... else?",
          }}
        />
      </div>
    </div>
  );
}
