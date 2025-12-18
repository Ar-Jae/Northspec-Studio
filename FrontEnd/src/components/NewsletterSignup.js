"use client";

import { useState } from "react";
import Button from "./Button";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <div className="rounded-2xl bg-gradient-to-r from-brand-gold/10 to-brand-gold/5 border border-brand-gold/30 p-6 sm:p-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold mb-1">Newsletter</p>
          <h3 className="text-xl font-serif font-semibold text-white sm:text-2xl">
            Stay in the loop
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            Get updates on new projects, engineering insights, and company news.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 sm:flex-none sm:min-w-80">
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-lg bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold/50"
              required
            />
            <Button
              as="button"
              type="submit"
              variant="brand"
              className="px-6"
            >
              {subscribed ? "✓ Sent" : "Send"} →
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
