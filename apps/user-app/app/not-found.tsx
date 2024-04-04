import Link from "next/link";
import { Button } from "@repo/ui/components/ui/button";
export default function Component() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center space-y-4 px-4 text-center md:px-6">
      <div className="space-y-6">
        <span className="text-2xl">404</span>
        <h1 className="text-3xl font-semibold tracking-tighter md:text-6xl">
          Page not found
        </h1>
        <p className="max-w-[600px] md:text-xl/relaxed">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
      </div>
      <Button asChild>
        <Link href="/dashboard">Return to dashboard</Link>
      </Button>
    </div>
  );
}
