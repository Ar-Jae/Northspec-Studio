"use client";

import { useEffect, useMemo, useState } from "react";
import Button from "../Button";

function nextDays(count = 14) {
  const days = [];
  const now = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    const iso = d.toISOString().slice(0, 10);
    const day = d.getDay();
    if (day === 0 || day === 6) continue;
    days.push(iso);
  }
  return days;
}

function fmtSlot(iso) {
  return new Date(iso).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

export default function InlineScheduler() {
  const dates = useMemo(() => nextDays(21), []);
  const [date, setDate] = useState(dates[0] || "");
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!date) return;
    setLoading(true);
    setSelected(null);
    fetch(`/api/booking/availability?date=${date}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setSlots(data.slots || []);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [date]);

  async function book() {
    try {
      setStatus("loading");
      setError("");
      const res = await fetch("/api/booking/book", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          notes,
          start: selected.start,
          end: selected.end,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Booking failed");
      setStatus("success");
    } catch (e) {
      setStatus("error");
      setError(e.message);
    }
  }

  if (status === "success") {
    return <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-6 text-green-200">Booked. A calendar invite has been sent.</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm text-slate-300">Choose a date</label>
        <select value={date} onChange={(e) => setDate(e.target.value)} className="mt-2 w-full rounded-lg bg-white/5 border border-white/10 text-white p-3">
          {dates.map((d) => (
            <option key={d} value={d} className="bg-brand-dark">{d}</option>
          ))}
        </select>
      </div>

      <div>
        <p className="text-sm text-slate-300 mb-3">Available times (9:00–5:00)</p>
        {loading ? (
          <p className="text-slate-400">Loading availability...</p>
        ) : slots.length === 0 ? (
          <p className="text-slate-400">No slots available for this day.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {slots.map((slot) => (
              <button
                key={slot.start}
                onClick={() => setSelected(slot)}
                className={`rounded-lg px-3 py-2 text-sm border ${selected?.start === slot.start ? "bg-brand-gold text-brand-dark border-brand-gold" : "bg-white/5 text-white border-white/10"}`}
              >
                {fmtSlot(slot.start)}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} className="rounded-lg bg-white/5 border border-white/10 text-white p-3" />
        <input placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-lg bg-white/5 border border-white/10 text-white p-3" />
      </div>
      <textarea placeholder="Notes (optional)" value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full rounded-lg bg-white/5 border border-white/10 text-white p-3" rows={3} />

      {error ? <p className="text-red-400 text-sm">{error}</p> : null}

      <Button
        onClick={book}
        disabled={!selected || !name || !email || status === "loading"}
        variant="brand"
        className="w-full"
      >
        {status === "loading" ? "Booking..." : "Book selected time"}
      </Button>
    </div>
  );
}
