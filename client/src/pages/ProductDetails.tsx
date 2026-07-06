import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import RecentlyViewed from "../components/RecentlyViewed";
import RecommendedProducts from "../components/RecommendedProducts";
import BackButton from "../components/BackButton";
import toast from "react-hot-toast";

interface Review {
  name: string;
  rating: number;
  comment: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  house: string;
  stock: number;
  description: string;
  averageRating: number;
  numReviews: number;
  reviews: Review[];
}

export default function ProductDetails() {
  const { id } = useParams();
  const { user } = useAuth();

  const [product, setProduct] = useState<Product | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await API.get(`/products/${id}`);
      setProduct(res.data);

      const viewed = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
      const filtered = viewed.filter(
        (item: Product) => item._id !== res.data._id
      );

      const updated = [res.data, ...filtered].slice(0, 4);
      localStorage.setItem("recentlyViewed", JSON.stringify(updated));

      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      const exists = wishlist.find(
        (item: Product) => item._id === res.data._id
      );

      setIsWishlisted(!!exists);
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-black px-4 py-10 text-white sm:px-8">
        <div className="mx-auto max-w-6xl">
          <BackButton />

          <div className="grid gap-8 lg:grid-cols-[45%_55%]">
            <div className="h-[450px] animate-pulse rounded-xl bg-slate-900"></div>

            <div className="space-y-4">
              <div className="h-10 w-3/4 animate-pulse rounded bg-slate-900"></div>
              <div className="h-5 w-1/2 animate-pulse rounded bg-slate-900"></div>
              <div className="h-8 w-1/3 animate-pulse rounded bg-slate-900"></div>
              <div className="h-24 w-full animate-pulse rounded bg-slate-900"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const addToCart = () => {
    if (product.stock === 0) {
      toast.error("Product is out of stock");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingProduct = cart.find(
      (item: Product & { quantity: number }) => item._id === product._id
    );

    if (existingProduct) {
      if (existingProduct.quantity >= product.stock) {
        toast.error("Only available stock can be added");
        return;
      }

      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Added to cart");
  };

  const addToWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

    const alreadyExists = wishlist.find(
      (item: Product) => item._id === product._id
    );

    if (alreadyExists) {
      setIsWishlisted(true);
      toast.error("Already in wishlist");
      return;
    }

    wishlist.push(product);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    setIsWishlisted(true);
    toast.success("Added to wishlist");
  };

  const submitReview = async () => {
    if (!comment.trim()) {
      toast.error("Please write a review comment");
      return;
    }

    try {
      await API.post(`/products/${id}/review`, {
        rating,
        comment,
      });

      toast.success("Review added");

      const res = await API.get(`/products/${id}`);
      setProduct(res.data);

      setComment("");
      setRating(5);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Review failed");
    }
  };

  return (
    <div className="min-h-screen bg-black px-4 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">
        <BackButton />

        <div className="grid gap-10 lg:grid-cols-[45%_55%]">
          <div className="rounded-xl bg-slate-900 p-4 lg:sticky lg:top-28 lg:self-start">
            <img
              src={product.image}
              alt={product.name}
              className="h-[320px] w-full rounded-lg object-contain sm:h-[420px] lg:h-[500px]"
            />
          </div>

          <div>
            <h1 className="mb-4 text-3xl font-bold text-yellow-300 sm:text-4xl">
              {product.name}
            </h1>

            <div className="mb-4 space-y-2 text-slate-400">
              <p>Category: {product.category}</p>
              <p>House: {product.house}</p>
            </div>

            <p className="mb-4 text-3xl font-bold text-yellow-300">
              ₹{product.price}
            </p>

            <p className="mb-6 font-medium">
              ⭐ {product.averageRating || 0} ({product.numReviews || 0}{" "}
              reviews)
            </p>

            <div className="mb-6">
              <h2 className="mb-2 text-lg font-semibold text-yellow-300">
                Description
              </h2>

              <p className="leading-8 text-slate-300">
                {product.description}
              </p>
            </div>

            <p
              className={`mb-6 font-bold ${
                product.stock === 0 ? "text-red-400" : "text-green-400"
              }`}
            >
              {product.stock === 0 ? "Out of Stock" : `Stock: ${product.stock}`}
            </p>

            {user?.role === "user" && (
              <div className="flex flex-col gap-4 sm:flex-row">
                {product.stock === 0 ? (
                  <button
                    disabled
                    className="flex-1 cursor-not-allowed rounded bg-gray-600 px-6 py-3 font-bold text-white"
                  >
                    Out of Stock
                  </button>
                ) : (
                  <button
                    onClick={addToCart}
                    className="flex-1 rounded bg-yellow-400 px-6 py-3 font-bold text-black hover:bg-yellow-300"
                  >
                    Add to Cart
                  </button>
                )}

                <button
                  onClick={addToWishlist}
                  disabled={isWishlisted}
                  className={`flex-1 rounded px-6 py-3 font-bold ${
                    isWishlisted
                      ? "cursor-not-allowed bg-gray-600 text-white"
                      : "border border-yellow-400 bg-slate-800 text-yellow-300 hover:bg-yellow-400 hover:text-black"
                  }`}
                >
                  {isWishlisted ? "Added to Wishlist" : "Add to Wishlist"}
                </button>
              </div>
            )}

            {user?.role === "admin" && (
              <p className="font-bold text-red-400">
                Admin cannot add products to cart or wishlist.
              </p>
            )}

            {user?.role === "user" && (
              <div className="mt-10 rounded-xl bg-slate-900 p-5">
                <h2 className="mb-4 text-2xl font-bold text-yellow-300">
                  Write a Review
                </h2>

                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="mb-4 w-full rounded bg-slate-800 p-3 outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  <option value={1}>1 Star</option>
                  <option value={2}>2 Stars</option>
                  <option value={3}>3 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={5}>5 Stars</option>
                </select>

                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write your review"
                  className="mb-4 w-full rounded bg-slate-800 p-3 outline-none focus:ring-2 focus:ring-yellow-400"
                  rows={4}
                />

                <button
                  onClick={submitReview}
                  className="rounded bg-yellow-400 px-6 py-3 font-bold text-black hover:bg-yellow-300"
                >
                  Submit Review
                </button>
              </div>
            )}

            <div className="mt-10 rounded-xl bg-slate-900 p-5">
              <h2 className="mb-4 text-2xl font-bold text-yellow-300">
                Reviews
              </h2>

              {product.reviews.length === 0 ? (
                <p className="text-slate-400">No reviews yet.</p>
              ) : (
                <div className="space-y-4">
                  {product.reviews.map((review, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-slate-700 bg-slate-800 p-4"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <p className="font-bold">{review.name}</p>
                        <p className="text-yellow-300">⭐ {review.rating}</p>
                      </div>

                      <p className="mt-3 text-slate-300">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-16">
          <RecommendedProducts
            category={product.category}
            currentProductId={product._id}
          />
        </div>

        <div className="mt-16">
          <RecentlyViewed />
        </div>
      </div>
    </div>
  );
}