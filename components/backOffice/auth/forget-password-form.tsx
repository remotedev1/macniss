"use client";

import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordSchema } from "@/schemas";
import { Form } from "@/components/ui/form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/common/form-error";
import { FormSuccess } from "@/components/common/form-success";

import { CardWrapper } from "@/components/common/card-wrapper";
import { forgotPassword } from "@/actions/forgot-password";

export const ForgotPasswordForm = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      forgotPassword(values).then((res) => {
        if (res?.success) setSuccess(res.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Forgot your password?"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    className="h-12 rounded-none border-stone-300 bg-transparent"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="h-12 w-full rounded-none bg-ink text-xs font-semibold uppercase tracking-[.16em] text-white hover:bg-stone-800" disabled={isPending}>
            Submit
          </Button>
        </form>
      </Form>
      <div className="mt-5 text-center text-xs leading-5 text-stone-500">
        A reset link will be sent to your email if it exists in our system.
      </div>
    </CardWrapper>
  );
};
