"use client";

import { useState, useEffect } from "react";

export default function DocumentsPage() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/documents");
      if (res.ok) {
        const data = await res.json();
        setDocuments(data);
      } else {
        const errData = await res.json();
        setError(errData.message || "Failed to fetch documents");
      }
    } catch (err) {
      setError("Could not connect to the server");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:4000/api/documents/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        fetchDocuments();
      } else {
        const errData = await res.json();
        alert(errData.message || "Upload failed");
      }
    } catch (err) {
      alert("Upload failed: Could not connect to server");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this document?")) return;

    try {
      const res = await fetch(`http://localhost:4000/api/documents/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setDocuments(documents.filter((doc) => doc.id !== id));
      } else {
        alert("Delete failed");
      }
    } catch (err) {
      alert("Delete failed: Could not connect to server");
    }
  };

  return (
    <div className="flex-1 overflow-auto rounded-tl-3xl bg-brand-gray p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Documents</h1>
          <p className="text-sm text-gray-500">Manage your Google Drive files</p>
        </div>
        <label className={`cursor-pointer rounded-lg bg-brand-gold px-4 py-2 text-sm font-medium text-white hover:bg-green-700 ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
          {uploading ? 'Uploading...' : 'Upload Document'}
          <input type="file" className="hidden" onChange={handleUpload} disabled={uploading} />
        </label>
      </div>

      {error && (
        <div className="mb-6 rounded-xl bg-red-50 p-4 text-sm text-red-600 border border-red-100">
          <p className="font-semibold">Configuration Required</p>
          <p className="mt-1">{error}. Please ensure your Google Drive API credentials are set in the .env file.</p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading ? (
          <div className="col-span-full py-12 text-center text-gray-500">Loading documents...</div>
        ) : documents.length > 0 ? (
          documents.map((doc) => (
            <div key={doc.id} className="group relative rounded-2xl border border-white/5 p-4 transition hover:border-brand-gold/30 hover:bg-brand-gold/5">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-500">
                {doc.iconLink ? (
                  <img src={doc.iconLink} alt="" className="h-6 w-6" />
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                )}
              </div>
              <h3 className="mb-1 truncate text-sm font-semibold text-white" title={doc.name}>
                {doc.name}
              </h3>
              <p className="text-xs text-gray-500">
                {doc.size ? `${(doc.size / 1024).toFixed(1)} KB` : 'Folder'} • {new Date(doc.modifiedTime).toLocaleDateString()}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <a
                  href={doc.webViewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-brand-gold hover:text-brand-gold"
                >
                  View File
                </a>
                <button
                  onClick={() => handleDelete(doc.id)}
                  className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-gray-500">
            No documents found in your Google Drive.
          </div>
        )}
      </div>
    </div>
  );
}
