import { auth, signOut } from "@/auth";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default async function Dashboard() {
  const session = await auth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <main className="flex flex-col gap-2 items-center ">
        <h2>Hello from Dashboard</h2>
        <p>{JSON.stringify(session?.user)}</p>
        <div className="flex items-center justify-center gap-2">
          <Link href="/" className={cn(buttonVariants())}>
            Back to Home
          </Link>
          <form action={
            async () => {
              "use server"
              await signOut()
            }
          }>
            <Button type="submit">
              Sign out
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
