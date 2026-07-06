import { useAuth } from "../context/AuthContext";
import BackButton from "../components/BackButton";

export default function Profile() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black px-4 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-2xl">
        <BackButton />

        <div className="rounded-xl bg-slate-900 p-6">
          <h1 className="mb-6 text-3xl font-bold text-yellow-300">
            My Profile
          </h1>

          <p className="mb-3">
            <strong>Name:</strong> {user.name}
          </p>

          <p className="mb-3">
            <strong>Email:</strong> {user.email}
          </p>

          <p className="mb-3">
            <strong>Role:</strong> {user.role}
          </p>
        </div>
      </div>
    </div>
  );
}