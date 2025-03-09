import { BookOpenText } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/toggle-theme";
import { SignupForm } from "@/components/auth/signup-form";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-1">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-logo-bg text-sidebar-primary-foreground flex size-6 items-center justify-center rounded-md">
              <BookOpenText className="size-4" />
            </div>
            Blogi
          </Link>
          <ModeToggle />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  );
}
