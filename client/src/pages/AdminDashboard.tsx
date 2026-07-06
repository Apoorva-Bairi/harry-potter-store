import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import SkeletonStats from "../components/SkeletonStats";

export default function AdminDashboard() {
  const [productsCount, setProductsCount] = useState(0);
  const [orders, setOrders] = useState<any[]>([]);
  const [lowStockProducts, setLowStockProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchStats = async () => {
    try {
      setLoading(true);

      const productsRes = await API.get("/products");
      const ordersRes = await API.get("/orders/admin/all");

      const allProducts = productsRes.data.products;

      setProductsCount(productsRes.data.totalProducts);
      setOrders(ordersRes.data);

      setLowStockProducts(
        allProducts.filter((product: any) => product.stock <= 3)
      );
    } finally {
      setLoading(false);
    }
  };

  fetchStats();
}, []);
  const totalRevenue = orders.reduce(
    (sum, order) => sum + (order.finalTotal || order.totalAmount),
    0
  );

  const pendingOrders = orders.filter(
    (order) => order.orderStatus === "Pending"
  ).length;

  return (
    <div className="min-h-screen bg-black px-4 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-4 text-2xl font-bold text-yellow-300 sm:text-3xl">
          Admin Dashboard
        </h1>

        <p className="mb-8 text-slate-400">
          Manage products, orders, and store activity.
        </p>

        {loading ? (
        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[...Array(5)].map((_, index) => (
            <SkeletonStats key={index} />
            ))}
        </div>  ) : (
         <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div className="rounded-xl bg-slate-900 p-5 sm:p-6">
            <p className="text-slate-400">Total Products</p>
            <h2 className="text-2xl font-bold text-yellow-300 sm:text-3xl">
              {productsCount}
            </h2>
          </div>

          <div className="rounded-xl bg-slate-900 p-5 sm:p-6">
            <p className="text-slate-400">Total Orders</p>
            <h2 className="text-2xl font-bold text-yellow-300 sm:text-3xl">
              {orders.length}
            </h2>
          </div>

          <div className="rounded-xl bg-slate-900 p-5 sm:p-6">
            <p className="text-slate-400">Total Revenue</p>
            <h2 className="break-words text-2xl font-bold text-yellow-300 sm:text-3xl">
              ₹{totalRevenue}
            </h2>
          </div>

          <div className="rounded-xl bg-slate-900 p-5 sm:p-6">
            <p className="text-slate-400">Pending Orders</p>
            <h2 className="text-2xl font-bold text-yellow-300 sm:text-3xl">
              {pendingOrders}
            </h2>
          </div>

          <div className="rounded-xl bg-slate-900 p-5 sm:p-6">
            <p className="text-slate-400">Low Stock</p>
            <h2 className="text-2xl font-bold text-red-400 sm:text-3xl">
              {lowStockProducts.length}
            </h2>
          </div>
        </div> )} 

        {!loading && (
  <div className="mb-10 grid gap-4 md:grid-cols-3">
          <Link
            to="/admin/products"
            className="rounded-xl bg-slate-900 p-5 transition hover:bg-slate-800 sm:p-6"
          >
            <h2 className="text-xl font-bold text-yellow-300">
              Manage Products
            </h2>
            <p className="mt-2 text-slate-400">
              View, edit, and delete products.
            </p>
          </Link>

          <Link
            to="/admin/add-product"
            className="rounded-xl bg-slate-900 p-5 transition hover:bg-slate-800 sm:p-6"
          >
            <h2 className="text-xl font-bold text-yellow-300">Add Product</h2>
            <p className="mt-2 text-slate-400">Create a new product.</p>
          </Link>

          <Link
            to="/admin/orders"
            className="rounded-xl bg-slate-900 p-5 transition hover:bg-slate-800 sm:p-6"
          >
            <h2 className="text-xl font-bold text-yellow-300">Orders</h2>
            <p className="mt-2 text-slate-400">View and update orders.</p>
          </Link>
        </div> 
        )}

        {!loading && lowStockProducts.length > 0 && (
          <div className="rounded-xl bg-slate-900 p-5 sm:p-6">
            <h2 className="mb-4 text-xl font-bold text-yellow-300 sm:text-2xl">
              Low Stock Products
            </h2>

            <div className="space-y-2">
              {lowStockProducts.map((product) => (
                <p key={product._id} className="text-slate-300">
                  {product.name} — Stock: {product.stock}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}