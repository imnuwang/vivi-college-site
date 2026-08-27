/**
 * Style guide — 月光書房：暖米白紙頁、月桂墨綠書背、老金章節標記；
 * 導覽不搶內容，但任何時刻都能回到閱讀、工具、服務與免費資源的清楚路徑。
 */
import { Link, useLocation } from "wouter";
import React, { useEffect, useState } from "react";
import { ArrowRight, Instagram, Menu, X } from "lucide-react";
import { PortalyLeadLink } from "@/components/PortalyLeadLink";
import { asset, navItems, socialLinks } from "@/data/catalog";
import { cn } from "@/lib/utils";

export function SectionEyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("section-eyebrow", className)}>
      <span />
      {children}
    </p>
  );
}

export function MoonMark({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  return (
    <img
      src={asset.seal}
      alt="VIVI COLLEGE 美心學苑月星印記"
      className={cn("moon-mark", `moon-mark-${size}`)}
    />
  );
}

export function SiteFrame({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    const frame = window.requestAnimationFrame(() => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        document.getElementById(hash)?.scrollIntoView({ block: "start" });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [location]);

  const isHome = location === "/";

  return (
    <div className="min-h-screen overflow-x-clip bg-[#fbf8f0] text-[#183b31]">
      <header
        className={cn(
          "site-header",
          isHome && "site-header-on-hero",
          scrolled && "site-header-scrolled",
          menuOpen && "site-header-menu-open"
        )}
      >
        <a href="#main-content" className="skip-link">
          跳到主要內容
        </a>
        <div className="site-shell site-header-bar flex h-[76px] items-center justify-between gap-3">
          <Link href="/" className="brand-lockup" aria-label="美心學苑首頁">
            <MoonMark size="sm" />
            <span>
              <strong>VIVI COLLEGE</strong>
              <em>美心學苑</em>
            </span>
          </Link>
          <nav
            className="hidden items-center gap-5 lg:flex"
            aria-label="主要導覽"
          >
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "nav-link",
                  location === item.href && "nav-link-active"
                )}
                aria-current={location === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <PortalyLeadLink
              label="月光來信"
              className="header-letter hidden xl:inline-flex"
            />
            <Link href="/shop" className="header-letter inline-flex">
              免費資源 <ArrowRight className="size-4" />
            </Link>
            <button
              onClick={() => setMenuOpen(open => !open)}
              className="menu-trigger lg:hidden"
              aria-label={menuOpen ? "關閉選單" : "開啟選單"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </button>
          </div>
        </div>
        <div
          className={cn(
            "mobile-menu lg:hidden",
            menuOpen && "mobile-menu-open"
          )}
          aria-hidden={!menuOpen}
        >
          <nav className="site-shell py-4" aria-label="行動版導覽">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="mobile-nav-link"
              >
                {item.label}
                <ArrowRight className="size-4" />
              </Link>
            ))}
            <PortalyLeadLink
              label="訂閱月光來信"
              className="mobile-nav-link w-full"
            />
          </nav>
        </div>
      </header>
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <footer className="site-footer">
        <div className="site-shell grid gap-10 py-14 md:grid-cols-[1.15fr_.85fr_.85fr] md:py-18">
          <div>
            <div className="brand-lockup">
              <MoonMark size="sm" />
              <span>
                <strong className="text-[#f7f2e9]">VIVI COLLEGE</strong>
                <em className="text-[#b6c9ba]">美心學苑</em>
              </span>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-7 text-[#c4d3c6]">
              一座為直覺、生活與行動而設的內容學苑。先從一篇文章、一張工具表，慢慢走到更清楚的選擇。
            </p>
            <PortalyLeadLink
              label="訂閱月光來信"
              className="vivi-text-link mt-5 text-[#e7c989]"
            />
          </div>
          <div>
            <p className="footer-label">DISCOVER</p>
            <div className="mt-4 grid gap-3">
              {navItems.slice(1).map(item => (
                <Link key={item.href} href={item.href} className="footer-link">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="footer-label">STAY CONNECTED</p>
            <div className="mt-4 grid gap-3">
              <a
                className="footer-link inline-flex items-center gap-2"
                href={socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
              >
                <Instagram className="size-4" />
                Instagram @vivi_college
              </a>
              <a
                className="footer-link"
                href={socialLinks.line}
                target="_blank"
                rel="noreferrer"
              >
                加入 Vivi Line@
              </a>
              <a
                className="footer-link"
                href={socialLinks.application}
                target="_blank"
                rel="noreferrer"
              >
                申請 1 對 1 適配諮詢
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="site-shell flex flex-col gap-2 py-5 text-xs text-[#a8bda9] sm:flex-row sm:items-center sm:justify-between">
            <span>© 2026 VIVI COLLEGE 美心學苑. All rights reserved.</span>
            <span>
              靈性內容僅供自我探索與日常參考，不替代醫療、法律或財務專業意見。
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
