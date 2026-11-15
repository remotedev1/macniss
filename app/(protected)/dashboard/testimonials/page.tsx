import TestimonialsTable from "@/components/backOffice/features/Testimonial-table";
import { AdminPageHeader } from "@/components/backOffice/navigation/admin-page-header";

export default function TestimonialsDashboard() {
  return <>
    <AdminPageHeader eyebrow="Brand proof" title="Testimonials" description="Curate client quotes and proof points used across the public experience." publicHref="/" publicLabel="View website" />
    <TestimonialsTable />
  </>;
}
