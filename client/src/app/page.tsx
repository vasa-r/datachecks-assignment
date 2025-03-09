import { ModeToggle } from "@/components/toggle-theme";
import { Button } from "@/components/ui/button";
import { BookOpenText } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-svh w-full flex flex-col relative">
      <header className="border-b border-border py-2 px-5 md:py-4 md:px-10">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-logo-bg text-sidebar-primary-foreground flex size-6 items-center justify-center rounded-md">
              <BookOpenText className="size-4" />
            </div>
            <h2 className="font-merienda text-xl font-semibold">Blogi</h2>
          </Link>
          <div className="flex items-center gap-3">
            <Link href={"/signin"}>
              <Button variant={"outline"} text={"sm"}>
                Sign In
              </Button>
            </Link>
            <ModeToggle />
          </div>
        </div>
      </header>
      <div className="flex-1 flex flex-col gap-10 items-center justify-center px-5 md:px-10">
        <h1 className="text-4xl font-bold md:text-5xl md:font-extrabold text-center font-poppins md:leading-18">
          <span className="font-merienda text-teal-600">Blogi</span> • Where
          Your Words <br /> Take Flight
        </h1>
        <p className="text-secondary-foreground text-center">
          Share your thoughts, inspire the world, and build your digital
          presence with Blogi.
        </p>
        <Link href={"/signup"}>
          <Button>Get Started</Button>
        </Link>
      </div>
      <div className="px-5 md:px-10 py-2.5 md:py-5 flex gap-1.5 items-center justify-center md:justify-start">
        <Link href="/" className="flex items-center gap-2 font-medium">
          <div className="bg-logo-bg text-sidebar-primary-foreground flex size-6 items-center justify-center rounded-md">
            <BookOpenText className="size-4" />
          </div>
          <h2 className="text-sm">Blogi</h2>
        </Link>
        <p>•</p>
        <p className="text-xs">© 2025 Blogi. All rights reserved</p>
      </div>
    </div>
  );
}
