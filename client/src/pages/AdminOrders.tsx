import { useEffect, useState } from "react";
import API from "../api/axios";
import BackButton from "../components/BackButton";
import toast from "react-hot-toast";
import SkeletonList from "../components/SkeletonList";

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
  try {
    setLoading(true);
    const res = await API.get("/orders/admin/all");
    setOrders(res.data);
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Failed to fetch orders");
  } finally {
    setLoading(false);
  }
};

  const updateStatus = async (id: string, orderStatus: string) => {
    try {
      await API.put(`/orders/admin/${id}/status`, { orderStatus });
      fetchOrders();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getAddress = (address: any) => {
    if (!address) return "No address";
    if (typeof address === "string") return address;

    return `${address.street || ""}, ${address.city || ""}, ${
      address.state || ""
    } - ${address.pincode || ""}`;
  };

  return (
    <div className="min-h-screen bg-black px-4 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-5xl">
        <BackButton />

        <h1 className="mb-8 text-2xl font-bold text-yellow-300 sm:text-3xl">
          Admin Orders
        </h1>
        {loading && (
        <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
            <SkeletonList key={index} />
            ))}
        </div>
        )}

        {!loading && orders.length === 0 ? (
          <p className="text-slate-400">No orders found.</p>
        ) : (
        !loading && (
            <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="rounded-xl bg-slate-900 p-5 sm:p-6"
              >
                <p className="break-words font-bold text-yellow-300">
                  Customer: {order.user?.name} ({order.user?.email})
                </p>

                <p className="mt-2 break-words text-slate-300">
                  Address: {getAddress(order.address)}
                </p>

                <div className="mt-4 space-y-1">
                  <p>Original Total: ₹{order.totalAmount}</p>

                  {order.couponCode && (
                    <p className="text-green-400">
                      Coupon Applied: {order.couponCode}
                    </p>
                  )}

                  {order.discount > 0 && (
                    <p className="text-red-400">Discount: ₹{order.discount}</p>
                  )}

                  <p className="font-bold text-yellow-300">
                    Final Total: ₹{order.finalTotal || order.totalAmount}
                  </p>
                </div>

                <select
                  value={order.orderStatus}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                  className="mt-4 w-full rounded bg-slate-800 p-3 outline-none focus:ring-2 focus:ring-yellow-400 sm:w-auto"
                >
                  <option>Pending</option>
                  <option>Processing</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
                </select>
              </div>
            ))}
          </div>
        )
        )}
      </div>
    </div>
  );
}