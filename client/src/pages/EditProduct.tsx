import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";
import BackButton from "../components/BackButton";
import toast from "react-hot-toast";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    category: "Wands",
    house: "All",
    stock: "",
    description: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await API.get(`/products/${id}`);

      setForm({
        name: res.data.name,
        price: String(res.data.price),
        image: res.data.image,
        category: res.data.category,
        house: res.data.house,
        stock: String(res.data.stock),
        description: res.data.description,
      });
    };

    fetchProduct();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    await API.put(`/products/${id}`, form);
    toast.success("Product updated successfully");
    navigate("/admin/products");
  };

  return (
    <div className="min-h-screen bg-black px-4 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-2xl">
        <BackButton />

        <form
          onSubmit={handleUpdate}
          className="rounded-xl bg-slate-900 p-5 sm:p-8"
        >
          <h1 className="mb-6 text-2xl font-bold text-yellow-300 sm:text-3xl">
            Edit Product
          </h1>

          <div className="grid gap-4 sm:grid-cols-2">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Product Name"
              required
              className="rounded bg-slate-800 p-3 outline-none focus:ring-2 focus:ring-yellow-400 sm:col-span-2"
            />

            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              placeholder="Price"
              required
              min="0"
              className="rounded bg-slate-800 p-3 outline-none focus:ring-2 focus:ring-yellow-400"
            />

            <input
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
              placeholder="Stock"
              required
              min="0"
              className="rounded bg-slate-800 p-3 outline-none focus:ring-2 focus:ring-yellow-400"
            />

            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="Image URL"
              required
              className="rounded bg-slate-800 p-3 outline-none focus:ring-2 focus:ring-yellow-400 sm:col-span-2"
            />

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="rounded bg-slate-800 p-3 outline-none focus:ring-2 focus:ring-yellow-400"
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
              className="rounded bg-slate-800 p-3 outline-none focus:ring-2 focus:ring-yellow-400"
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
              className="rounded bg-slate-800 p-3 outline-none focus:ring-2 focus:ring-yellow-400 sm:col-span-2"
            />
          </div>

          <button className="mt-6 w-full rounded bg-yellow-400 py-3 font-bold text-black hover:bg-yellow-300">
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
}