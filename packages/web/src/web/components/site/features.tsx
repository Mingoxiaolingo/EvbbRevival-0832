import { Handshake, Ear, LifeBuoy, ShieldCheck, ClipboardList, Terminal } from "lucide-react";
import { SectionHead } from "./section-head";

const items = [
  {
    icon: Ear,
    title: "Listens to its users",
    body: "Suggestions don't go into a void. Ideas from players shape what gets added, changed and fixed next.",
    tag: "COMMUNITY-DRIVEN",
  },
  {
    icon: LifeBuoy,
    title: "Great support",
    body: "Staff log your issue and report it straight to the owners, so the people who can actually fix it see it.",
    tag: "STAFF → OWNERS",
  },
  {
    icon: ShieldCheck,
    title: "No bullying",
    body: "Zero tolerance for harassment. It's a nice community and we keep it that way.",
    tag: "SAFE SPACE",
  },
  {
    icon: ClipboardList,
    title: "Staff apps always open",
    body: "No waiting for a recruitment window. Want to help run the place? Apply any time.",
    tag: "ALWAYS HIRING",
  },
  {
    icon: Terminal,
    title: "Commands & scripts",
    body: "Lots of commands and custom scripts on top of vanilla survival, for quality of life and fun.",
    tag: "CUSTOM",
  },
];

export function Features() {
  return (
    <section id="features" className="relative px-5 py-28 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHead
          kicker="Why Evbb"
          title={
            <>
              Built different.
              <br />
              <span className="text-stroke">Run better.</span>
            </>
          }
        />

        <div className="grid gap-5 md:grid-cols-6">
          {/* Big partnership card */}
          <div className="reveal notch group relative min-h-[420px] overflow-hidden md:col-span-4 md:row-span-2">
            <img
              src="/images/village.jpg"
              alt="A Minecraft village at sunset"
              className="absolute inset-0 h-full w-full object-cover transition duration-[1.5s] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void via-void/60 to-transparent" />
            <div className="relative flex h-full flex-col justify-end p-8 md:p-10">
              <span className="mb-5 flex h-14 w-14 items-center justify-center bg-emerald text-void">
                <Handshake size={28} />
              </span>
              <div className="font-mono text-xs tracking-[0.3em] text-emerald">NETWORK</div>
              <h3 className="mt-2 font-display text-4xl font-bold md:text-5xl">Partnerships with many clients and servers</h3>
              <p className="mt-4 max-w-lg text-ink/75">
                Evbb is connected. We're partnered with a bunch of clients and other servers, which means more events, more crossover and
                more people to play with.
              </p>
            </div>
          </div>

          {items.map((f, i) => (
            <div
              key={f.title}
              className={`reveal notch panel group relative overflow-hidden p-7 transition hover:-translate-y-1 hover:border-emerald/50 ${i < 2 ? "md:col-span-2" : "md:col-span-2"}`}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 bg-emerald/0 blur-2xl transition group-hover:bg-emerald/20" />
              <div className="flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center border border-emerald/40 text-emerald">
                  <f.icon size={20} />
                </span>
                <span className="font-mono text-[10px] tracking-[0.2em] text-muted-ink">{f.tag}</span>
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold">{f.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-ink">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
