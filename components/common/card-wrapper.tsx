import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { BackButton } from "./back-button";
import { Header } from "./header";
import { unsplash } from "../frontEnd/modern/Unsplash";

type CardWrapperProps = {
  children: ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
};

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
}: CardWrapperProps) => {
  return (
    <main className="grid min-h-screen bg-stone-50 text-ink lg:grid-cols-[.9fr_1.1fr]">
      <section className="relative hidden overflow-hidden bg-ink lg:block">
        <Image
          src={unsplash.construction}
          alt="Macniss development"
          fill
          priority
          className="object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/35" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:33.333%_100%]" />
        <div className="absolute inset-x-0 bottom-0 p-12 text-white">
          <div className="text-[10px] uppercase tracking-[.24em] text-brass-300">
            Secure Macniss Access
          </div>
          <h1 className="mt-5 max-w-xl font-display text-6xl leading-[.9] tracking-[-.055em]">
            Protected access to your workspace.
          </h1>
          <p className="mt-6 max-w-md leading-7 text-white/65">
            Authentication and account recovery are handled through the secure
            Macniss client environment.
          </p>
        </div>
      </section>

      <section className="flex min-h-screen items-center justify-center px-5 py-16 sm:px-10 lg:px-16">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="mb-12 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.18em] text-stone-500"
          >
            <ArrowLeft className="h-4 w-4" /> Back to website
          </Link>
          <div className="mb-9 flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Macniss"
              width={50}
              height={50}
              className="h-11 w-11 object-contain"
            />
            <div>
              <div className="font-display text-2xl tracking-[-.035em]">
                MACNISS
              </div>
              <div className="text-[8px] uppercase tracking-[.26em] text-stone-500">
                Builders
              </div>
            </div>
          </div>

          <div className="border-t border-stone-300">
            <CardHeader className="px-0 pb-5 pt-8">
              <Header label={headerLabel} />
            </CardHeader>
            <CardContent className="px-0">{children}</CardContent>
            <CardFooter className="px-0 pb-0 pt-6">
              <BackButton label={backButtonLabel} href={backButtonHref} />
            </CardFooter>
          </div>
        </div>
      </section>
    </main>
  );
};
