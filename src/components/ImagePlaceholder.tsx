"use client";

interface ImagePlaceholderProps {
  label: string;
  aspect?: string;
  className?: string;
}

export default function ImagePlaceholder({
  label,
  aspect = "aspect-video",
  className = "",
}: ImagePlaceholderProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-dashed border-geo-lime/20 bg-geo-card ${aspect} ${className}`}
    >
      {/* Subtle animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-geo-lime/5 via-transparent to-geo-green/5" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-geo-muted">
        <svg
          className="w-10 h-10 text-geo-lime/30"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
        <span className="text-xs font-mono text-geo-lime/40 px-4 text-center">
          {label}
        </span>
      </div>
    </div>
  );
}
