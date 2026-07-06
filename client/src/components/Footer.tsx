// export default function Footer() {
//   return (
//     <footer className="border-t border-yellow-500/20 bg-slate-950 text-slate-400 px-8 py-6 text-center">
//       <p className="text-yellow-300 font-bold">⚡ WizardWares</p>
//       <p className="mt-2 text-sm">
//         A magical MERN e-commerce store with user and admin features.
//       </p>
//       <p className="mt-2 text-xs">
//         © 2026 WizardWares. All rights reserved.
//       </p>
//     </footer>
//   );
// }

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-yellow-500/20 bg-slate-950 px-4 py-8 text-slate-400 sm:px-8">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="text-xl font-black text-yellow-300">
          ⚡ WizardWares
        </h2>

        <p className="mt-3 text-sm sm:text-base">
          A magical MERN e-commerce experience for wizards and witches.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm">
          <Link to="/" className="hover:text-yellow-300">
            Home
          </Link>

          <Link to="/products" className="hover:text-yellow-300">
            Products
          </Link>

          <Link to="/wishlist" className="hover:text-yellow-300">
            Wishlist
          </Link>

          <Link to="/orders" className="hover:text-yellow-300">
            Orders
          </Link>
        </div>

        <p className="mt-6 text-xs text-slate-500">
          © 2026 WizardWares. All rights reserved.
        </p>
      </div>
    </footer>
  );
}