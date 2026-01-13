"use client";

import { useState, useEffect } from "react";

export default function ActivityPage() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActivities() {
      try {
        const res = await fetch("http://localhost:4000/api/dashboard/activities");
        if (res.ok) {
          const data = await res.json();
          setActivities(data);
        }
      } catch (error) {
        console.error("Failed to fetch activities:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchActivities();
  }, []);

  return (
    <div className="flex-1 overflow-auto rounded-tl-3xl bg-brand-gray p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white">Activity Log</h1>
        <p className="text-sm text-gray-500">Track all system and user actions</p>
      </div>
      
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-100"></div>
        <div className="space-y-8">
          {activities.map((activity) => (
            <div key={activity._id} className="relative flex items-start gap-4 pl-10">
              <div className="absolute left-0 flex h-8 w-8 items-center justify-center rounded-full bg-brand-gray border border-white/5">
                <div className={`h-2 w-2 rounded-full ${
                  activity.type === 'lead' ? 'bg-blue-500' : 
                  activity.type === 'payment' ? 'bg-brand-gold' : 
                  'bg-gray-400'
                }`}></div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white">{activity.title || "System Update"}</h3>
                  <span className="text-xs text-gray-400">
                    {activity.createdAt ? new Date(activity.createdAt).toLocaleString() : "Recent"}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600">{activity.description || "No description provided."}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-500">By {activity.user || "System"}</span>
                </div>
              </div>
            </div>
          ))}
          {activities.length === 0 && !loading && (
            <p className="text-gray-500 text-center py-12">No activity recorded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
