"use client";

import { AppSidebar } from "@/components/app-sidebar";
import PageLoader from "@/components/page-loader";
import { ModeToggle } from "@/components/toggle-theme";
import { NavUser } from "@/components/ui/nav-user";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { BookOpenText } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("blogi_token");

    if (!token) {
      router.replace("/signin");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) return <PageLoader />;
  return (
    <SidebarProvider>
      <div className="md:max-w-[65%] w-full mx-auto py-2 px-4 md:py-4 md:px-5 flex flex-col">
        <header className="flex items-center justify-between py-3 border-b border-border fixed top-0 left-0 w-full bg-background z-50 px-4 md:px-[17.5%]">
          <Link
            href={"/"}
            className="items-center gap-2 font-medium hidden md:flex"
          >
            <div className="bg-logo-bg text-sidebar-primary-foreground flex size-6 items-center justify-center rounded-md">
              <BookOpenText className="size-4" />
            </div>
            <h2 className="font-merienda text-xl font-semibold">Blogi</h2>
          </Link>
          <div className="md:hidden">
            <SidebarTrigger size="lg" />
          </div>
          <div className="hidden md:flex items-center gap-1.5">
            <ModeToggle />
            <Link
              href={"/user-blogs"}
              className="bg-teal-500 text-white min-w-fit font-semibold transition-colors duration-500 hover:bg-teal-600 rounded-[3px] p-1"
            >
              Your Blogs
            </Link>
            <NavUser />
          </div>
          <div className="md:hidden">
            <ModeToggle />
          </div>
        </header>

        <AppSidebar />

        <main className="flex-1 px-2 py-3 md:px-4 pt-[4.5rem]">{children}</main>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
