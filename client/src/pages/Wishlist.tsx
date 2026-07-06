import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import SkeletonCard from "../components/SkeletonCard";

interface WishlistProduct {
  _id: string;
  name: string;
  price: number;
  image: string;
}

export default function Wishlist() {
  const [wishlist, setWishlist] = useState<WishlistProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(savedWishlist);
    setTimeout(() => {
    setLoading(false);
  }, 500);

  setLoading(false);
  }, []);

  const removeFromWishlist = (id: string) => {
    const updatedWishlist = wishlist.filter((item) => item._id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

 
  return (
    <div className="min-h-screen bg-black px-4 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <BackButton />

        <h1 className="mb-8 mt-4 text-2xl font-bold text-yellow-300 sm:text-3xl">
          My Wishlist
        </h1>

         {loading && (
        <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
            <SkeletonCard key={index} />
            ))}
        </div>
        )}


        {!loading && wishlist.length === 0 ? (
          <div className="rounded-xl bg-slate-900 p-8 text-center">
            <p className="text-slate-400">Your wishlist is empty.</p>

            <Link
              to="/products"
              className="mt-4 inline-block rounded bg-yellow-400 px-6 py-3 font-bold text-black hover:bg-yellow-300"
            >
              Explore Products
            </Link>
          </div>
        ) : !loading && (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {wishlist.map((product) => (
              <div
                key={product._id}
                className="overflow-hidden rounded-xl bg-slate-900"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-56 w-full object-cover"
                />

                <div className="p-4">
                  <h2 className="text-lg font-bold">{product.name}</h2>

                  <p className="mt-2 font-bold text-yellow-300">
                    ₹{product.price}
                  </p>

                  <Link
                    to={`/product/${product._id}`}
                    className="mt-4 block rounded bg-yellow-400 py-2 text-center font-bold text-black hover:bg-yellow-300"
                  >
                    View Details
                  </Link>

                  <button
                    onClick={() => removeFromWishlist(product._id)}
                    className="mt-3 w-full rounded bg-red-600 py-2 font-bold hover:bg-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}