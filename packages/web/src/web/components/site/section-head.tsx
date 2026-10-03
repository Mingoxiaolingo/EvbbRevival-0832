export function SectionHead({
  kicker,
  title,
  sub,
  align = "left",
}: {
  kicker: string;
  title: React.ReactNode;
  sub?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`reveal mb-12 max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <div
        className={`mb-4 flex items-center gap-3 font-mono text-xs tracking-[0.3em] text-emerald uppercase ${align === "center" ? "justify-center" : ""}`}
      >
        <span className="inline-block h-2 w-2 bg-emerald" />
        {kicker}
      </div>
      <h2 className="font-display text-4xl leading-[1.05] font-bold text-ink md:text-6xl">{title}</h2>
      {sub && <p className="mt-5 text-lg leading-relaxed text-muted-ink">{sub}</p>}
    </div>
  );
}
