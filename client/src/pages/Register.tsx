import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import BackButton from "../components/BackButton";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      toast.error("All fields are required");
      return;
    }

    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      await API.post("/auth/register", form);
      toast.success("Registered successfully");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed");
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
            Create Account
          </h2>

          <p className="mb-6 text-slate-400">
            Join WizardWares and start your magical shopping journey.
          </p>

          <label className="mb-2 block font-medium">
            Name <span className="text-red-500">*</span>
          </label>

          <input
            required
            minLength={3}
            type="text"
            name="name"
            value={form.name}
            placeholder="Enter your name"
            onChange={handleChange}
            className="mb-4 w-full rounded bg-slate-800 p-3 outline-none focus:ring-2 focus:ring-yellow-400"
          />

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
            minLength={6}
            type="password"
            name="password"
            value={form.password}
            placeholder="Enter your password"
            onChange={handleChange}
            className="mb-6 w-full rounded bg-slate-800 p-3 outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <button className="w-full rounded bg-yellow-400 py-3 font-bold text-black hover:bg-yellow-300">
            Register
          </button>

          <p className="mt-6 text-center text-slate-400">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-yellow-300 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}