import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import { ArrowLeft, ArrowUpRight, MapPin } from "lucide-react";
import { db } from "@/lib/db";
import EditorialPhoto from "@/components/frontEnd/modern/EditorialPhoto";
import { unsplash } from "@/components/frontEnd/modern/Unsplash";
import { pageMetadata } from "@/lib/seo";

const getProject = cache(async (id) => {
  try {
    return await db.projects.findUnique({ where: { id, isArchived: false } });
  } catch {
    return null;
  }
});

export async function generateMetadata({ params }) {
  const project = await getProject(params.id);
  if (!project) {
    return {
      title: "Project not found",
      description: "This project is unavailable.",
      robots: { index: false, follow: true },
    };
  }

  const description = project.projectTagline || project.overview || `Explore ${project.projectName}, a Macniss ${project.projectType.toLowerCase()} project in ${project.location}.`;
  return pageMetadata(
    project.projectName,
    description.length > 160 ? `${description.slice(0, 157).trimEnd()}...` : description,
    `/our-works/${project.id}`,
  );
}

async function getRelated(project) {
  try {
    return await db.projects.findMany({
      where: {
        id: { not: project.id },
        isArchived: false,
        projectType: project.projectType,
      },
      take: 3,
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

function formatDate(value) {
  if (!value) return null;
  return new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(new Date(value));
}

function formatCost(value) {
  if (!value) return null;
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(value % 10000000 ? 1 : 0)} Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(value % 100000 ? 1 : 0)} L`;
  return `₹${Number(value).toLocaleString("en-IN")}`;
}

function label(value) {
  return String(value || "").replaceAll("_", " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
}

export default async function ProjectPage({ params }) {
  const project = await getProject(params.id);

  if (!project) notFound();

  const related = await getRelated(project);
  const hero = project.imageGallery?.[0];
  const gallery = project.imageGallery?.slice(1) || [];
  const facts = [
    ["Status", label(project.status)],
    ["Sector", label(project.projectType)],
    ["Location", project.location],
    ["Client", project.clientName],
    ["Architect", project.architectName],
    ["Contractor", project.contractorName],
    ["Commenced", formatDate(project.startDate)],
    ["Completion", formatDate(project.completionDate)],
    ["Project value", formatCost(project.estimatedCost)],
  ].filter(([, value]) => value);

  return (
    <main className="bg-stone-50 text-ink">
      <section className="relative min-h-[88svh] overflow-hidden bg-ink text-white">
        {hero?.url ? (
          <Image
            src={hero.url}
            alt={project.projectName}
            fill
            priority
            className="object-cover opacity-70"
            sizes="100vw"
          />
        ) : <EditorialPhoto src={unsplash.portfolioHero} alt="Illustrative residential architecture" className="absolute inset-0 opacity-60" eager priority />}
        {!hero?.url && <span className="absolute right-5 top-32 bg-black/60 px-3 py-2 text-[10px] uppercase tracking-[.15em] text-white">Illustrative image</span>}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/35" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:25%_100%]" />

        <div className="relative mx-auto flex min-h-[88svh] max-w-[1440px] flex-col justify-between px-5 pb-10 pt-32 sm:px-8 lg:px-12 lg:pb-14">
          <Link href="/our-works" className="inline-flex w-fit items-center gap-2 text-[10px] font-semibold uppercase tracking-[.2em] text-white/75 transition hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Development portfolio
          </Link>

          <div>
            <div className="mb-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] uppercase tracking-[.22em] text-white/70">
              <span>{label(project.projectType)}</span>
              <span className="h-px w-8 bg-brass-400" />
              <span className="inline-flex items-center gap-2"><MapPin className="h-3.5 w-3.5" />{project.location}</span>
              <span>{label(project.status)}</span>
            </div>
            <h1 className="max-w-6xl font-display text-[clamp(4rem,10vw,9rem)] leading-[.82] tracking-[-.065em]">
              {project.projectName}
            </h1>
            {project.projectTagline && (
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/78 sm:text-xl">{project.projectTagline}</p>
            )}
          </div>
        </div>
      </section>

      <section className="border-b border-stone-300">
        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[.72fr_1.28fr]">
          <aside className="border-stone-300 px-5 py-16 sm:px-8 lg:border-r lg:px-12 lg:py-24">
            <div className="text-[10px] uppercase tracking-[.22em] text-stone-600">Development facts</div>
            <div className="mt-7 border-t border-stone-300">
              {facts.map(([key, value]) => (
                <div key={key} className="grid grid-cols-[118px_1fr] gap-4 border-b border-stone-300 py-4 text-sm">
                  <span className="text-stone-600">{key}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </aside>

          <div className="px-5 py-16 sm:px-8 lg:px-16 lg:py-24 xl:px-24">
            <div className="text-[10px] uppercase tracking-[.22em] text-brass-700">The development</div>
            <h2 className="mt-5 max-w-3xl font-display text-5xl leading-[.96] tracking-[-.05em] sm:text-6xl">
              From intent to a built place with lasting value.
            </h2>
            <p className="mt-9 max-w-3xl whitespace-pre-line text-lg leading-8 text-stone-600">{project.overview}</p>
          </div>
        </div>
      </section>

      <section aria-label="Architectural detail" className="mx-auto grid max-w-[1440px] gap-4 px-5 py-5 sm:px-8 md:grid-cols-[1.25fr_.75fr] lg:px-12">
        <EditorialPhoto src={unsplash.serviceStructure} alt="Architectural facade and structural detail" className="min-h-[310px] sm:min-h-[480px]" />
        <EditorialPhoto src={unsplash.aboutMaterial} alt="Architectural exterior and material detail" className="min-h-[310px] sm:min-h-[480px]" />
      </section>

      {(project.objectives?.length > 0 || project.keyFeatures?.length > 0) && (
        <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-32">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            {project.objectives?.length > 0 && (
              <div>
                <div className="text-[10px] uppercase tracking-[.22em] text-stone-600">Project objectives</div>
                <h2 className="mt-5 font-display text-4xl tracking-[-.045em] sm:text-5xl">What the brief needed to achieve.</h2>
                <div className="mt-9 border-t border-stone-300">
                  {project.objectives.map((item, index) => (
                    <div key={item} className="grid grid-cols-[42px_1fr] border-b border-stone-300 py-5">
                      <span className="text-xs text-brass-700">{String(index + 1).padStart(2, "0")}</span>
                      <p className="leading-7 text-stone-600">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.keyFeatures?.length > 0 && (
              <div>
                <div className="text-[10px] uppercase tracking-[.22em] text-stone-600">Defining features</div>
                <h2 className="mt-5 font-display text-4xl tracking-[-.045em] sm:text-5xl">The decisions that shape the place.</h2>
                <div className="mt-9 space-y-3">
                  {project.keyFeatures.map((feature, index) => (
                    <article key={`${feature.title}-${index}`} className="border border-stone-300 bg-white p-6 sm:p-7">
                      <div className="text-[10px] uppercase tracking-[.2em] text-brass-700">{String(index + 1).padStart(2, "0")}</div>
                      <h3 className="mt-4 font-display text-2xl tracking-[-.035em]">{feature.title}</h3>
                      <p className="mt-3 leading-7 text-stone-600">{feature.description}</p>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {gallery.length > 0 && (
        <section className="bg-stone-200 py-3">
          <div className="grid gap-3 px-3 md:grid-cols-12">
            {gallery.map((img, index) => {
              const layout = index % 4;
              const classes =
                layout === 0
                  ? "md:col-span-8 aspect-[16/10]"
                  : layout === 1
                    ? "md:col-span-4 aspect-[4/5]"
                    : layout === 2
                      ? "md:col-span-5 aspect-[4/5]"
                      : "md:col-span-7 aspect-[16/10]";
              return (
                <div key={img.url || index} className={`relative overflow-hidden bg-stone-300 ${classes}`}>
                  <Image
                    src={img.url}
                    alt={`${project.projectName} — view ${index + 2}`}
                    fill
                    className="object-cover transition duration-700 hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 66vw"
                  />
                </div>
              );
            })}
          </div>
        </section>
      )}

      {project.technologiesUsed?.length > 0 && (
        <section className="border-b border-stone-300 bg-ink text-white">
          <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:px-12 lg:py-28">
            <div>
              <div className="text-[10px] uppercase tracking-[.22em] text-brass-400">Delivery & technology</div>
              <h2 className="mt-5 max-w-xl font-display text-5xl leading-[.95] tracking-[-.05em]">Built with systems selected for performance.</h2>
            </div>
            <div className="border-t border-white/20">
              {project.technologiesUsed.map((item, index) => (
                <div key={item} className="grid grid-cols-[52px_1fr] border-b border-white/20 py-5">
                  <span className="text-xs text-brass-400">{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-lg text-white/80">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="flex items-end justify-between gap-8">
            <div>
              <div className="text-[10px] uppercase tracking-[.22em] text-brass-700">Continue exploring</div>
              <h2 className="mt-4 font-display text-5xl tracking-[-.05em]">Related developments.</h2>
            </div>
            <Link href="/our-works" className="hidden items-center gap-2 text-[10px] font-semibold uppercase tracking-[.2em] sm:inline-flex">
              View portfolio <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {related.map((item) => (
              <Link key={item.id} href={`/our-works/${item.id}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-stone-200">
                  {item.imageGallery?.[0]?.url ? (
                    <Image
                      src={item.imageGallery[0].url}
                      alt={item.projectName}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-[1.035]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : <EditorialPhoto src={unsplash.estate} alt="Illustrative architecture" className="absolute inset-0" />}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="text-[9px] uppercase tracking-[.2em] text-white/90">{label(item.projectType)} · {item.location}</div>
                    <h3 className="mt-3 font-display text-3xl tracking-[-.04em]">{item.projectName}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="bg-brass-700 text-white">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-5 py-20 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-12 lg:py-24">
          <div>
            <div className="text-[10px] uppercase tracking-[.22em] text-white/90">Start a development</div>
            <h2 className="mt-5 max-w-4xl font-display text-5xl leading-[.92] tracking-[-.055em] sm:text-7xl">
              Have land, a brief or a project in mind?
            </h2>
          </div>
          <Link href="/contact#enquiry" className="inline-flex w-fit items-center gap-3 border-b border-white pb-2 text-xs font-semibold uppercase tracking-[.18em]">
            Discuss your project <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
