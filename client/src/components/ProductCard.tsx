import { Link } from "react-router-dom";

interface ProductCardProps {
  _id: string;
  name: string;
  price: number;
  image: string;
  stock?: number;
  category?: string;
}

export default function ProductCard({
  _id,
  name,
  price,
  image,
  stock,
  category,
}: ProductCardProps) {
  return (
    <div className="overflow-hidden rounded-xl bg-slate-900 transition hover:-translate-y-1 hover:bg-slate-800">
      <img
        src={image}
        alt={name}
        className="h-56 w-full object-cover"
      />

      <div className="p-4">
        <h2 className="text-lg font-bold">{name}</h2>

        {category && (
          <p className="text-slate-400">{category}</p>
        )}

        <p className="mt-2 font-bold text-yellow-300">
          ₹{price}
        </p>

        {stock !== undefined && (
          stock === 0 ? (
            <p className="mt-2 font-bold text-red-400">
              Out of Stock
            </p>
          ) : (
            <p className="mt-2 text-green-400">
              In Stock: {stock}
            </p>
          )
        )}

        <Link
          to={`/product/${_id}`}
          className="mt-4 block rounded bg-yellow-400 py-2 text-center font-bold text-black hover:bg-yellow-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}