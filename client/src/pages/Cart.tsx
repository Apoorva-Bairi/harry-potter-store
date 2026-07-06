import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";
import toast from "react-hot-toast";
import SkeletonList from "../components/SkeletonList";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  stock: number;
}

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      setLoading(true);
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
    setTimeout(() => {
    setLoading(false);
  }, 500);
  }, []);

  const updateCart = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increaseQty = (id: string) => {
    const updatedCart = cart.map((item) => {
      if (item._id === id) {
        if (item.quantity >= item.stock) {
          toast.error("Only available stock can be added");
          return item;
        }

        return { ...item, quantity: item.quantity + 1 };
      }

      return item;
    });

    updateCart(updatedCart);
  };

  const decreaseQty = (id: string) => {
    const updatedCart = cart.map((item) =>
      item._id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );

    updateCart(updatedCart);
  };

  const removeItem = (id: string) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    updateCart(updatedCart);
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  

  return (
    <div className="min-h-screen bg-black px-4 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-5xl">
        <BackButton />

        <h1 className="mb-8 text-2xl font-bold text-yellow-300 sm:text-3xl">
          Your Cart
        </h1>

        {loading && (
        <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
            <SkeletonList key={index} />
            ))}
        </div>
        )}

        {!loading && cart.length === 0 ? (
          <p className="text-slate-400">Your cart is empty.</p>
        ) : (
          !loading && (
            <>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                  key={item._id}
                  className="flex flex-col gap-4 rounded-xl bg-slate-900 p-4 sm:flex-row sm:items-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-40 w-full rounded object-cover sm:h-24 sm:w-24"
                  />

                  <div className="flex-1">
                    <h2 className="font-bold">{item.name}</h2>
                    <p>₹{item.price}</p>

                    {item.stock === 0 ? (
                      <p className="font-bold text-red-400">Out of stock</p>
                    ) : (
                      <p className="text-slate-400">
                        Available stock: {item.stock}
                      </p>
                    )}

                    <div className="mt-3 flex items-center gap-3">
                      <button
                        onClick={() => decreaseQty(item._id)}
                        className="rounded bg-slate-700 px-3 py-1"
                      >
                        -
                      </button>

                      <span>Qty: {item.quantity}</span>

                      <button
                        onClick={() => increaseQty(item._id)}
                        className="rounded bg-slate-700 px-3 py-1"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeItem(item._id)}
                    className="rounded bg-red-600 px-4 py-2 font-bold hover:bg-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-xl bg-slate-900 p-5">
              <h2 className="text-2xl font-bold text-yellow-300">
                Total: ₹{total}
              </h2>

              <Link
                to="/checkout"
                className="mt-6 block rounded bg-yellow-400 px-6 py-3 text-center font-bold text-black hover:bg-yellow-300 sm:inline-block"
              >
                Proceed to Checkout
              </Link>
            </div>
          </>
        ) )}  
        
      </div>
    </div>
  );
}