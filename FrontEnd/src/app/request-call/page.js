"use client";

import { useState } from "react";
import Container from "../../components/Container";
import SectionHeading from "../../components/SectionHeading";
import FadeIn from "../../components/animations/FadeIn";

export default function RequestCallPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/request-call", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, phone }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to request call");

      setStatus("success");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
    } catch (err) {
      setStatus("error");
      setError(err.message);
    }
  }

  return (
    <div className="bg-brand-dark min-h-screen">
      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <FadeIn>
          <div className="max-w-2xl mx-auto">
            <SectionHeading
              eyebrow="Request a Call"
              title="Get a Call from Our AI Agent"
              description="Submit your details and our Vapi assistant will call you shortly."
              align="center"
            />

            <form onSubmit={onSubmit} className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-slate-300 mb-2">First Name</label>
                  <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full rounded-lg bg-white/5 border border-white/10 text-white p-3"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-300 mb-2">Last Name</label>
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full rounded-lg bg-white/5 border border-white/10 text-white p-3"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg bg-white/5 border border-white/10 text-white p-3"
                  placeholder="you@company.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">Phone Number</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-lg bg-white/5 border border-white/10 text-white p-3"
                  placeholder="+1..."
                  required
                />
              </div>

              {status === "success" ? <p className="text-green-400 text-sm">Call requested successfully. Expect a call shortly.</p> : null}
              {status === "error" ? <p className="text-red-400 text-sm">{error}</p> : null}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-lg px-5 py-3 bg-gradient-to-r from-brand-gold to-[#B8860B] text-brand-dark font-semibold disabled:opacity-60"
              >
                {status === "loading" ? "Requesting..." : "Request a Call"}
              </button>
            </form>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}
