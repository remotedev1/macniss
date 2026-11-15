import ConsultationsTable from "@/components/backOffice/features/Consultation-table";
import { AdminPageHeader } from "@/components/backOffice/navigation/admin-page-header";

export default function ConsultationDashboard() {
  return <>
    <AdminPageHeader eyebrow="Lead management" title="Project enquiries" description="Review incoming consultation requests and keep the follow-up status current for the project team." publicHref="/contact" publicLabel="View enquiry page" />
    <ConsultationsTable />
  </>;
}
