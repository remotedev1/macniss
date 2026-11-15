"use client";

import { useEffect } from "react";
import NProgress from "nprogress";
import { usePathname, useSearchParams } from "next/navigation";
import "nprogress/nprogress.css";

NProgress.configure({
  showSpinner: false,
  barSelector: "[data-progress-bar]",
  template: '<div class="bar" data-progress-bar aria-hidden="true"><div class="peg"></div></div>',
});

export default function PageLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!(link instanceof HTMLAnchorElement) || link.hasAttribute("download") || (link.target && link.target !== "_self")) return;

      const destination = new URL(link.href, window.location.href);
      const { origin, pathname, search } = window.location;
      if (destination.origin !== origin || (destination.pathname === pathname && destination.search === search)) return;

      NProgress.start();
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    // finish loader after route change
    const timer = setTimeout(() => NProgress.done(), 300);
    return () => {
      clearTimeout(timer);
      NProgress.done();
    };
  }, [pathname, searchParams]);

  return null;
}
