import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

  const cartCount = cart.reduce(
    (sum: number, item: any) => sum + item.quantity,
    0
  );

  const wishlistCount = wishlist.length;

  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/");
  };

  const homePath = user?.role === "admin" ? "/admin" : "/";

  return (
    <nav className="sticky top-0 z-50 border-b border-yellow-500/20 bg-slate-950/95 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between">
          <Link
            to={homePath}
            onClick={closeMenu}
            className="text-xl font-black tracking-wide text-yellow-300"
          >
            ⚡ WizardWares
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded border border-yellow-400/40 px-3 py-2 text-yellow-300 md:hidden"
          >
            {isOpen ? "✕" : "☰"}
          </button>

          <div className="hidden items-center gap-6 text-sm font-medium text-slate-200 md:flex">
            <Link to={homePath} className="transition hover:text-yellow-300">
              Home
            </Link>

            <Link to="/products" className="transition hover:text-yellow-300">
              Products
            </Link>

            {user?.role === "user" && (
              <>
                <Link to="/profile" className="transition hover:text-yellow-300">
                  Profile
                </Link>

                <Link
                  to="/cart"
                  className="relative transition hover:text-yellow-300"
                >
                  Cart
                  {cartCount > 0 && (
                    <span className="absolute -right-4 -top-2 rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">
                      {cartCount}
                    </span>
                  )}
                </Link>

                <Link
                  to="/wishlist"
                  className="relative transition hover:text-yellow-300"
                >
                  Wishlist
                  {wishlistCount > 0 && (
                    <span className="absolute -right-4 -top-2 rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                <Link to="/orders" className="transition hover:text-yellow-300">
                  Orders
                </Link>
              </>
            )}

            {user?.role === "admin" && (
              <>
                <Link
                  to="/admin/products"
                  className="transition hover:text-yellow-300"
                >
                  Manage Products
                </Link>

                <Link
                  to="/admin/add-product"
                  className="transition hover:text-yellow-300"
                >
                  Add Product
                </Link>

                <Link
                  to="/admin/orders"
                  className="transition hover:text-yellow-300"
                >
                  Orders
                </Link>

                <Link
                  to="/admin/coupons"
                  className="transition hover:text-yellow-300"
                >
                  Coupons
                </Link>
              </>
            )}

            {!user ? (
              <>
                <Link to="/login" className="transition hover:text-yellow-300">
                  Login
                </Link>

                <Link
                  to="/register"
                  className="rounded-full bg-yellow-400 px-4 py-2 font-bold text-black transition hover:bg-yellow-300"
                >
                  Join
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="rounded-full border border-yellow-400/40 px-4 py-2 text-yellow-300 transition hover:bg-yellow-400 hover:text-black"
              >
                Logout
              </button>
            )}
          </div>
        </div>

        {isOpen && (
          <div className="mt-4 flex flex-col gap-4 border-t border-yellow-500/20 pt-4 text-sm font-medium text-slate-200 md:hidden">
            <Link
              to={homePath}
              onClick={closeMenu}
              className="hover:text-yellow-300"
            >
              Home
            </Link>

            <Link
              to="/products"
              onClick={closeMenu}
              className="hover:text-yellow-300"
            >
              Products
            </Link>

            {user?.role === "user" && (
              <>
                <Link
                  to="/profile"
                  onClick={closeMenu}
                  className="hover:text-yellow-300"
                >
                  Profile
                </Link>

                <Link
                  to="/cart"
                  onClick={closeMenu}
                  className="hover:text-yellow-300"
                >
                  Cart {cartCount > 0 && `(${cartCount})`}
                </Link>

                <Link
                  to="/wishlist"
                  onClick={closeMenu}
                  className="hover:text-yellow-300"
                >
                  Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
                </Link>

                <Link
                  to="/orders"
                  onClick={closeMenu}
                  className="hover:text-yellow-300"
                >
                  Orders
                </Link>
              </>
            )}

            {user?.role === "admin" && (
              <>
                <Link
                  to="/admin/products"
                  onClick={closeMenu}
                  className="hover:text-yellow-300"
                >
                  Manage Products
                </Link>

                <Link
                  to="/admin/add-product"
                  onClick={closeMenu}
                  className="hover:text-yellow-300"
                >
                  Add Product
                </Link>

                <Link
                  to="/admin/orders"
                  onClick={closeMenu}
                  className="hover:text-yellow-300"
                >
                  Orders
                </Link>

                <Link
                  to="/admin/coupons"
                  onClick={closeMenu}
                  className="hover:text-yellow-300"
                >
                  Coupons
                </Link>
              </>
            )}

            {!user ? (
              <>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="hover:text-yellow-300"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="w-fit rounded-full bg-yellow-400 px-4 py-2 font-bold text-black hover:bg-yellow-300"
                >
                  Join
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="w-fit rounded-full border border-yellow-400/40 px-4 py-2 text-yellow-300 hover:bg-yellow-400 hover:text-black"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}