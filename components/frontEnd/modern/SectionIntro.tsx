import { cn } from "@/lib/utils";

type SectionIntroProps = {
  eyebrow: string;
  title: string;
  text?: string;
  light?: boolean;
  align?: "left" | "center";
  eyebrowClassName?: string;
  textClassName?: string;
};

export default function SectionIntro({
  eyebrow,
  title,
  text,
  light = false,
  align = "left",
  eyebrowClassName,
  textClassName,
}: SectionIntroProps) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <div className={cn("mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em]", light ? "text-brass-300" : "text-brass-700", eyebrowClassName)}>
        <span className="h-px w-10 bg-current" /> {eyebrow}
      </div>
      <h2 className={`font-display text-4xl leading-[0.98] tracking-[-0.04em] sm:text-5xl lg:text-6xl ${light ? "text-stone-50" : "text-ink"}`}>{title}</h2>
      {text && <p className={cn("mt-6 max-w-2xl text-base leading-7", align === "center" && "mx-auto", light ? "text-stone-300" : "text-stone-600", textClassName)}>{text}</p>}
    </div>
  );
}
