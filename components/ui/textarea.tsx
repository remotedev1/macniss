import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<React.ElementRef<'textarea'>, React.ComponentPropsWithoutRef<'textarea'>>(({ className, ...props }, ref) => {
  return (
    (<textarea
      className={cn(
        "flex min-h-[112px] w-full resize-y rounded-none border border-input bg-background px-3 py-3 text-base text-foreground shadow-none transition-[border-color,box-shadow,background-color] placeholder:text-muted-foreground/80 hover:border-foreground/35 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-60 md:text-sm",
        className
      )}
      ref={ref}
      {...props} />)
  );
})
Textarea.displayName = "Textarea"

export { Textarea }
