import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import BackButton from "../components/BackButton";
import SkeletonCard from "../components/SkeletonCard";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  house: string;
  stock: number;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [suggestions, setSuggestions] = useState<Product[]>([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [house, setHouse] = useState("");
  const [sort, setSort] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await API.get("/products", {
        params: {
          page,
          limit: 8,
          search,
          category,
          house,
          sort,
        },
      });

      setProducts(res.data.products);
      setTotalPages(res.data.totalPages || 1);
    } catch {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = async (value: string) => {
    setSearch(value);
    setPage(1);

    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await API.get("/products", {
        params: {
          search: value,
          limit: 5,
        },
      });

      setSuggestions(res.data.products);
    } catch {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, category, house, sort, page]);

  return (
    <div className="min-h-screen bg-black px-4 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <BackButton />

        <h1 className="mb-8 text-2xl font-bold text-yellow-300 sm:text-3xl">
          Magical Products
        </h1>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full rounded bg-slate-800 p-3 outline-none focus:ring-2 focus:ring-yellow-400"
            />

            {suggestions.length > 0 && (
              <div className="absolute z-50 mt-2 w-full overflow-hidden rounded bg-slate-900 shadow-lg">
                {suggestions.map((product) => (
                  <Link
                    key={product._id}
                    to={`/product/${product._id}`}
                    onClick={() => setSuggestions([])}
                    className="block px-4 py-3 hover:bg-slate-800"
                  >
                    {product.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            className="rounded bg-slate-800 p-3 outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="">All Categories</option>
            <option value="Wands">Wands</option>
            <option value="Robes">Robes</option>
            <option value="Mugs">Mugs</option>
            <option value="Scarves">Scarves</option>
            <option value="Books">Books</option>
            <option value="Accessories">Accessories</option>
          </select>

          <select
            value={house}
            onChange={(e) => {
              setHouse(e.target.value);
              setPage(1);
            }}
            className="rounded bg-slate-800 p-3 outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="">All Houses</option>
            <option value="Gryffindor">Gryffindor</option>
            <option value="Slytherin">Slytherin</option>
            <option value="Ravenclaw">Ravenclaw</option>
            <option value="Hufflepuff">Hufflepuff</option>
          </select>

          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
            className="rounded bg-slate-800 p-3 outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="">Sort By</option>
            <option value="price-low">Price Low to High</option>
            <option value="price-high">Price High to Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>

        {loading && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(8)].map((_, index) => (
            <SkeletonCard key={index} />
            ))}
        </div>
        )}

        {error && <p className="text-red-400">{error}</p>}

        {!loading && !error && products.length === 0 && (
          <p className="text-slate-400">No products found.</p>
        )}

        {!loading && !error && products.length > 0 && (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
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
                    <p className="text-slate-400">{product.category}</p>

                    <p className="mt-2 font-bold text-yellow-300">
                      ₹{product.price}
                    </p>

                    {product.stock === 0 ? (
                      <p className="mt-2 font-bold text-red-400">
                        Out of Stock
                      </p>
                    ) : (
                      <p className="mt-2 text-green-400">
                        In Stock: {product.stock}
                      </p>
                    )}

                    <Link
                      to={`/product/${product._id}`}
                      className="mt-4 block rounded bg-yellow-400 py-2 text-center font-bold text-black hover:bg-yellow-300"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <button
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
                className="rounded bg-slate-800 px-4 py-2 disabled:opacity-50"
              >
                Previous
              </button>

              <span className="px-4 py-2">
                Page {page} of {totalPages}
              </span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage((prev) => prev + 1)}
                className="rounded bg-slate-800 px-4 py-2 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}