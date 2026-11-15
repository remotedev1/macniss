"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ConsultationForm from "../consultation-form";

export default function ConsultationModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const match = document.cookie.match(
        /(?:^|; )consultation_modal_times=([^;]*)/,
      );
      const times = Number(match?.[1] ?? "0");

      if (times < 2) {
        setOpen(true);
        document.cookie = `consultation_modal_times=${times + 1}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`;
      }
    }, 6000); // 10 seconds (10000 ms)

    return () => clearTimeout(timer); // cleanup
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl gap-0 border border-stone-300 bg-stone-50 p-0 text-ink shadow-2xl dark:bg-stone-50 dark:text-ink">
        <div className="px-4 pb-4 pt-10 sm:px-8 sm:pb-6 sm:pt-8">
          <ConsultationForm />
        </div>
        <DialogClose asChild>
          <Button
            variant="ghost"
            className="mx-4 mb-4 h-11 rounded-none border border-stone-300 bg-white text-ink hover:bg-stone-100 hover:text-ink sm:mx-8 sm:mb-6"
          >
            Close
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
