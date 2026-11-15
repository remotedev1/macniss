import ProjectTable from '@/components/backOffice/features/Project-table';
import { AdminPageHeader } from '@/components/backOffice/navigation/admin-page-header';

export default function ProjectDashboard() {
  return <>
    <AdminPageHeader eyebrow="Portfolio management" title="Developments" description="Create, update and curate the projects that appear across the public development portfolio." publicHref="/our-works" publicLabel="View portfolio" />
    <ProjectTable />
  </>;
}
