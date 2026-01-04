"use client";

import Image from "next/image";

export default function LogoIcon({ className = "h-9 w-9" }) {
  return (
    <div className={className}>
      <Image
        src="/images/logo.png"
        alt="Northspec Studio Logo"
        width={48}
        height={48}
        className="h-full w-full object-contain"
      />
    </div>
  );
}
