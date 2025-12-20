"use client";

import { useEffect, useState } from "react";

export default function AccountPage(){
  const [account, setAccount] = useState(null);

  useEffect(()=>{
    async function fetchAcct(){
      try{
        const res = await fetch('/api/account');
        if (!res.ok) return; // silent if not present
        const data = await res.json();
        setAccount(data);
      }catch(e){/* ignore */}
    }
    fetchAcct();
  },[]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white">Account</h1>
      <p className="text-sm text-gray-400 mt-2">Profile and billing information.</p>

      <div className="mt-6 rounded bg-[#111] p-6 text-gray-300">
        {account ? (
          <div>
            <div className="font-medium text-white">{account.name}</div>
            <div className="text-xs text-gray-400">{account.email}</div>
          </div>
        ) : (
          <p>No account endpoint available; this is a placeholder page.</p>
        )}
      </div>
    </div>
  );
}
