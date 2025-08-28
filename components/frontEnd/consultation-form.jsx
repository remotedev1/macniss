"use client";

import React from "react";
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
    try {
      const res = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message || "Failed");
      form.reset();
      toast.success("Submitted — we will contact you soon");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6 rounded-2xl text-white" id="consultation-form">
      <h2 className="text-3xl font-extrabold text-yellow-400 mb-6">
        Request Free Tech Consultation
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Enter Your Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Your Name" {...field} />
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
                  <Input placeholder="Enter Your Email" {...field} />
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
                  <Input placeholder="Enter Your Phone Number" {...field} />
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
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose State" />
                    </SelectTrigger>
                    <SelectContent>
                      {indianStates.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
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
                    placeholder="Enter your project details"
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
            className="w-full bg-yellow-400 text-black font-bold rounded-full py-4 flex items-center justify-center gap-2"
          >
            {form.formState.isSubmitting && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}
            {form.formState.isSubmitting ? "Submitting..." : "Submit"}
          </Button>

          <p className="text-xs text-neutral-300 text-center mt-2">
            *By submitting this form, I confirm that I have read and agreed to
            accept the privacy policy.
          </p>
        </form>
      </Form>
    </div>
  );
}
