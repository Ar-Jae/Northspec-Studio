"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Container from "../../../components/Container";
import Button from "../../../components/Button";
import LogoIcon from "../../../components/LogoIcon";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Mock authentication - in production, this would call your auth API
    if (email && password.length >= 6) {
      // Store auth token in localStorage (mock)
      localStorage.setItem("auth_token", "mock_token_" + Date.now());
      localStorage.setItem("user_email", email);
      router.push("/dashboard");
    } else {
      setError("Invalid email or password (min 6 characters)");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Container className="w-full max-w-md">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-6">
              <LogoIcon className="h-16 w-16 mx-auto" />
            </Link>
            <h1 className="text-3xl font-serif font-bold text-white mb-2">Admin Login</h1>
            <p className="text-slate-400 text-sm">Access your dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@northspecstudio.com"
                className="w-full px-4 py-2 bg-white/10 border border-brand-gold/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:bg-white/20 transition-all"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 bg-white/10 border border-brand-gold/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:bg-white/20 transition-all"
                required
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-xs text-slate-500 text-center">
              Demo credentials: Use any email with password of 6+ characters
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
