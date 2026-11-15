"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { signIn } from "next-auth/react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/common/form-error";
import { LoginSchema } from "@/schemas";
import { getSafeRedirectPath } from "@/lib/security/safe-redirect";
import { unsplash } from "@/components/frontEnd/modern/Unsplash";

export function LoginForm() {
  const callbackUrl = useSearchParams().get("callbackUrl");
  const [error, setError] = useState("");
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });
  const { isSubmitting } = form.formState;

  const submit = form.handleSubmit(async (values) => {
    setError("");
    try {
      const redirectTo = getSafeRedirectPath(callbackUrl);
      const result = await signIn("credentials", { ...values, redirect: false, redirectTo });
      if (!result?.ok || result.error) {
        setError("Invalid email or password.");
        return;
      }
      window.location.assign(redirectTo);
    } catch {
      setError("Authentication failed. Please try again.");
    }
  }, () => setError(""));

  return (
    <main className="grid min-h-screen bg-stone-50 text-ink [color-scheme:light] [--background:42_24%_96%] [--foreground:120_5%_8%] lg:grid-cols-2">
      <section className="relative hidden min-h-screen overflow-hidden bg-ink lg:block">
        <Image
          src={unsplash.construction}
          alt="Construction worker at a building site"
          fill
          priority
          unoptimized
          className="pointer-events-none object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/20" />
        <div className="absolute inset-x-0 bottom-0 p-12 text-white">
          <div className="text-[10px] uppercase tracking-[.24em] text-brass-300">Macniss Client Access</div>
          <h1 className="mt-5 max-w-xl font-display text-6xl leading-[.92] tracking-[-.05em]">
            Your projects. One secure place.
          </h1>
          <p className="mt-6 max-w-md leading-7 text-stone-300">
            Manage construction content and project information through the protected Macniss workspace.
          </p>
        </div>
      </section>
      <section className="flex min-h-screen items-center justify-center px-5 py-16 sm:px-10">
        <div className="w-full max-w-md">
          <Link href="/" className="mb-12 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.18em] text-stone-600">
            <ArrowLeft className="h-4 w-4" />
            Back to website
          </Link>
          <div className="mb-10 flex items-center gap-3">
            <Image src="/logo.png" alt="Macniss" width={52} height={52} />
            <div>
              <div className="font-display text-2xl">MACNISS</div>
              <div className="text-[8px] uppercase tracking-[.24em] text-stone-600">Builders</div>
            </div>
          </div>
          <h2 className="font-display text-5xl tracking-[-.045em]">Welcome back.</h2>
          <p className="mt-3 text-sm leading-6 text-stone-600">Sign in to continue to the secure dashboard.</p>
          <Form {...form}>
            <form noValidate onSubmit={submit} className="mt-9 space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] uppercase tracking-[.16em]">Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isSubmitting}
                        type="email"
                        autoComplete="email"
                        className="h-12 rounded-none border-stone-300 bg-transparent"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-[10px] uppercase tracking-[.16em]">Password</FormLabel>
                      <Link href="/auth/forgot-password" className="text-[10px] uppercase tracking-[.12em] text-stone-600">
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isSubmitting}
                        type="password"
                        autoComplete="current-password"
                        className="h-12 rounded-none border-stone-300 bg-transparent"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && (
                <div role="alert">
                  <FormError message={error} />
                </div>
              )}
              <button
                disabled={isSubmitting}
                type="submit"
                className="group flex h-12 w-full items-center justify-between bg-ink px-5 text-xs font-semibold uppercase tracking-[.16em] text-white disabled:opacity-60"
              >
                <span>{isSubmitting ? "Signing in…" : "Sign in"}</span>
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>
            </form>
          </Form>
        </div>
      </section>
    </main>
  );
}
