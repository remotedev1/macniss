import InteriorGalleryTable from "@/components/backOffice/features/interior-gallery-table";
import { AdminPageHeader } from "@/components/backOffice/navigation/admin-page-header";

export default function InteriorGalleryDashboard() {
  return <>
    <AdminPageHeader eyebrow="Media library" title="Interior gallery" description="Upload and curate the interior imagery displayed in the public portfolio." publicHref="/interior-gallery" publicLabel="View gallery" />
    <InteriorGalleryTable />
  </>;
}
