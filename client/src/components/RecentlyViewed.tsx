import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface ViewedProduct {
  _id: string;
  name: string;
  price: number;
  image: string;
}

export default function RecentlyViewed() {
  const [items, setItems] = useState<ViewedProduct[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
    setItems(saved);
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="mb-4 text-2xl font-bold text-yellow-300">
        Recently Viewed
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {items.map((item) => (
          <Link
            key={item._id}
            to={`/product/${item._id}`}
            className="overflow-hidden rounded-xl bg-slate-900 transition hover:-translate-y-1 hover:bg-slate-800"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-40 w-full object-cover"
            />

            <div className="p-3">
              <h3 className="font-bold">{item.name}</h3>

              <p className="mt-1 text-yellow-300">₹{item.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}