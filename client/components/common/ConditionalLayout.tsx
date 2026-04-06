"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";
import MobileBottomNav from "./MobileBottomNav";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");
  const isNepPage = pathname?.startsWith("/nep");

  const hideLayout = isAdminPage || isNepPage;

  return (
    <>
      {children}
      {!hideLayout && <Footer />}
      {!hideLayout && <MobileBottomNav />}
    </>
  );
}
