import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import BackButton from "../components/BackButton";

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Address {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
}

interface Order {
  _id: string;
  items: OrderItem[];
  totalAmount: number;
  discount: number;
  finalTotal: number;
  couponCode: string;
  address: Address;
  orderStatus: string;
  createdAt: string;
}

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const res = await API.get(`/orders/${id}`);
      setOrder(res.data);
    };

    fetchOrder();
  }, [id]);

  if (!order) {
    return (
      <div className="min-h-screen bg-black px-4 py-10 text-white md:px-8">
        <div className="mx-auto max-w-4xl">
          <BackButton />

          <div className="mt-6 animate-pulse rounded-xl bg-slate-900 p-4 sm:p-6">
            <div className="mb-6 h-8 w-48 rounded bg-slate-800"></div>

            <div className="space-y-3">
              <div className="h-4 w-full rounded bg-slate-800"></div>
              <div className="h-4 w-1/2 rounded bg-slate-800"></div>
              <div className="h-4 w-2/3 rounded bg-slate-800"></div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="h-10 w-28 rounded-full bg-slate-800"
                ></div>
              ))}
            </div>

            <div className="mt-8 h-32 rounded-lg bg-slate-800"></div>
            <div className="mt-8 h-40 rounded-lg bg-slate-800"></div>
            <div className="mt-8 h-32 rounded-lg bg-slate-800"></div>
          </div>
        </div>
      </div>
    );
  }

  const orderSteps = ["Pending", "Processing", "Shipped", "Delivered"];
  const currentStep = orderSteps.indexOf(order.orderStatus);

  return (
    <div className="min-h-screen bg-black px-4 py-10 text-white md:px-8">
      <div className="mx-auto max-w-4xl">
        <BackButton />

        <div className="mt-6 rounded-xl bg-slate-900 p-4 sm:p-6">
          <h1 className="mb-6 text-2xl font-bold text-yellow-300 sm:text-3xl">
            Order Details
          </h1>

          <div className="space-y-2 text-sm sm:text-base">
            <p>
              <strong>Order ID:</strong> {order._id}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              <span className="text-yellow-300">{order.orderStatus}</span>
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {orderSteps.map((step, index) => (
              <div
                key={step}
                className={`rounded-full px-4 py-2 text-sm font-bold ${
                  index <= currentStep
                    ? "bg-yellow-400 text-black"
                    : "bg-slate-700 text-white"
                }`}
              >
                {step}
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-lg bg-slate-800 p-4">
            <h2 className="mb-3 text-lg font-bold text-yellow-300">
              Shipping Address
            </h2>

            <div className="space-y-1 text-slate-300">
              <p>{order.address.fullName}</p>
              <p>{order.address.phone}</p>
              <p>{order.address.street}</p>
              <p>
                {order.address.city}, {order.address.state} -{" "}
                {order.address.pincode}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="mb-4 text-xl font-bold text-yellow-300">
              Ordered Items
            </h2>

            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-4 rounded-lg border border-slate-700 p-4 sm:flex-row sm:items-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-24 rounded object-cover"
                  />

                  <div>
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="text-slate-400">₹{item.price}</p>
                    <p className="text-slate-400">Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-lg bg-slate-800 p-4">
            <h2 className="mb-4 text-xl font-bold text-yellow-300">
              Payment Summary
            </h2>

            <div className="space-y-2 text-slate-300">
              <p>Total: ₹{order.totalAmount}</p>

              {order.discount > 0 && (
                <p className="text-red-400">Discount: ₹{order.discount}</p>
              )}

              <p>
                Coupon:{" "}
                <span className="text-green-400">
                  {order.couponCode || "No coupon used"}
                </span>
              </p>

              <p className="mt-4 text-2xl font-bold text-yellow-300">
                Final Total: ₹{order.finalTotal || order.totalAmount}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}