// import { Link, Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function Home() {
//   const { user } = useAuth();

//   if (user?.role === "admin") {
//     return <Navigate to="/admin" replace />;
//   }

//   return (
//     <div className="min-h-screen bg-black text-white">
//       {/* HERO SECTION */}
//       <section
//         className="relative min-h-screen bg-cover bg-center"
//         style={{
//           backgroundImage:
//             "url('https://images.unsplash.com/photo-1570612861542-284f4c12e75f?w=1600')",
//         }}
//       >
//         {/* Dark overlay */}
//         <div className="absolute inset-0 bg-black/75"></div>

//         <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-4 py-20 sm:px-8">
//           <div className="max-w-3xl">
//             <p className="mb-4 text-sm font-bold uppercase tracking-[0.4em] text-yellow-300">
//               Welcome to WizardWares
//             </p>

//             <h1 className="text-4xl font-black leading-tight sm:text-6xl md:text-7xl">
//               Your Gateway to the Wizarding World
//             </h1>

//             <p className="mt-6 max-w-xl text-base text-slate-300 sm:text-lg">
//               Discover premium magical merchandise — wands, robes, scarves,
//               mugs, and rare collectibles inspired by Hogwarts.
//             </p>

//             <div className="mt-8 flex flex-wrap gap-4">
//               <Link
//                 to="/products"
//                 className="rounded-full bg-yellow-400 px-6 py-3 font-bold text-black hover:bg-yellow-300"
//               >
//                 Shop Collection
//               </Link>

//               {!user && (
//                 <Link
//                   to="/register"
//                   className="rounded-full border border-yellow-400 px-6 py-3 font-bold text-yellow-300 hover:bg-yellow-400 hover:text-black"
//                 >
//                   Create Account
//                 </Link>
//               )}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* FEATURED SECTION */}
//       <section className="mx-auto max-w-7xl px-4 py-16 sm:px-8">
//         <div className="mb-8 flex items-center justify-between">
//           <h2 className="text-3xl font-bold text-yellow-300">
//             Featured Products
//           </h2>

//           <Link
//             to="/products"
//             className="font-bold text-yellow-300 hover:underline"
//           >
//             View All →
//           </Link>
//         </div>

//         <div className="rounded-xl bg-slate-900 p-8 text-center">
//           <p className="text-slate-400">
//             Explore our latest magical collection crafted for every wizard.
//           </p>
//         </div>
//       </section>

//       {/* WHY CHOOSE US */}
//       <section className="mx-auto max-w-7xl px-4 py-16 sm:px-8">
//         <h2 className="mb-10 text-center text-3xl font-bold text-yellow-300">
//           Why WizardWares?
//         </h2>

//         <div className="grid gap-6 md:grid-cols-3">
//           <div className="rounded-xl bg-slate-900 p-6 transition hover:scale-105">
//             <h3 className="mb-3 text-xl font-bold text-yellow-300">
//               Premium Quality
//             </h3>
//             <p className="text-slate-400">
//               Carefully crafted magical items using the finest wizarding
//               materials.
//             </p>
//           </div>

//           <div className="rounded-xl bg-slate-900 p-6 transition hover:scale-105">
//             <h3 className="mb-3 text-xl font-bold text-yellow-300">
//               Fast Delivery
//             </h3>
//             <p className="text-slate-400">
//               Swift magical shipping across kingdoms, castles, and beyond.
//             </p>
//           </div>

//           <div className="rounded-xl bg-slate-900 p-6 transition hover:scale-105">
//             <h3 className="mb-3 text-xl font-bold text-yellow-300">
//               Secure Shopping
//             </h3>
//             <p className="text-slate-400">
//               Enchanted payment security and protected checkout experience.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* STATS SECTION */}
//       <section className="mx-auto max-w-7xl px-4 py-16 sm:px-8">
//         <div className="grid gap-6 md:grid-cols-3">
//           <div className="rounded-xl bg-slate-900 p-6 text-center">
//             <h2 className="text-4xl font-bold text-yellow-300">500+</h2>
//             <p className="mt-2 text-slate-400">Magical Products</p>
//           </div>

//           <div className="rounded-xl bg-slate-900 p-6 text-center">
//             <h2 className="text-4xl font-bold text-yellow-300">10K+</h2>
//             <p className="mt-2 text-slate-400">Happy Wizards</p>
//           </div>

//           <div className="rounded-xl bg-slate-900 p-6 text-center">
//             <h2 className="text-4xl font-bold text-yellow-300">4.8★</h2>
//             <p className="mt-2 text-slate-400">Customer Rating</p>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (user?.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black px-4 py-20 text-white sm:px-8">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="mb-6 h-5 w-64 rounded bg-slate-800"></div>
          <div className="mb-6 h-20 w-full max-w-3xl rounded bg-slate-800"></div>
          <div className="mb-8 h-24 w-full max-w-xl rounded bg-slate-800"></div>
          <div className="flex gap-4">
            <div className="h-12 w-40 rounded-full bg-slate-800"></div>
            <div className="h-12 w-40 rounded-full bg-slate-800"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <section
        className="relative min-h-screen bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/hogwarts-bg.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30"></div>

        <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-4 py-20 sm:px-8">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.4em] text-yellow-300">
              Welcome to WizardWares
            </p>

            <h1 className="text-4xl font-black leading-tight sm:text-6xl md:text-7xl">
              Your Gateway to the Wizarding World
            </h1>

            <p className="mt-6 max-w-xl text-base text-slate-300 sm:text-lg">
              Discover premium magical merchandise — wands, robes, scarves,
              mugs, and rare collectibles inspired by Hogwarts.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/products"
                className="rounded-full bg-yellow-400 px-6 py-3 font-bold text-black hover:bg-yellow-300"
              >
                Shop Collection
              </Link>

              {!user && (
                <Link
                  to="/register"
                  className="rounded-full border border-yellow-400 px-6 py-3 font-bold text-yellow-300 hover:bg-yellow-400 hover:text-black"
                >
                  Create Account
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-yellow-300">
            Featured Products
          </h2>

          <Link to="/products" className="font-bold text-yellow-300 hover:underline">
            View All →
          </Link>
        </div>

        <div className="rounded-xl bg-slate-900 p-8 text-center">
          <p className="text-slate-400">
            Explore our latest magical collection crafted for every wizard.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-8">
        <h2 className="mb-10 text-center text-3xl font-bold text-yellow-300">
          Why WizardWares?
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl bg-slate-900 p-6 transition hover:scale-105">
            <h3 className="mb-3 text-xl font-bold text-yellow-300">
              Premium Quality
            </h3>
            <p className="text-slate-400">
              Carefully crafted magical items using the finest wizarding materials.
            </p>
          </div>

          <div className="rounded-xl bg-slate-900 p-6 transition hover:scale-105">
            <h3 className="mb-3 text-xl font-bold text-yellow-300">
              Fast Delivery
            </h3>
            <p className="text-slate-400">
              Swift magical shipping across kingdoms, castles, and beyond.
            </p>
          </div>

          <div className="rounded-xl bg-slate-900 p-6 transition hover:scale-105">
            <h3 className="mb-3 text-xl font-bold text-yellow-300">
              Secure Shopping
            </h3>
            <p className="text-slate-400">
              Enchanted payment security and protected checkout experience.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}