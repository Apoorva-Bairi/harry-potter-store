import { useEffect, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import BackButton from "../components/BackButton";

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  _id: string;
  items: OrderItem[];
  totalAmount: number;
  couponCode: string;
  discount: number;
  finalTotal: number;
  address: any;
  orderStatus: string;
  createdAt: string;
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
  try {
    setLoading(true);
    const res = await API.get("/orders/my-orders");
    setOrders(res.data);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchOrders();
  }, []);

  const getAddress = (address: any) => {
    if (!address) return "No address";
    if (typeof address === "string") return address;

    return `${address.fullName}, ${address.phone}, ${address.street}, ${address.city}, ${address.state} - ${address.pincode}`;
  };

  const cancelOrder = async (id: string) => {
    try {
      await API.put(`/orders/${id}/cancel`);
      toast.success("Order cancelled");
      fetchOrders();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Cancel failed");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10 sm:px-8">
      <BackButton />
      <h1 className="text-3xl font-bold text-yellow-300 mb-8">My Orders</h1>

      {loading && (
  <div className="space-y-6">
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="animate-pulse rounded-xl bg-slate-900 p-6"
      >
        <div className="mb-4 h-5 w-40 rounded bg-slate-800"></div>
        <div className="mb-4 h-4 w-full rounded bg-slate-800"></div>
        <div className="mb-3 h-16 w-full rounded bg-slate-800"></div>
        <div className="h-8 w-32 rounded bg-slate-800"></div>
      </div>
    ))}
  </div>
)}

      {!loading && orders.length === 0 ? (
  <p>No orders found.</p>
) :  ( !loading &&
        orders.map((order) => (
          <div
            key={order._id}
            className="block bg-slate-900 p-6 rounded-xl mb-6"
          >
            <p className="text-yellow-300 font-bold">
              Order Status: {order.orderStatus}
            </p>

            <p className="text-slate-400 mb-4">
              Address: {getAddress(order.address)}
            </p>

            {order.items.map((item, index) => (
              <div key={index} className="flex items-center gap-4 mb-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded object-cover"
                />

                <div>
                  <h2 className="font-bold">{item.name}</h2>
                  <p>
                    ₹{item.price} × {item.quantity}
                  </p>
                </div>
              </div>
            ))}

            <p className="mt-4">Original Total: ₹{order.totalAmount}</p>

            {order.couponCode && (
              <p className="text-green-400">
                Coupon Applied: {order.couponCode}
              </p>
            )}

            {order.discount > 0 && (
              <p className="text-red-400">Discount: ₹{order.discount}</p>
            )}

            <p className="text-xl font-bold mt-2 text-yellow-300">
              Final Total: ₹{order.finalTotal || order.totalAmount}
            </p>

            <div className="flex flex-wrap gap-4 mt-4">
              <Link
                to={`/orders/${order._id}`}
                className="bg-yellow-400 text-black px-4 py-2 rounded font-bold"
              >
                View Details
              </Link>

              {order.orderStatus === "Pending" && (
                <button
                  onClick={() => cancelOrder(order._id)}
                  className="bg-red-600 px-4 py-2 rounded font-bold"
                >
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}