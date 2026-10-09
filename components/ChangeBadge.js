import { changeInfo } from "@/lib/bn";

// Rising prices are bad for shoppers (red), falling prices are good (green) — as in the Figma.
const STYLES = {
  up: "bg-error/10 text-error",
  down: "bg-primary/10 text-primary",
  flat: "bg-base-200 text-base-content/60",
};

export default function ChangeBadge({ change, className = "" }) {
  const info = changeInfo(change);

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap ${STYLES[info.dir]} ${className}`}
      title={`গতকালের তুলনায় দাম ${info.word}`}
    >
      {info.label}
    </span>
  );
}
