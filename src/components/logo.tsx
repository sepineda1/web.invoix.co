import Link from "next/link";

export function Logo({ tone = "light", compact = false }: { tone?: "light" | "dark"; compact?: boolean }) {
  const size = compact ? 36 : 40;
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="Invoix.co, inicio">
      <img
        src="/brand/mark.png"
        alt=""
        width={size}
        height={size}
        className={compact ? "h-9 w-9 object-contain" : "h-10 w-10 object-contain"}
      />
      <span
        className={`font-display font-semibold tracking-tight ${compact ? "text-2xl" : "text-[1.65rem]"} ${
          tone === "light" ? "text-white" : "text-ink"
        }`}
      >
        invoix<span className="text-blue">.co</span>
      </span>
    </Link>
  );
}
