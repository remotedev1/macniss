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
import Cookies from "js-cookie";

export default function ConsultationModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const times = Number(Cookies.get("consultation_modal_times") || "0");
      if (times < 2) {
        setOpen(true); // Opens modal after 10s
        Cookies.set("consultation_modal_times", String(times + 1), {
          expires: 30, // Cookie expires in 30 days
        });
      }
    }, 6000); // 10 seconds (10000 ms)

    return () => clearTimeout(timer); // cleanup
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl w-full p-0 bg-black shadow-xl border-0 text-white">
        <ConsultationForm />
        <DialogClose asChild>
          <Button
            variant="ghost"
            className="mb-2 w-[80%] mx-auto bg-white text-black"
          >
            Close
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
