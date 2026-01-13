"use client";

export default function SocialPage(){
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white">Social</h1>
      <p className="text-sm text-gray-400 mt-2">Social integrations and posts.</p>

      <div className="mt-6 rounded bg-[#111] p-6 text-gray-300">
        <p className="mb-4">Connect and monitor your social media profiles.</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <a
            href="https://x.com/NorthspecStudio"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg border border-white/10 p-4 hover:bg-white/5 transition-colors"
          >
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10">
              <span className="text-xl font-bold">X</span>
            </div>
            <div>
              <p className="font-medium text-white">X (Twitter)</p>
              <p className="text-xs text-gray-500">@NorthspecStudio</p>
            </div>
          </a>

          <a
            href="https://www.instagram.com/northspec_studio/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg border border-white/10 p-4 hover:bg-white/5 transition-colors"
          >
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10">
              <span className="text-xl font-bold">IG</span>
            </div>
            <div>
              <p className="font-medium text-white">Instagram</p>
              <p className="text-xs text-gray-400">@northspec_studio</p>
            </div>
          </a>
          
          <a
            href="https://www.linkedin.com/in/northspec-studio/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg border border-white/10 p-4 hover:bg-white/5 transition-colors"
          >
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10">
              <span className="text-xl font-bold">in</span>
            </div>
            <div>
              <p className="font-medium text-white">LinkedIn</p>
              <p className="text-xs text-gray-400">Profile</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
