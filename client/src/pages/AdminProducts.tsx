import { useEffect, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";
import SkeletonList from "../components/SkeletonList";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  house: string;
  stock: number;
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
  try {
    setLoading(true);
    const res = await API.get("/products");
    setProducts(res.data.products);
  } finally {
    setLoading(false);
  }
};

  const deleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    await API.delete(`/products/${id}`);
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-black px-4 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">
        <BackButton />

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold text-yellow-300 sm:text-3xl">
            Manage Products
          </h1>

          <Link
            to="/admin/add-product"
            className="rounded bg-yellow-400 px-5 py-2 text-center font-bold text-black hover:bg-yellow-300"
          >
            Add Product
          </Link>
        </div>

        {loading && (
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <SkeletonList key={index} />
            ))}
          </div>
        )}

        {!loading && products.length === 0 ? (
          <p className="text-slate-400">No products found.</p>
        ) : (!loading && (
          <div className="grid gap-5">
            {products.map((product) => (
              <div
                key={product._id}
                className="flex flex-col gap-4 rounded-xl bg-slate-900 p-4 sm:flex-row sm:items-center"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-40 w-full rounded object-cover sm:h-24 sm:w-24"
                />

                <div className="flex-1">
                  <h2 className="text-lg font-bold sm:text-xl">
                    {product.name}
                  </h2>

                  <p className="text-slate-400">
                    {product.category} | {product.house}
                  </p>

                  <p className="font-bold text-yellow-300">₹{product.price}</p>

                  <p
                    className={
                      product.stock <= 3 ? "text-red-400" : "text-slate-300"
                    }
                  >
                    Stock: {product.stock}
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    to={`/admin/edit-product/${product._id}`}
                    className="rounded bg-blue-600 px-4 py-2 text-center font-bold hover:bg-blue-500"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="rounded bg-red-600 px-4 py-2 font-bold hover:bg-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}