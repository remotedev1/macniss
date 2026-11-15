"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"; // adjust imports if your shadcn structure differs
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ConsultationSchema, indianStates } from "@/schemas";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function ConsultationForm() {
  const [submitError, setSubmitError] = useState("");
  const form = useForm({
    resolver: zodResolver(ConsultationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      state: "",
      details: "",
    },
  });
  async function onSubmit(values) {
    setSubmitError("");
    try {
      const res = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = await res.json();
      if (!res.ok) {
        setSubmitError(json?.error || "Unable to submit your enquiry. Please try again.");
        return;
      }
      form.reset();
      toast.success("Submitted — we will contact you soon");
    } catch {
      setSubmitError("Unable to submit your enquiry. Please try again.");
    }
  }

  return (
    <div className="mx-auto max-w-xl text-ink">
      <h2 className="mb-7 font-display text-3xl tracking-[-.035em] text-ink">
        Request a consultation
      </h2>

      <Form {...form}>
        <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Enter Your Name</FormLabel>
                <FormControl>
                  <Input autoComplete="name" className="h-12 rounded-none border-stone-300 bg-transparent" placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Enter Your Email</FormLabel>
                <FormControl>
                  <Input type="email" autoComplete="email" className="h-12 rounded-none border-stone-300 bg-transparent" placeholder="Email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">
                  Enter Your Phone Number
                </FormLabel>
                <FormControl>
                  <Input type="tel" autoComplete="tel-national" className="h-12 rounded-none border-stone-300 bg-transparent" placeholder="Phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Choose State</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger ref={field.ref} className="h-12 w-full rounded-none border-stone-300 bg-transparent data-[placeholder]:text-stone-700">
                      <SelectValue placeholder="Choose State" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                      {indianStates.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">
                  Enter your project details
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="min-h-28 rounded-none border-stone-300 bg-transparent"
                    placeholder="Site, scope, approximate area and what you would like to build"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-none bg-ink text-xs font-semibold uppercase tracking-[.16em] text-white hover:bg-black"
          >
            {form.formState.isSubmitting && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}
            {form.formState.isSubmitting ? "Submitting..." : "Submit"}
          </Button>
          {submitError && <p role="alert" className="text-sm text-destructive">{submitError}</p>}

          <p className="mt-3 text-center text-[10px] leading-5 text-stone-600">
            *By submitting this form, I confirm that I have read and agreed to
            accept the privacy policy.
          </p>
        </form>
      </Form>
    </div>
  );
}
