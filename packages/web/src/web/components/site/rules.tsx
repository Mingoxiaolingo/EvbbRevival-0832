import { SectionHead } from "./section-head";

const rules = [
  ["Be kind", "No bullying, harassment, slurs or hate. This is the big one."],
  ["No cheating", "No hacked clients, x-ray, or exploits for an unfair edge. Partnered clients are fine within their allowed features."],
  ["No griefing", "Don't break, steal from, or mess with builds that aren't yours."],
  ["Keep chat clean", "No spam, no flooding, no advertising other servers without permission."],
  ["Respect staff", "Staff decisions can be appealed calmly. Arguing in public chat won't help."],
  ["Report, don't retaliate", "Got a problem with someone? Use /report. Staff take it to the owners."],
];

export function Rules() {
  return (
    <section id="rules" className="relative overflow-hidden px-5 py-28 md:px-8">
      <div className="pointer-events-none absolute right-0 bottom-0 h-[400px] w-[600px] rounded-full bg-cyan/10 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHead
          kicker="Server rules"
          title={
            <>
              Six rules. <span className="text-stroke">That's it.</span>
            </>
          }
          sub="Short list, enforced seriously. Breaking them can get you muted, kicked or banned depending on how bad it is."
        />
        <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {rules.map(([t, b], i) => (
            <li
              key={t}
              className="reveal notch panel group flex gap-5 p-7 transition hover:border-cyan/50"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-cyan/40 font-display text-2xl font-bold text-cyan transition group-hover:bg-cyan group-hover:text-void">
                {i + 1}
              </span>
              <div>
                <h3 className="font-display text-xl font-bold">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-ink">{b}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
