// import { useNavigate } from "react-router-dom";

// export default function BackButton() {
//   const navigate = useNavigate();

//   return (
//     <button
//       onClick={() => navigate(-1)}
//       className="mb-6 rounded bg-slate-800 px-4 py-2 text-yellow-300 hover:bg-slate-700"
//     >
//       ← Back
//     </button>
//   );
// }

import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="mb-6 inline-flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-yellow-300 transition hover:bg-slate-700 hover:text-yellow-200"
    >
      <span>←</span>
      <span>Back</span>
    </button>
  );
}