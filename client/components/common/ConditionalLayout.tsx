"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";
import MobileBottomNav from "./MobileBottomNav";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");
  const isNepPage = pathname?.startsWith("/nep");
  const isLandingPage = pathname?.includes("-LP");
  const isThankYouPage = pathname === "/thankyou" || pathname?.startsWith("/thankyou");

  const hideLayout = isAdminPage || isNepPage || isLandingPage || isThankYouPage;

  return (
    <>
      {children}
      {!hideLayout && <Footer />}
      {!hideLayout && <MobileBottomNav />}
    </>
  );
}
