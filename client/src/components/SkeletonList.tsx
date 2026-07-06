export default function SkeletonList() {
  return (
    <div className="animate-pulse rounded-xl bg-slate-900 p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="h-40 w-full rounded bg-slate-800 sm:h-24 sm:w-24"></div>

        <div className="flex-1 space-y-3">
          <div className="h-5 w-2/3 rounded bg-slate-800"></div>
          <div className="h-4 w-1/3 rounded bg-slate-800"></div>
          <div className="h-4 w-1/2 rounded bg-slate-800"></div>
        </div>

        <div className="h-10 w-full rounded bg-slate-800 sm:w-24"></div>
      </div>
    </div>
  );
}