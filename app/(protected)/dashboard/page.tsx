import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpenText, BriefcaseBusiness, FolderKanban, Images, MessageSquareText, Quote } from "lucide-react";
import { db } from "@/lib/db";

const tools = [
  { title: "Developments", detail: "Update projects, milestones and photos.", href: "/dashboard/projects", icon: FolderKanban },
  { title: "Consultations", detail: "Review and follow up on project enquiries.", href: "/dashboard/consultations", icon: MessageSquareText },
  { title: "Capabilities", detail: "Edit construction and development services.", href: "/dashboard/solutions", icon: BriefcaseBusiness },
  { title: "Interior gallery", detail: "Upload and organise interior photographs.", href: "/dashboard/interior-gallery", icon: Images },
  { title: "Testimonials", detail: "Manage published client feedback.", href: "/dashboard/testimonials", icon: Quote },
  { title: "Documentation", detail: "Find editing and publishing instructions.", href: "/dashboard/documentation", icon: BookOpenText },
] as const;

export default async function Home() {
  const metrics = await Promise.allSettled([
    db.projects.count({ where: { isArchived: false } }),
    db.consultations.count({ where: { status: "PENDING" } }),
    db.solutions.count({ where: { isArchived: false } }),
  ]);
  const count = (index: number) => {
    const result = metrics[index];
    return result.status === "fulfilled" ? result.value : "—";
  };

  return (
    <div className="cms-overview">
      <section className="cms-dashboard-hero">
        <div className="cms-dashboard-hero-copy">
          <p className="cms-kicker">Macniss Builders</p>
          <h1>Website dashboard</h1>
          <p>Manage your projects, site content and incoming enquiries.</p>
          <Link href="/dashboard/projects" className="cms-hero-action">
            Manage projects <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <Image src="/images/home/draw-landmark.webp" alt="" fill priority sizes="(min-width: 1024px) 52vw, 100vw" />
      </section>

      <section className="cms-metrics" aria-label="Workspace totals">
        {([
          ["Published projects", count(0), "/dashboard/projects"],
          ["Pending enquiries", count(1), "/dashboard/consultations"],
          ["Published services", count(2), "/dashboard/solutions"],
        ] as const).map(([name, value, href]) => (
          <Link key={name} href={href} className="cms-metric">
            <span>{name}</span>
            <strong>{value}</strong>
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        ))}
      </section>

      <section aria-labelledby="cms-tools">
        <h2 id="cms-tools" className="mb-4 text-xl font-semibold">Manage website</h2>
        <div className="cms-work-grid">
          {tools.map(({ title, detail, href, icon: Icon }) => (
            <Link key={href} href={href} className="cms-work-link">
              <span className="cms-work-icon"><Icon size={20} aria-hidden="true" /></span>
              <span className="min-w-0"><strong>{title}</strong><span className="cms-work-detail">{detail}</span></span>
              <ArrowUpRight className="text-muted-foreground" size={16} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
