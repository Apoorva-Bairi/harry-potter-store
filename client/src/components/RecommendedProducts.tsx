import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface Props {
  category: string;
  currentProductId: string;
}

export default function RecommendedProducts({
  category,
  currentProductId,
}: Props) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchRecommended = async () => {
      const res = await API.get("/products", {
        params: {
          category,
          limit: 4,
        },
      });

      const filtered = res.data.products.filter(
        (product: Product) => product._id !== currentProductId
      );

      setProducts(filtered);
    };

    fetchRecommended();
  }, [category, currentProductId]);

  if (products.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="mb-4 text-2xl font-bold text-yellow-300">
        You May Also Like
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {products.map((product) => (
          <Link
            key={product._id}
            to={`/product/${product._id}`}
            className="overflow-hidden rounded-xl bg-slate-900 transition hover:-translate-y-1 hover:bg-slate-800"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-40 w-full object-cover"
            />

            <div className="p-3">
              <h3 className="font-bold">{product.name}</h3>
              <p className="text-yellow-300">₹{product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}