"use client";

export default function FollowersPage(){
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white">Followers</h1>
      <p className="text-sm text-gray-400 mt-2">People and organizations following your updates.</p>

      <div className="mt-6 rounded bg-[#111] p-6 text-gray-300">
        <p>No followers yet. You can integrate this with your CRM or socials.</p>
      </div>
    </div>
  );
}
