"use client";

import { useEffect, useState } from "react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/projects");
        if (!res.ok) throw new Error(`API Error ${res.status}`);
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white">Projects</h1>
      <p className="text-sm text-gray-400 mb-4">A list of active projects (if your backend exposes `/api/projects`).</p>

      {loading && <div className="text-gray-400">Loading...</div>}
      {error && <div className="text-red-400">{error} — this endpoint may not exist yet.</div>}

      {projects && (
        <ul className="mt-4 space-y-3">
          {projects.map((p) => (
            <li key={p._id || p.id} className="rounded bg-[#111] p-3">
              <div className="text-white font-medium">{p.name || p.title || p.projectName}</div>
              <div className="text-xs text-gray-400">{p.description || p.summary || JSON.stringify(p)}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
