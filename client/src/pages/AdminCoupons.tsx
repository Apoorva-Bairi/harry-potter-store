import { useEffect, useState } from "react";
import API from "../api/axios";
import BackButton from "../components/BackButton";
import toast from "react-hot-toast";
import SkeletonList from "../components/SkeletonList";

interface Coupon {
  _id: string;
  code: string;
  discount: number;
  active: boolean;
  expiresAt: string;
}

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    code: "",
    discount: "",
    expiresAt: "",
  });

  const fetchCoupons = async () => {
  try {
    setLoading(true);
    const res = await API.get("/coupons");
    setCoupons(res.data);
  } catch {
    toast.error("Failed to fetch coupons");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await API.post("/coupons", {
        code: formData.code,
        discount: Number(formData.discount),
        expiresAt: formData.expiresAt,
      });

      toast.success("Coupon created");
      setFormData({ code: "", discount: "", expiresAt: "" });
      fetchCoupons();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Create failed");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await API.delete(`/coupons/${id}`);
      toast.success("Coupon deleted");
      fetchCoupons();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-black px-4 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-5xl">
        <BackButton />

        <h1 className="mb-8 text-2xl font-bold text-yellow-300 sm:text-3xl">
          Manage Coupons
        </h1>

        <form
          onSubmit={handleCreate}
          className="mb-8 rounded-xl bg-slate-900 p-5 sm:p-6"
        >
          <div className="grid gap-4 md:grid-cols-3">
            <input
              required
              placeholder="Coupon Code"
              value={formData.code}
              onChange={(e) =>
                setFormData({ ...formData, code: e.target.value })
              }
              className="w-full rounded bg-slate-800 p-3 outline-none focus:ring-2 focus:ring-yellow-400"
            />

            <input
              required
              type="number"
              placeholder="Discount %"
              min="1"
              max="100"
              value={formData.discount}
              onChange={(e) =>
                setFormData({ ...formData, discount: e.target.value })
              }
              className="w-full rounded bg-slate-800 p-3 outline-none focus:ring-2 focus:ring-yellow-400"
            />

            <input
              required
              type="date"
              value={formData.expiresAt}
              onChange={(e) =>
                setFormData({ ...formData, expiresAt: e.target.value })
              }
              className="w-full rounded bg-slate-800 p-3 outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <button className="mt-4 w-full rounded bg-yellow-400 py-3 font-bold text-black hover:bg-yellow-300 md:w-auto md:px-8">
            Create Coupon
          </button>
        </form>

        {loading && (
  <div className="space-y-4">
    {[...Array(3)].map((_, index) => (
      <SkeletonList key={index} />
    ))}
  </div>
)}

        {!loading && (
          <div className="space-y-4">
            {coupons.length === 0 ? (
              <p className="text-slate-400">No coupons found.</p>
            ) : (
              coupons.map((coupon) => (
                <div
                key={coupon._id}
                className="flex flex-col gap-4 rounded-xl bg-slate-900 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-bold text-yellow-300">{coupon.code}</p>
                  <p>{coupon.discount}% OFF</p>
                  <p className="text-slate-400">
                    Expires:{" "}
                    {new Date(coupon.expiresAt).toLocaleDateString()}
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(coupon._id)}
                  className="rounded bg-red-500 px-4 py-2 font-bold sm:w-auto"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
        )}
      </div>
    </div>
  );
}