import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <main className="flex flex-col gap-2 items-center ">
        <h2>Hello from Dashboard</h2>
        <Link href="/" className={cn(buttonVariants())}>
          Back to Home
        </Link>
      </main>
    </div>
  );
}
