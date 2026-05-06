"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { MdLocalMovies } from "react-icons/md";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Welcome back!");
        router.push("/");
        router.refresh();
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-cinema-black flex items-center justify-center px-4">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.06)_0%,_transparent_70%)]" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <MdLocalMovies className="text-cinema-gold text-4xl" />
            <h1 className="font-cinzel-deco text-2xl text-cinema-gold tracking-wider">CINEMATICA</h1>
          </div>
          <p className="text-cinema-muted text-sm">Your Personal Cinema Vault</p>
        </div>

        {/* Card */}
        <div className="bg-cinema-charcoal border border-cinema-gold/20 rounded-2xl p-8 shadow-card">
          <h2 className="font-cinzel text-cinema-cream text-xl font-semibold mb-1">Sign In</h2>
          <p className="text-cinema-muted text-sm mb-6">Welcome back to your vault</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-cinema-muted font-cinzel tracking-wider uppercase mb-1.5">
                Email
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-cinema-muted text-sm" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                  className="cinema-input w-full pl-9 pr-4 py-2.5 rounded-lg text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-cinema-muted font-cinzel tracking-wider uppercase mb-1.5">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-cinema-muted text-sm" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="cinema-input w-full pl-9 pr-10 py-2.5 rounded-lg text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-cinema-muted hover:text-cinema-gold transition-colors"
                >
                  {showPassword ? <FiEyeOff size={14} /> : <FiEye size={14} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full py-3 rounded-lg font-cinzel tracking-wide text-sm mt-2 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Enter the Vault"}
            </button>
          </form>

          <div className="gold-divider my-6" />

          <p className="text-center text-cinema-muted text-sm">
            New here?{" "}
            <Link href="/auth/register" className="text-cinema-gold hover:text-cinema-gold-light transition-colors">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
