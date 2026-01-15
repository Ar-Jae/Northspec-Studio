"use client";

export default function BlogPage(){
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white">Blog</h1>
      <p className="text-sm text-gray-400 mt-2">Company blog and posts.</p>

      <div className="mt-6 rounded bg-[#111] p-6 text-gray-300">
        <p>Placeholder - connect to your CMS (WordPress, Ghost, etc.) or NocoDB table for posts.</p>
      </div>
    </div>
  );
}
