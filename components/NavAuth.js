import Link from "next/link";
import UserMenu from "./UserMenu";

export default function NavAuth({ user }) {
  if (user) return <UserMenu user={user} />;

  return (
    <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
      <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md">
        সাইন ইন
      </Link>
      <Link href="/signup" className="btn btn-primary btn-sm sm:btn-md">
        সাইন আপ
      </Link>
    </div>
  );
}
