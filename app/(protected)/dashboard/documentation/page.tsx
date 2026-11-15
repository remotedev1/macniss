import Link from "next/link";
import {
  ArrowUpRight,
  BookOpenText,
  CheckCircle2,
  KeyRound,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import { AdminPageHeader } from "@/components/backOffice/navigation/admin-page-header";

type ModuleGuide = {
  id: string;
  title: string;
  purpose: string;
  route: string;
  steps: string[];
  controls: Array<[string, string]>;
  note?: string;
};

const modules: ModuleGuide[] = [
  {
    id: "consultations",
    title: "Consultations",
    purpose: "Review project enquiries submitted from the public consultation form.",
    route: "/dashboard/consultations",
    steps: [
      "Use the status filter to show all, pending, or contacted enquiries.",
      "Review the customer’s contact details, location, project notes, and submission date.",
      "Select Mark Contacted after the team has followed up.",
    ],
    controls: [
      ["Status filter", "Narrows the enquiry table without changing any records."],
      ["Mark Contacted", "Changes a pending enquiry to CONTACTED after confirmation."],
    ],
    note: "The current workflow supports PENDING and CONTACTED. Status changes are audited through the protected API.",
  },
  {
    id: "developments",
    title: "Developments",
    purpose: "Create and maintain the projects displayed in the public portfolio.",
    route: "/dashboard/projects",
    steps: [
      "Complete the required name, type, location, status, and overview fields.",
      "Press Enter in chip fields to add objectives, technologies, and social links.",
      "Add key-feature title/description pairs and upload project images.",
      "Use Edit to load a project into the form, Archive to hide it, or Delete only when permanent removal is intended.",
    ],
    controls: [
      ["Create / Update", "Validates the form and saves the development."],
      ["Add Feature", "Adds another structured key-feature row."],
      ["Image picker", "Accepts JPEG, PNG, WebP, or AVIF images up to 10 MB each."],
      ["Archive / Restore", "Controls public visibility without deleting the record."],
      ["Delete", "Permanently removes the project and attempts to remove its remote images."],
      ["Cancel", "Leaves edit mode and clears the form."],
    ],
    note: "Archive is the safer option. Permanent deletion cannot be undone from the CMS.",
  },
  {
    id: "capabilities",
    title: "Capabilities",
    purpose: "Manage services and delivery capabilities shown on the public website.",
    route: "/dashboard/solutions",
    steps: [
      "Enter a concise title and public-facing description.",
      "Optionally attach a representative image.",
      "Use the table controls to edit, archive/restore, or permanently delete a capability.",
    ],
    controls: [
      ["Status filter", "Shows all, active, or archived capabilities."],
      ["Search", "Filters capabilities by the entered text."],
      ["Edit", "Loads the selected capability into the form."],
      ["Archive / Restore", "Changes public availability while retaining content."],
      ["Delete", "Permanently removes the capability and its stored image."],
    ],
  },
  {
    id: "interior-gallery",
    title: "Interior gallery",
    purpose: "Curate the image collection used by the public interior gallery.",
    route: "/dashboard/interior-gallery",
    steps: [
      "Select one or more supported images and review the local previews.",
      "Upload a maximum of 12 images in one request.",
      "Remove individual images only after confirming they are no longer required.",
    ],
    controls: [
      ["Choose files", "Accepts JPEG, PNG, WebP, or AVIF input up to 15 MB per source image."],
      ["Upload", "Compresses images to JPEG, targets 2 MB, and adds them to the gallery."],
      ["Remove", "Deletes the remote image and removes it from the gallery record."],
    ],
  },
  {
    id: "testimonials",
    title: "Testimonials",
    purpose: "Publish and maintain customer quotes and attribution.",
    route: "/dashboard/testimonials",
    steps: [
      "Enter the customer name, role, image URL, and quote.",
      "Use Edit to correct existing content.",
      "Use Archive to remove a testimonial from active use without deleting its record.",
    ],
    controls: [
      ["Create / Update", "Saves the validated testimonial."],
      ["Status filter", "Shows all, active, or archived testimonials."],
      ["Search", "Filters the table by matching text."],
      ["Archive", "Sets the testimonial’s archived state."],
    ],
  },
  {
    id: "site-settings",
    title: "Site settings",
    purpose: "Update the stored website logo and basic SEO description/keywords.",
    route: "/dashboard/site-setting",
    steps: [
      "Choose a PNG only when the current logo must be replaced.",
      "Write a clear search description and separate keywords with commas.",
      "Select Save Changes to update the site data file.",
    ],
    controls: [
      ["Logo picker", "Replaces public/logo.png when a new PNG is supplied."],
      ["Description", "Stores the website’s SEO summary."],
      ["Keywords", "Converts comma-separated text into a keyword list."],
      ["Save Changes", "Writes the updated settings after authentication and origin checks."],
    ],
    note: "This module writes deployment files. It requires a writable server filesystem and may not persist on ephemeral hosting.",
  },
];

const apiRows = [
  ["Projects", "GET /api/projects", "Public", "List developments"],
  ["Projects", "POST /api/projects", "Session", "Create development"],
  ["Projects", "PUT/DELETE /api/projects/:id", "Session", "Update or permanently delete"],
  ["Projects", "PATCH /api/projects/:id/archive", "Session", "Archive or restore"],
  ["Capabilities", "GET /api/solutions", "Public", "List capabilities"],
  ["Capabilities", "POST /api/solutions", "Session", "Create capability"],
  ["Capabilities", "PATCH/DELETE /api/solutions/:id", "Session", "Update/archive or delete"],
  ["Testimonials", "GET /api/testimonials", "Public", "List testimonials"],
  ["Testimonials", "POST /api/testimonials", "Session", "Create testimonial"],
  ["Testimonials", "PATCH/DELETE /api/testimonials/:id", "Session", "Update or archive"],
  ["Consultations", "POST /api/consultations", "Public", "Submit an enquiry"],
  ["Consultations", "GET /api/consultations", "Session", "List/filter enquiries"],
  ["Consultations", "PATCH /api/consultations/:id", "Session", "Update status"],
  ["Interior gallery", "GET /api/interior-gallery", "Public", "Read gallery"],
  ["Interior gallery", "PATCH /api/interior-gallery", "Session", "Upload images"],
  ["Interior gallery", "DELETE /api/interior-gallery/:fileId", "Session", "Delete image"],
  ["Uploads", "GET /api/imagekit-auth", "Session", "Issue upload authentication"],
];

function GuideSection({ guide }: { guide: ModuleGuide }) {
  return (
    <section id={guide.id} className="scroll-mt-24 border border-border bg-card text-card-foreground">
      <div className="border-b border-border p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="font-display text-3xl tracking-[-.035em]">{guide.title}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{guide.purpose}</p>
          </div>
          <Link href={guide.route} className="inline-flex shrink-0 items-center gap-2 text-[10px] font-semibold uppercase tracking-[.15em] text-foreground underline underline-offset-4">
            Open module <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
      <div className="grid gap-8 p-5 sm:p-6 lg:grid-cols-2">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[.16em]">Recommended workflow</h3>
          <ol className="mt-4 space-y-3">
            {guide.steps.map((step, index) => (
              <li key={step} className="flex gap-3 text-sm leading-6">
                <span className="grid h-6 w-6 shrink-0 place-items-center border border-border text-[10px] font-semibold">{index + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[.16em]">Controls</h3>
          <dl className="mt-4 divide-y divide-border border-y border-border">
            {guide.controls.map(([control, description]) => (
              <div key={control} className="grid gap-1 py-3 sm:grid-cols-[130px_1fr] sm:gap-4">
                <dt className="text-sm font-semibold">{control}</dt>
                <dd className="text-sm leading-6 text-muted-foreground">{description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      {guide.note && (
        <div className="flex gap-3 border-t border-border bg-muted/35 p-4 text-sm leading-6 sm:px-6">
          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-brass-700" />
          <p>{guide.note}</p>
        </div>
      )}
    </section>
  );
}

export default function DocumentationPage() {
  return (
    <>
      <AdminPageHeader
        eyebrow="Help centre"
        title="CMS documentation"
        description="A practical guide to authentication, dashboard controls, content workflows, uploads, account security, and API access."
        publicHref="/api/openapi"
        publicLabel="Open API reference"
      />

      <div className="grid gap-8 xl:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="h-fit border border-border bg-card p-5 text-card-foreground xl:sticky xl:top-6">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.16em]"><BookOpenText className="h-4 w-4" /> Contents</div>
          <nav className="mt-4 space-y-1 text-sm" aria-label="Documentation sections">
            <a className="block py-1.5 text-muted-foreground hover:text-foreground" href="#getting-started">Getting started</a>
            <a className="block py-1.5 text-muted-foreground hover:text-foreground" href="#dashboard-controls">Dashboard controls</a>
            {modules.map((module) => <a key={module.id} className="block py-1.5 text-muted-foreground hover:text-foreground" href={`#${module.id}`}>{module.title}</a>)}
            <a className="block py-1.5 text-muted-foreground hover:text-foreground" href="#account-security">Account security</a>
            <a className="block py-1.5 text-muted-foreground hover:text-foreground" href="#api-reference">API reference</a>
            <a className="block py-1.5 text-muted-foreground hover:text-foreground" href="#troubleshooting">Troubleshooting</a>
          </nav>
        </aside>

        <div className="min-w-0 space-y-8">
          <section id="getting-started" className="scroll-mt-24 border border-border bg-card p-5 text-card-foreground sm:p-6">
            <div className="flex items-center gap-3"><KeyRound className="h-5 w-5 text-brass-700" /><h2 className="font-display text-3xl tracking-[-.035em]">Authentication and first access</h2></div>
            <div className="mt-5 grid gap-5 md:grid-cols-3">
              {[
                ["First run", "When no CMS user exists, /setup creates the initial account. Setup closes permanently after the first user is created."],
                ["Sign in", "Use the email and password supplied by an administrator. Successful login creates a seven-day JWT plus a database-backed session."],
                ["Session checks", "Protected pages reject deleted, inactive, suspended, locked, expired, revoked, or otherwise invalid sessions."],
              ].map(([title, text]) => <div key={title} className="border border-border bg-background p-4"><h3 className="font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p></div>)}
            </div>
            <div className="mt-5 flex gap-3 border border-border bg-muted/35 p-4 text-sm leading-6"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brass-700" /><p>Never share passwords or session cookies. Sign out on shared devices and revoke unfamiliar sessions from Account → Sessions.</p></div>
          </section>

          <section id="dashboard-controls" className="scroll-mt-24 border border-border bg-card p-5 text-card-foreground sm:p-6">
            <h2 className="font-display text-3xl tracking-[-.035em]">Dashboard controls</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                ["Sidebar", "Navigate between overview, enquiries, website content, documentation, and account tools. On smaller screens, use the menu button."],
                ["View website", "Opens the public site in a new tab so content changes can be reviewed."],
                ["Theme switch", "Choose Light, Dark, or System. The preference is stored in this browser."],
                ["Profile menu", "Review the signed-in identity and access account/logout controls."],
                ["Validation messages", "Red text under a field explains what must be corrected before submission."],
                ["Confirmation dialogs", "Destructive or status-changing actions ask for confirmation. Read the action carefully before continuing."],
              ].map(([title, text]) => <div key={title} className="flex gap-3 border-t border-border pt-4"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brass-700" /><div><h3 className="text-sm font-semibold">{title}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{text}</p></div></div>)}
            </div>
          </section>

          {modules.map((guide) => <GuideSection key={guide.id} guide={guide} />)}

          <section id="account-security" className="scroll-mt-24 border border-border bg-card p-5 text-card-foreground sm:p-6">
            <h2 className="font-display text-3xl tracking-[-.035em]">Account security</h2>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div><h3 className="font-semibold">Change password</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Enter the current password and a new password of at least 12 characters containing upper/lowercase letters, a number, and a symbol. A successful change revokes all sessions.</p></div>
              <div><h3 className="font-semibold">Manage sessions</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Review device, IP, and expiry information. Revoke one session, all other sessions, or every session. Revoking the current session signs the browser out.</p></div>
              <div><h3 className="font-semibold">Forgot password</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">The reset form always returns a neutral message. Valid accounts receive a time-limited reset link, and completing reset revokes existing sessions.</p></div>
              <div><h3 className="font-semibold">Login protection</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Repeated failures are rate-limited and may temporarily lock the account. Contact an administrator if access cannot be recovered.</p></div>
            </div>
          </section>

          <section id="api-reference" className="scroll-mt-24 border border-border bg-card text-card-foreground">
            <div className="flex flex-col gap-4 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div><h2 className="font-display text-3xl tracking-[-.035em]">API reference</h2><p className="mt-2 text-sm text-muted-foreground">Public endpoints support the website. Session endpoints require the Auth.js cookie and reject anonymous requests.</p></div>
              <Link href="/api/openapi" target="_blank" className="inline-flex items-center gap-2 border border-border px-4 py-2 text-[10px] font-semibold uppercase tracking-[.14em] hover:border-foreground">OpenAPI 3.1 JSON <ArrowUpRight className="h-3.5 w-3.5" /></Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="bg-muted/40 text-[10px] uppercase tracking-[.14em]"><tr><th className="p-3 sm:px-5">Module</th><th className="p-3 sm:px-5">Endpoint</th><th className="p-3 sm:px-5">Access</th><th className="p-3 sm:px-5">Purpose</th></tr></thead>
                <tbody className="divide-y divide-border">{apiRows.map(([module, endpoint, access, purpose]) => <tr key={`${endpoint}-${purpose}`}><td className="p-3 font-medium sm:px-5">{module}</td><td className="p-3 font-mono text-xs sm:px-5">{endpoint}</td><td className="p-3 sm:px-5"><span className="border border-border px-2 py-1 text-[10px] uppercase tracking-[.12em]">{access}</span></td><td className="p-3 text-muted-foreground sm:px-5">{purpose}</td></tr>)}</tbody>
              </table>
            </div>
          </section>

          <section id="troubleshooting" className="scroll-mt-24 border border-border bg-card p-5 text-card-foreground sm:p-6">
            <h2 className="font-display text-3xl tracking-[-.035em]">Troubleshooting</h2>
            <div className="mt-5 space-y-4 text-sm leading-6">
              <details className="border border-border p-4"><summary className="cursor-pointer font-semibold">A save action is rejected</summary><p className="mt-3 text-muted-foreground">Check required fields and validation messages, confirm the session is still active, then retry. For uploads, verify file type and size.</p></details>
              <details className="border border-border p-4"><summary className="cursor-pointer font-semibold">An image does not upload</summary><p className="mt-3 text-muted-foreground">Use JPEG, PNG, WebP, or AVIF. Standard project/capability uploads allow up to 10 MB. Interior sources allow up to 15 MB and must compress below 2 MB.</p></details>
              <details className="border border-border p-4"><summary className="cursor-pointer font-semibold">The dashboard returns to login</summary><p className="mt-3 text-muted-foreground">The session may be expired, revoked, or invalid. Sign in again. If it repeats, clear site cookies and ask an administrator to review active sessions/account status.</p></details>
              <details className="border border-border p-4"><summary className="cursor-pointer font-semibold">A public change is not visible</summary><p className="mt-3 text-muted-foreground">Confirm the record is not archived, refresh the public page, and verify the correct module was edited. Image delivery may also be briefly cached.</p></details>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
