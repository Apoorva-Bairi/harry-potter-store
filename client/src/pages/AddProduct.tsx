import { useState } from "react";
import API from "../api/axios";
import BackButton from "../components/BackButton";
import toast from "react-hot-toast";

export default function AddProduct() {
    const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    category: "Wands",
    house: "All",
    stock: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        setLoading(true);
      await API.post("/products", form);
      toast.success("Product added successfully");

      setForm({
        name: "",
        price: "",
        image: "",
        category: "Wands",
        house: "All",
        stock: "",
        description: "",
      });
    } catch {
      toast.error("Failed to add product");
    }finally{
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <BackButton />

        <form
          onSubmit={handleSubmit}
          className="w-full rounded-xl bg-slate-900 p-5 shadow-lg sm:p-8"
        >
          <h2 className="mb-6 text-2xl font-bold text-yellow-300 sm:text-3xl">
            Add Product
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Product Name"
              required
              className="w-full rounded bg-slate-800 p-3 outline-none focus:ring-2 focus:ring-yellow-400 sm:col-span-2"
            />

            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Price"
              required
              min="0"
              className="w-full rounded bg-slate-800 p-3 outline-none focus:ring-2 focus:ring-yellow-400"
            />

            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              placeholder="Stock"
              required
              min="0"
              className="w-full rounded bg-slate-800 p-3 outline-none focus:ring-2 focus:ring-yellow-400"
            />

            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="Image URL"
              required
              className="w-full rounded bg-slate-800 p-3 outline-none focus:ring-2 focus:ring-yellow-400 sm:col-span-2"
            />

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full rounded bg-slate-800 p-3 outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option>Wands</option>
              <option>Robes</option>
              <option>Mugs</option>
              <option>Scarves</option>
              <option>Books</option>
              <option>Accessories</option>
            </select>

            <select
              name="house"
              value={form.house}
              onChange={handleChange}
              className="w-full rounded bg-slate-800 p-3 outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option>All</option>
              <option>Gryffindor</option>
              <option>Slytherin</option>
              <option>Ravenclaw</option>
              <option>Hufflepuff</option>
            </select>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Product Description"
              required
              rows={4}
              className="w-full rounded bg-slate-800 p-3 outline-none focus:ring-2 focus:ring-yellow-400 sm:col-span-2"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded bg-yellow-400 py-3 font-bold text-black hover:bg-yellow-300"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}