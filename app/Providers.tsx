"use client";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/context/theme-context";
import { ToastProvider } from "@/context/toast.provider";
import { ImageKitProvider } from "imagekitio-next";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

export const Providers = ({ children }: { children: ReactNode }) => {
  // Only the Toaster has a hydration mismatch (sonner reads theme/DOM on
  // mount). Everything else — including the dashboard tree — must render
  // on the server and hydrate normally, otherwise the whole app (and any
  // context providers, like SessionProvider from the root layout) never
  // gets a chance to render on first paint.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const authenticator = async () => {
    try {
      const res = await fetch("/api/imagekit-auth");
      if (!res.ok) throw new Error("Failed to authenticate");
      return res.json();
    } catch (error) {
      console.error("ImageKit authentication error:", error);
      throw error;
    }
  };
  return (
    <ThemeProvider defaultTheme="system" storageKey="my-app-theme">
      <ToastProvider>
        <ImageKitProvider
          publicKey={publicKey}
          urlEndpoint={urlEndpoint}
          authenticator={authenticator}
        >
          {children}
        </ImageKitProvider>

        {mounted && <Toaster position="top-right" richColors />}
      </ToastProvider>
    </ThemeProvider>
  );
};
