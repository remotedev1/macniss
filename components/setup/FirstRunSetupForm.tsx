"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";

const inputClass = "h-12 w-full rounded-none border border-stone-300 bg-white px-4 text-sm outline-none transition focus:border-ink";

export default function FirstRunSetupForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  async function submit(event) {
    event.preventDefault();
    setError("");
    setPending(true);
    try {
      const response = await fetch("/api/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Unable to complete setup.");
        return;
      }
      window.location.href = "/auth/login?setup=success";
    } catch {
      setError("Unable to complete setup. Check the database connection and try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="min-h-screen bg-stone-50 text-ink lg:grid lg:grid-cols-[.78fr_1.22fr]">
      <aside className="relative hidden min-h-screen overflow-hidden bg-ink text-white lg:block">
        <Image src="/hero.jpg" alt="Macniss development" fill priority className="object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/40" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:33.333%_100%]" />
        <div className="absolute inset-x-0 bottom-0 p-12">
          <div className="text-[10px] uppercase tracking-[.24em] text-brass-300">First-run configuration</div>
          <h1 className="mt-5 max-w-xl font-display text-6xl leading-[.9] tracking-[-.055em]">
            Set up the secure Macniss workspace.
          </h1>
          <p className="mt-6 max-w-md leading-7 text-white/65">
            Create the first CMS account. This setup screen disables itself as soon as an account exists.
          </p>
        </div>
      </aside>

      <section className="flex min-h-screen items-center justify-center px-5 py-14 sm:px-10 lg:px-16">
        <div className="w-full max-w-2xl">
          <div className="mb-9 flex items-center gap-3">
            <Image src="/logo.png" alt="Macniss" width={52} height={52} className="h-12 w-12 object-contain" />
            <div>
              <div className="font-display text-2xl tracking-[-.035em]">MACNISS</div>
              <div className="text-[8px] uppercase tracking-[.26em] text-stone-500">Builders · CMS Setup</div>
            </div>
          </div>

          <div className="border-t border-stone-300 pt-8">
            <div className="flex items-start gap-4">
              <ShieldCheck className="mt-1 h-5 w-5 text-brass-700" />
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[.2em] text-brass-700">Step 01 · Administrator</div>
                <h2 className="mt-3 font-display text-5xl tracking-[-.05em]">Create the first account.</h2>
                <p className="mt-4 max-w-xl leading-7 text-stone-600">
                  This user receives access to the private CMS. Use a unique password that is not shared with any other service.
                </p>
              </div>
            </div>

            <form onSubmit={submit} className="mt-9 grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[.16em]">First name</span>
                <input required name="firstName" value={form.firstName} onChange={update} className={inputClass} autoComplete="given-name" />
              </label>
              <label className="block">
                <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[.16em]">Last name</span>
                <input name="lastName" value={form.lastName} onChange={update} className={inputClass} autoComplete="family-name" />
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[.16em]">Email</span>
                <input required name="email" value={form.email} onChange={update} className={inputClass} type="email" autoComplete="email" />
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[.16em]">Phone number <span className="text-stone-400">(optional)</span></span>
                <input name="phoneNumber" value={form.phoneNumber} onChange={update} className={inputClass} inputMode="numeric" placeholder="10-digit Indian mobile number" />
              </label>
              <label className="block">
                <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[.16em]">Password</span>
                <input required name="password" value={form.password} onChange={update} className={inputClass} type="password" autoComplete="new-password" />
              </label>
              <label className="block">
                <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[.16em]">Confirm password</span>
                <input required name="confirmPassword" value={form.confirmPassword} onChange={update} className={inputClass} type="password" autoComplete="new-password" />
              </label>

              <div className="sm:col-span-2 border-y border-stone-300 py-5">
                <div className="grid gap-2 text-xs leading-5 text-stone-500 sm:grid-cols-2">
                  {["12 or more characters", "Uppercase and lowercase letters", "At least one number", "At least one symbol"].map((item) => (
                    <div key={item} className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-brass-700" />{item}</div>
                  ))}
                </div>
              </div>

              {error && <div className="sm:col-span-2 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

              <button disabled={pending} className="group flex h-12 items-center justify-between bg-ink px-5 text-xs font-semibold uppercase tracking-[.16em] text-white disabled:opacity-60 sm:col-span-2">
                <span>{pending ? "Creating workspace…" : "Complete first-run setup"}</span>
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
