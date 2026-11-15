import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { db } from "@/lib/db";
import ConsultationForm from "@/components/frontEnd/consultation-form";
import Hero from "@/components/frontEnd/homepage/Hero";
import HomeTestimonials from "@/components/frontEnd/homepage/HomeTestimonials";
import "./homepage.css";

const services = [
  ["Development & planning", "Assess the land, define the brief and coordinate design before you commit to construction."],
  ["Construction & delivery", "Take residential, commercial and estate projects from approved drawings through site execution and handover."],
  ["Interiors & fit-out", "Plan finishes, joinery and services alongside the building so the spaces work as a whole."],
] as const;

function projectType(type: string) {
  return type.toLowerCase().replaceAll("_", " ");
}

function isProjectPhoto(image: { fileId?: string; url?: string }) {
  return Boolean(image.url && !image.fileId?.startsWith("seed-") &&
    !["/hero.jpg", "/hero-old.jpg", "/images/modern-house.jpg", "/placeholder.jpg"].includes(image.url));
}

function projectIllustration(type: string, index: number) {
  if (type === "RESIDENTIAL") return index === 0 ? "estate" : "villa";
  if (type === "COMMERCIAL" || type === "INSTITUTIONAL" || type === "MIXED_USE") return "commercial";
  return "site";
}

async function getHomeContent() {
  const [projects, testimonials, gallery, capabilities] = await Promise.allSettled([
    db.projects.findMany({
      where: { isArchived: false },
      orderBy: { createdAt: "desc" },
      take: 3,
      select: { id: true, projectName: true, projectType: true, location: true, imageGallery: true },
    }),
    db.testimonials.findMany({
      where: { isArchived: false },
      orderBy: { createdAt: "desc" },
      take: 6,
      select: { id: true, name: true, role: true, quote: true },
    }),
    db.interiorGallery.findFirst({ select: { images: true } }),
    db.solutions.findMany({
      where: { isArchived: false },
      orderBy: { createdAt: "desc" },
      take: 3,
      select: { title: true, description: true },
    }),
  ]);
  const images = gallery.status === "fulfilled" ? gallery.value?.images : null;
  const galleryImage = Array.isArray(images)
    ? images.find((image): image is { url: string } => {
      if (!image || typeof image !== "object" || !("url" in image) || typeof image.url !== "string") return false;
      const fileId = "fileId" in image && typeof image.fileId === "string" ? image.fileId : undefined;
      return isProjectPhoto({ fileId, url: image.url });
    })
    : undefined;
  return {
    projects: projects.status === "fulfilled" ? projects.value : [],
    testimonials: testimonials.status === "fulfilled" ? testimonials.value : [],
    galleryImage: galleryImage?.url,
    capabilities: capabilities.status === "fulfilled" && capabilities.value.length
      ? capabilities.value
      : services.map(([title, description]) => ({ title, description })),
  };
}

export default async function Page() {
  const { projects, testimonials, galleryImage, capabilities } = await getHomeContent();

  return (
    <main className="macniss-home bg-[#f1eee6] text-[#22231e]">
      <Hero />

      <section id="development-story" className="home-shell home-space scroll-mt-8" aria-labelledby="home-about">
        <div className="home-lede">
          <div>
            <p className="home-kicker mb-5 text-[#71532b]">Macniss Builders</p>
            <h2 id="home-about" className="home-display font-display">
              Make the most<br className="hidden sm:block" /> of the <em>site.</em>
            </h2>
          </div>
          <div className="home-lede-copy">
            <p>Early decisions about the land, budget and brief shape everything that follows. We bring planning, design coordination and construction together so you can make those decisions with a clear picture of what can be built.</p>
            <Link href="/about-us" className="home-text-link">
              About Macniss <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section id="portfolio" className="home-shell pb-20 sm:pb-28 lg:pb-36" aria-labelledby="home-projects">
        <div className="home-section-header">
          <h2 id="home-projects" className="home-display font-display">Selected <em>projects.</em></h2>
          <Link href="/our-works" className="home-text-link">
            View all projects <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
        {projects.length > 0 ? (
          <div className="home-project-grid">
            {projects.map((project, index) => {
              const photo = project.imageGallery.find(isProjectPhoto)?.url;
              const illustration = `/images/home/${projectIllustration(project.projectType, index)}.webp`;
              return (
                <Link className="home-project" href={`/our-works/${project.id}`} key={project.id}>
                  <div className="home-project-image">
                    <Image unoptimized={Boolean(photo)} src={photo || illustration} fill alt="" sizes={index === 0 ? "(min-width: 1200px) 740px, (min-width: 768px) 58vw, 100vw" : "(min-width: 1200px) 520px, (min-width: 768px) 40vw, 100vw"} />
                    {!photo && <span className="home-image-label">Illustrative image</span>}
                    <span className="home-project-arrow" aria-hidden="true"><ArrowUpRight size={20} /></span>
                  </div>
                  <div className="flex items-start justify-between gap-4 border-b border-[#cdc5b5] py-4">
                    <div>
                      <h3 className="font-display text-[clamp(1.875rem,3vw,3rem)] leading-none">{project.projectName}</h3>
                      <p className="mt-2 text-sm text-[#584e40]">{project.location}</p>
                    </div>
                    <p className="home-kicker pt-1 text-right text-[#71532b]">{projectType(project.projectType)}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <Link href="/our-works" className="home-empty-project">
            <Image src="/images/home/villa.webp" fill alt="" sizes="100vw" />
            <span className="home-image-label">Illustrative image</span>
            <span>Explore the portfolio <ArrowUpRight size={22} aria-hidden="true" /></span>
          </Link>
        )}
      </section>

      <section className="home-capability bg-[#21241e] text-[#f4f1e8]" aria-labelledby="home-services">
        <div className="home-capability-photo relative min-h-80">
          <Image src="/images/home/planning.webp" alt="Hands reviewing architectural drawings and material samples" fill sizes="(min-width: 1024px) 48vw, 100vw" />
        </div>
        <div className="home-capability-copy">
          <p className="home-kicker mb-5 text-[#e9ca91]">What we do</p>
          <h2 id="home-services" className="home-display font-display">From the drawing<br /> to the <em>detail.</em></h2>
          <ul className="mt-9 divide-y divide-white/20 border-y border-white/20">
            {capabilities.map(({ title, description }) => (
              <li key={title} className="py-5">
                <h3 className="font-display text-[1.8rem] leading-none">{title}</h3>
                <p className="mt-2 max-w-md text-sm leading-6 text-[#d7d3c7]">{description}</p>
              </li>
            ))}
          </ul>
          <Link href="/services" className="home-text-link mt-7 text-[#f1d6a5]">
            Explore our services <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="home-shell home-space" aria-labelledby="home-interiors">
        <div className="home-interior">
          <div className="home-interior-copy">
            <p className="home-kicker mb-5 text-[#71532b]">Interiors</p>
            <h2 id="home-interiors" className="home-display font-display">Space to <em>live.</em></h2>
            <p className="mt-6 max-w-sm text-base leading-7 text-[#584e40]">Explore how materials, light and proportion come together in finished spaces.</p>
            <Link href="/interior-gallery" className="home-text-link mt-7">
              View interiors <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <div className="home-interior-photo">
            <Image unoptimized={Boolean(galleryImage)} src={galleryImage || "/images/home/interior.webp"} alt={galleryImage ? "From the Macniss interior gallery" : "Illustrative living room overlooking a planted courtyard"} fill sizes="(min-width: 1200px) 800px, (min-width: 900px) 65vw, 100vw" />
            {!galleryImage && <span className="home-image-label">Illustrative image</span>}
          </div>
        </div>
      </section>

      {testimonials.length > 0 && <HomeTestimonials items={testimonials} />}

      <section id="consultation-form" className="home-enquiry scroll-mt-6 bg-[#dbc4a0]" aria-labelledby="home-contact">
        <div className="home-shell home-space home-contact-grid">
          <div>
            <p className="home-kicker mb-5 text-[#5a4328]">Project enquiries</p>
            <h2 id="home-contact" className="home-display font-display">What are you<br /> planning to <em>build?</em></h2>
            <p className="mt-6 max-w-sm text-base leading-7 text-[#483c30]">Tell us about the site, scope and timing. We can help you decide what to do next.</p>
            <p className="home-kicker mt-10 border-t border-[#978166] pt-5 text-[#55402a]">Bengaluru · Kodagu · Karnataka</p>
          </div>
          <div className="self-start border border-[#b49b77] bg-[#f9f5eb] px-5 py-7 shadow-[0_22px_70px_-42px_#53412e] sm:p-10">
            <ConsultationForm />
          </div>
        </div>
      </section>
    </main>
  );
}
