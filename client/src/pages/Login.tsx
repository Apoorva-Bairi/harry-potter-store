import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import BackButton from "../components/BackButton";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await API.post("/auth/login", form);

      login(res.data.user, res.data.token);

      toast.success("Login successful");
      navigate("/");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-black px-4 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-md">
        <BackButton />

        <form
          onSubmit={handleSubmit}
          className="mt-4 rounded-xl bg-slate-900 p-6 shadow-xl sm:p-8"
        >
          <h2 className="mb-6 text-3xl font-bold text-yellow-300">
            Welcome Back
          </h2>

          <p className="mb-6 text-slate-400">
            Login to continue your magical shopping journey.
          </p>

          <label className="mb-2 block font-medium">
            Email <span className="text-red-500">*</span>
          </label>

          <input
            required
            type="email"
            name="email"
            value={form.email}
            placeholder="Enter your email"
            onChange={handleChange}
            className="mb-4 w-full rounded bg-slate-800 p-3 outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <label className="mb-2 block font-medium">
            Password <span className="text-red-500">*</span>
          </label>

          <input
            required
            type="password"
            name="password"
            value={form.password}
            placeholder="Enter your password"
            onChange={handleChange}
            className="mb-6 w-full rounded bg-slate-800 p-3 outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <button className="w-full rounded bg-yellow-400 py-3 font-bold text-black hover:bg-yellow-300">
            Login
          </button>

          <p className="mt-6 text-center text-slate-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-bold text-yellow-300 hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}