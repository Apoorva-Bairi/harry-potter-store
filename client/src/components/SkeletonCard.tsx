export default function SkeletonCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-xl bg-slate-900">
      <div className="h-56 w-full bg-slate-800"></div>

      <div className="p-4">
        <div className="mb-3 h-5 w-3/4 rounded bg-slate-800"></div>
        <div className="mb-3 h-4 w-1/2 rounded bg-slate-800"></div>
        <div className="mb-4 h-5 w-1/3 rounded bg-slate-800"></div>
        <div className="h-10 w-full rounded bg-slate-800"></div>
      </div>
    </div>
  );
}

