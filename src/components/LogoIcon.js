"use client";

export default function LogoIcon({ className = "h-9 w-9" }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="ns_left" x1="12" y1="12" x2="24" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.70" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id="ns_right" x1="24" y1="12" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.55" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.25" />
        </linearGradient>
        <linearGradient id="ns_gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E6CF87" />
          <stop offset="0.45" stopColor="#C6A668" />
          <stop offset="1" stopColor="#9A7A3B" />
        </linearGradient>
        <filter id="ns_softShadow" x="-50%" y="-50%" width="200%" height="200%" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#000000" floodOpacity="0.35" />
        </filter>
      </defs>

      <g filter="url(#ns_softShadow)">
        {/* Left triangular plate */}
        <path d="M14 12 L14 36 L24 24 Z" fill="url(#ns_left)" />

        {/* Right triangular plate */}
        <path d="M24 12 L34 24 L24 36 Z" fill="url(#ns_right)" />

        {/* Gold diagonal bar */}
        <g transform="rotate(-45 24 24)">
          <path
            d="M13.5 21.2 H36.5 V26.8 H13.5 Z"
            fill="url(#ns_gold)"
          />
          {/* subtle highlight */}
          <path
            d="M14.3 21.8 H35.7 V23.2 H14.3 Z"
            fill="#FFFFFF"
            opacity="0.14"
          />
        </g>
      </g>
    </svg>
  );
}
