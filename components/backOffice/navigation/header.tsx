import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export const Header = ({ className, fixed, children, ...props }: React.ComponentPropsWithoutRef<"header"> & { fixed?: boolean }) => {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const onScroll = () => setOffset(document.documentElement.scrollTop || 0);
    document.addEventListener("scroll", onScroll, { passive: true });
    return () => document.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "flex h-[72px] items-center gap-3 border-b border-border bg-background/95 px-4 text-foreground backdrop-blur-xl sm:gap-4 sm:px-6",
        fixed && "header-fixed peer/header fixed z-50 w-[inherit]",
        offset > 10 && fixed ? "shadow-sm" : "shadow-none",
        className
      )}
      {...props}
    >
      <SidebarTrigger variant="ghost" className="rounded-none border border-stone-300" />
      <Separator orientation="vertical" className="h-6 bg-stone-300" />
      {children}
    </header>
  );
};
