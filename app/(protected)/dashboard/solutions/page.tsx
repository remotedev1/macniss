import SolutionsDashboard from "@/components/backOffice/features/solutions-table";
import { AdminPageHeader } from "@/components/backOffice/navigation/admin-page-header";

export default function SolutionsDashboardPage() {
  return <>
    <AdminPageHeader eyebrow="Capability management" title="Services & capabilities" description="Manage the service lines shown across the Macniss public website." publicHref="/services" publicLabel="View services" />
    <SolutionsDashboard />
  </>;
}
