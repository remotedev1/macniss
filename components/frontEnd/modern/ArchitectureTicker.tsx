/** Decorative architectural vocabulary; not company statistics or promises. */
export default function ArchitectureTicker() {
  const words = ['DEVELOPMENT','CONSTRUCTION','INTERIORS','DESIGN + BUILD','DEVELOPMENT','CONSTRUCTION','INTERIORS','DESIGN + BUILD'];
  return <div className="overflow-hidden border-y border-black/10 bg-[#c4ad84] py-4 text-[#191a16]" aria-label="Development, construction, interiors, design and build">
    <div className="macniss-ticker flex w-max items-center gap-10 whitespace-nowrap" aria-hidden="true">
      {[0,1].map(group => <div key={group} className="flex shrink-0 items-center gap-10">{words.map((word,i)=><span key={`${group}-${i}`} className="inline-flex items-center gap-10 text-[10px] font-bold uppercase tracking-[.31em]">{word}<span className="text-lg font-normal">✳</span></span>)}</div>)}
    </div>
  </div>;
}
