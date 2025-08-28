"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, User } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"; // adjust path if needed
import clsx from "clsx";
import Link from "next/link";
import Container from "../common/GlobalContainer";

export default function Header() {
  const [isFixed, setIsFixed] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = 0;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 10) {
        // scrolling down
        setIsFixed(true);
      } else if (window.scrollY < lastScrollY && window.scrollY < 10) {
        // scrolling back up
        setIsFixed(false);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <Container>
      <div className="h-[107px] lg:h-20" />
      <header
        className={clsx(
          "fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-10 lg:px-20 xl:px-38 py-4 transition-colors duration-500 ease-in-out",
          isFixed ? "bg-white shadow-md" : "bg-black backdrop-blur-md"
        )}
      >
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link href="/" className="no-underline cursor-pointer">
            <Image src="/logo.png" alt="Logo" width={75} height={75} />
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="p-2 rounded ">
                <Menu
                  className={clsx(
                    "w-6 h-6 hover:text-yellow-400",
                    !isFixed ? "text-white" : "text-black"
                  )}
                />
              </button>
            </SheetTrigger>
            <SheetContent side="top" className="w-full h-full">
              <nav className="space-y-4 flex flex-col items-center justify-center h-full text-lg">
                <a href="#" className="block hover:text-yellow-400">
                  Home
                </a>
                <a href="#" className="block hover:text-yellow-400">
                  About
                </a>
                <a href="#" className="block hover:text-yellow-400">
                  Services
                </a>
                <a href="#" className="block hover:text-yellow-400">
                  Contact
                </a>
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/auth/login" className="no-underline cursor-pointer ">
            <User
              className={clsx(
                "w-6 h-6 hover:text-yellow-400",
                !isFixed ? "text-white" : "text-black"
              )}
            />
          </Link>
        </div>
      </header>
    </Container>
  );
}
