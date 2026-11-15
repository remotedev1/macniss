import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function AdminPageHeader({ eyebrow = "Content workspace", title, description, publicHref, publicLabel = "View public page" }) {
  return (
    <section data-testid="admin-page-header" className="cms-page-heading">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="cms-kicker">{eyebrow}</div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
          {description && <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p>}
        </div>
        {publicHref && (
          <Link href={publicHref} target="_blank" rel="noopener" className="cms-quiet-link w-fit">
            {publicLabel}<ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>
    </section>
  );
}
