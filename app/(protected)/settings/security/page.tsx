import Link from "next/link";
import { KeyRound, MonitorSmartphone } from "lucide-react";
import { AdminPageHeader } from "@/components/backOffice/navigation/admin-page-header";

export default function SecurityPage() {
  return (
    <>
      <AdminPageHeader eyebrow="Account" title="Security settings" description="Manage your password and signed-in devices." publicHref={undefined} />
      <div className="cms-work-grid">
        <Link className="cms-work-link" href="/auth/change-password">
          <span className="cms-work-icon"><KeyRound size={19} aria-hidden="true" /></span>
          <strong>Change password</strong>
        </Link>
        <Link className="cms-work-link" href="/settings/sessions">
          <span className="cms-work-icon"><MonitorSmartphone size={19} aria-hidden="true" /></span>
          <strong>Manage active sessions</strong>
        </Link>
      </div>
    </>
  );
}
