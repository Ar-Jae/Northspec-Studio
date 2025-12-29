"use client";

import { useState, useEffect } from "react";

export default function FilesPage() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFiles() {
      try {
        const res = await fetch("http://localhost:4000/api/dashboard/files");
        if (res.ok) {
          const data = await res.json();
          setFiles(data);
        }
      } catch (error) {
        console.error("Failed to fetch files:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchFiles();
  }, []);

  return (
    <div className="flex-1 overflow-auto rounded-tl-3xl bg-white p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Files</h1>
        <button className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700">
          Upload File
        </button>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {files.map((file) => (
          <div key={file._id} className="group relative rounded-2xl border border-gray-200 p-4 transition hover:border-green-500/30 hover:bg-green-50/10">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-500">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="mb-1 truncate text-sm font-semibold text-gray-900" title={file.name || "Untitled File"}>
              {file.name || "Untitled File"}
            </h3>
            <p className="text-xs text-gray-500">{file.size || "0 KB"} • {file.author || "Unknown"}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-[10px] text-gray-400">
                {file.createdAt ? new Date(file.createdAt).toLocaleDateString() : "Recent"}
              </span>
              <button className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
            </div>
          </div>
        ))}
        {files.length === 0 && !loading && (
          <p className="text-gray-500 col-span-full text-center py-12">No files found.</p>
        )}
      </div>
    </div>
  );
}
