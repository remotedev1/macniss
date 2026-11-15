export default function ArchitecturalGrid({ className = "" }) {
  return <div aria-hidden="true" className={`pointer-events-none absolute inset-0 architectural-grid opacity-30 ${className}`} />;
}
