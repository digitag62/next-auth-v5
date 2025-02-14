"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const paths = [
  { path: "/", title: "Home" },
  { path: "/alarm", title: "Alarm" },
  { path: "/timer", title: "Timer" },
];

export const HeaderComponent = () => {
  const pathname = usePathname();

  return (
    <div className="flex justify-center items-center py-2 gap-4 z-10 w-full h-full">
      {paths.map((p) => (
        <Link
          href={p.path}
          className={cn(
            pathname == p.path
              ? "text-emerald-400 font-semibold"
              : "text-muted-foreground",
            "text-sm hover:text-emerald-600"
          )}
        >
          {p.title}
        </Link>
      ))}
    </div>
  );
};
