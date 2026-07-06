import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import BackButton from "../components/BackButton";
import toast from "react-hot-toast";

export default function Checkout() {
  const navigate = useNavigate();
  const [cart, setCart] = useState<any[]>([]);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [availableCoupons, setAvailableCoupons] = useState<any[]>([]);

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);

    const fetchCoupons = async () => {
      try {
        const res = await API.get("/coupons");
        setAvailableCoupons(res.data);
      } catch {
        console.log("Failed to fetch coupons");
      }
    };

    fetchCoupons();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if ((name === "phone" || name === "pincode") && !/^\d*$/.test(value)) {
      return;
    }

    setAddress({ ...address, [name]: value });
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const finalTotal = total - discount;

  const applyCoupon = async () => {
    if (!coupon.trim()) {
      toast.error("Please enter coupon code");
      return;
    }

    try {
      const res = await API.post("/coupons/validate", {
        code: coupon,
        total,
      });

      setDiscount(res.data.discount);
      toast.success(res.data.message);
    } catch (error: any) {
      setDiscount(0);
      toast.error(error.response?.data?.message || "Invalid coupon");
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    if (address.phone.length !== 10) {
      toast.error("Phone number must be exactly 10 digits");
      return;
    }

    if (address.pincode.length !== 6) {
      toast.error("Pincode must be exactly 6 digits");
      return;
    }

    try {
      await API.post("/orders", {
        address,
        couponCode: coupon,
        discount,
        finalTotal,
        items: cart.map((item) => ({
          product: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
      });

      localStorage.removeItem("cart");
      toast.success("Order placed successfully");
      navigate("/orders");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Order failed");
    }
  };

  const [couponLoading, setCouponLoading] = useState(true);

useEffect(() => {
  const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
  setCart(savedCart);

  const fetchCoupons = async () => {
    try {
      const res = await API.get("/coupons");
      setAvailableCoupons(res.data);
    } finally {
      setCouponLoading(false);
    }
  };

  fetchCoupons();
}, []);

  return (
    <div className="min-h-screen bg-black px-4 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-2xl">
        <BackButton />

        <form
          onSubmit={handlePlaceOrder}
          className="rounded-xl bg-slate-900 p-5 sm:p-8"
        >
          <h1 className="mb-6 text-2xl font-bold text-yellow-300 sm:text-3xl">
            Checkout
          </h1>

          <div className="mb-6 rounded bg-slate-800 p-4">
            <p className="font-bold">Items: {cart.length}</p>
            <p className="font-bold">Total: ₹{total}</p>
          </div>

          <div className="mb-6 rounded bg-slate-800 p-4">
            <h2 className="mb-2 font-bold text-yellow-300">
              Available Coupons
            </h2>

              {couponLoading ? (
                <div className="space-y-2">
                    {[...Array(2)].map((_, i) => (
                    <div
                        key={i}
                        className="h-10 animate-pulse rounded bg-slate-700"
                    ></div>
                    ))}
                </div>
                ) : availableCoupons.length === 0 ? (
                <p className="text-slate-400">No active coupons available</p>
                ) : (
              <div className="space-y-2">
                {availableCoupons.map((item: any) => (
                  <button
                    type="button"
                    key={item._id}
                    onClick={() => setCoupon(item.code)}
                    className="block w-full rounded bg-slate-900 px-3 py-2 text-left hover:bg-slate-700"
                  >
                    <span className="font-bold text-yellow-300">
                      {item.code}
                    </span>{" "}
                    → {item.discount}% OFF
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <input
              required
              name="fullName"
              value={address.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="rounded bg-slate-800 p-3 outline-none focus:ring-2 focus:ring-yellow-400 sm:col-span-2"
            />

            <input
              required
              type="tel"
              name="phone"
              value={address.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              maxLength={10}
              pattern="[0-9]{10}"
              title="Phone number must be exactly 10 digits"
              className="rounded bg-slate-800 p-3 outline-none focus:ring-2 focus:ring-yellow-400"
            />

            <input
              required
              name="pincode"
              value={address.pincode}
              onChange={handleChange}
              placeholder="Pincode"
              maxLength={6}
              pattern="[0-9]{6}"
              title="Pincode must be exactly 6 digits"
              className="rounded bg-slate-800 p-3 outline-none focus:ring-2 focus:ring-yellow-400"
            />

            <input
              required
              name="street"
              value={address.street}
              onChange={handleChange}
              placeholder="Street Address"
              className="rounded bg-slate-800 p-3 outline-none focus:ring-2 focus:ring-yellow-400 sm:col-span-2"
            />

            <input
              required
              name="city"
              value={address.city}
              onChange={handleChange}
              placeholder="City"
              className="rounded bg-slate-800 p-3 outline-none focus:ring-2 focus:ring-yellow-400"
            />

            <input
              required
              name="state"
              value={address.state}
              onChange={handleChange}
              placeholder="State"
              className="rounded bg-slate-800 p-3 outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <input
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Enter coupon code"
              className="flex-1 rounded bg-slate-800 p-3 outline-none focus:ring-2 focus:ring-yellow-400"
            />

            <button
              type="button"
              onClick={applyCoupon}
              className="rounded bg-slate-700 px-5 py-3 font-bold hover:bg-slate-600"
            >
              Apply
            </button>
          </div>

          <div className="mt-6 rounded bg-slate-800 p-4">
            <p>Discount: ₹{discount}</p>
            <p className="mt-2 text-xl font-bold text-yellow-300">
              Final Total: ₹{finalTotal}
            </p>
          </div>

          <button className="mt-6 w-full rounded bg-yellow-400 py-3 font-bold text-black hover:bg-yellow-300">
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}