"use client";

export default function DocumentsPage(){
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white">Documents</h1>
      <p className="text-sm text-gray-400 mt-2">Upload, browse and manage shared documents.</p>

      <div className="mt-6 rounded bg-[#111] p-6 text-gray-300">
        <p>This page is a placeholder. Hook up your document store (S3, Google Drive, etc.) or NocoDB table here.</p>
      </div>
    </div>
  );
}
