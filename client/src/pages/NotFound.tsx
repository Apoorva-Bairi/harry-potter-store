import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
      <div className="max-w-lg text-center">
        <BackButton />

        <h1 className="mb-4 text-7xl font-black text-yellow-300 sm:text-8xl md:text-9xl">
          404
        </h1>

        <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
          Lost in the Wizarding World
        </h2>

        <p className="mb-8 text-sm text-slate-400 sm:text-base">
          The magical page you’re searching for has vanished into thin air.
          Perhaps a spell went wrong.
        </p>

        <Link
          to="/"
          className="inline-block rounded-full bg-yellow-400 px-8 py-3 font-bold text-black transition hover:bg-yellow-300"
        >
          Return to Hogwarts
        </Link>
      </div>
    </div>
  );
}