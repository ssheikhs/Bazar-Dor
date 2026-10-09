/* eslint-disable @next/next/no-img-element */

export default function Avatar({ user, size = "size-10", text = "text-base" }) {
  const initial = (user?.name || user?.email || "?").trim().charAt(0).toUpperCase();

  if (user?.image) {
    return (
      <img
        src={user.image}
        alt={user.name || "ব্যবহারকারী"}
        referrerPolicy="no-referrer"
        className={`${size} rounded-xl object-cover bg-base-200 shrink-0`}
      />
    );
  }

  return (
    <span
      className={`${size} ${text} grid place-items-center rounded-xl bg-primary text-primary-content font-bold shrink-0`}
      aria-hidden
    >
      {initial}
    </span>
  );
}
