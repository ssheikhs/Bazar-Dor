export default function SectionHeader({ id, icon, iconClass = "", title, subtitle }) {
  return (
    <div id={id} className="scroll-mt-40 mb-5">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        {icon && <span className={`text-lg ${iconClass}`} aria-hidden>{icon}</span>}
        {title}
      </h2>
      {subtitle && <p className="mt-1 text-sm opacity-70">{subtitle}</p>}
    </div>
  );
}
