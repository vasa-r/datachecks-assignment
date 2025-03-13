"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PageLoader from "@/components/page-loader";

interface AuthLayout {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayout) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("blogi_token");

    if (token) {
      router.replace("/articles");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) return <PageLoader />;

  return <>{children}</>;
}
