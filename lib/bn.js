// Helpers for showing numbers, prices, units and dates in Bangla.

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

/** Convert every English digit in a value to a Bangla digit: 148 → ১৪৮ */
export function toBnDigits(value) {
  return String(value).replace(/\d/g, (digit) => BN_DIGITS[digit]);
}

/**
 * Format a number in Bangla with grouping: 1850 → ১,৮৫০, 63.5 → ৬৩.৫০
 * Whole numbers have no decimals, fractions show two decimals.
 */
export function formatBnNumber(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return "—";

  const isWhole = Number.isInteger(number);
  const formatted = number.toLocaleString("en-IN", {
    minimumFractionDigits: isWhole ? 0 : 2,
    maximumFractionDigits: isWhole ? 0 : 2,
  });

  return toBnDigits(formatted);
}

/** Price with currency: 1850 → "১,৮৫০ টাকা" */
export function formatBnPrice(value) {
  return `${formatBnNumber(value)} টাকা`;
}

/** Percentage with one decimal and no sign: -2.9 → "২.৯%" */
export function formatBnPercent(value) {
  return `${toBnDigits(Math.abs(Number(value) || 0).toFixed(1))}%`;
}

const UNIT_LABELS = {
  kg: { short: "কেজি", long: "প্রতি কেজি" },
  litre: { short: "লিটার", long: "প্রতি লিটার" },
  liter: { short: "লিটার", long: "প্রতি লিটার" },
  dozen: { short: "ডজন", long: "প্রতি ডজন" },
  piece: { short: "পিস", long: "প্রতি পিস" },
};

/** "kg" → "প্রতি কেজি" */
export function unitLabel(unit) {
  return UNIT_LABELS[unit]?.long ?? `প্রতি ${unit}`;
}

/** "kg" → "কেজি" */
export function unitShort(unit) {
  return UNIT_LABELS[unit]?.short ?? unit;
}

/** Today's date in Bangla for Bangladesh time: "শুক্রবার, ৯ অক্টোবর, ২০২৬" */
export function bnToday(date = new Date()) {
  const formatted = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(date);

  // Some runtimes return English digits for bn-BD — normalise to Bangla digits.
  return toBnDigits(formatted);
}

/** Bangla display data for a price change: arrow, colour class and label */
export function changeInfo(change) {
  const dir = change?.dir ?? "flat";
  const pct = change?.pct ?? 0;

  if (dir === "up") {
    return { dir, arrow: "▲", label: `▲ ${formatBnPercent(pct)}`, word: "বেড়েছে" };
  }
  if (dir === "down") {
    return { dir, arrow: "▼", label: `▼ ${formatBnPercent(pct)}`, word: "কমেছে" };
  }
  return { dir: "flat", arrow: "—", label: `— ${formatBnPercent(0)}`, word: "অপরিবর্তিত" };
}
