import { Check, Copy } from "lucide-react";
import { useCopy, SERVER_IP } from "../../hooks/use-copy";
import { SectionHead } from "./section-head";

const steps = [
  { n: "01", t: "Launch Java Edition", b: "Open Minecraft: Java Edition. Pick version 1.21.4 in the launcher for the smoothest join." },
  { n: "02", t: "Hit Multiplayer", b: "From the title screen, click Multiplayer, then Add Server." },
  { n: "03", t: "Paste the IP", b: "Name it whatever you like and set the address to evbb.online." },
  { n: "04", t: "Join & say hi", b: "Click Join Server. Read /rules, then say hello in chat. Welcome home." },
];

export function Join() {
  const { copied, copy } = useCopy();
  return (
    <section id="join" className="relative overflow-hidden border-y border-line bg-deep px-5 py-28 md:px-8">
      <div className="pixel-grid absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
          <SectionHead
            kicker="How to join"
            title={
              <>
                From title screen
                <br />
                to spawn in <span className="text-emerald">30 seconds.</span>
              </>
            }
          />
          <button
            onClick={copy}
            className="reveal notch btn-block mb-12 flex items-center gap-4 bg-emerald px-7 py-5 font-mono text-xl font-semibold text-void"
          >
            {copied ? <Check /> : <Copy />} {copied ? "Copied!" : SERVER_IP}
          </button>
        </div>

        <div className="grid gap-px bg-line md:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.n} className="reveal group relative bg-deep p-8" style={{ transitionDelay: `${i * 90}ms` }}>
              <div className="font-display text-7xl font-bold text-emerald/15 transition group-hover:text-emerald/60">{s.n}</div>
              <h3 className="mt-4 font-display text-2xl font-bold">{s.t}</h3>
              <p className="mt-3 text-muted-ink">{s.b}</p>
              <span className="absolute bottom-0 left-0 h-1 w-0 bg-emerald transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>

        <div className="reveal mt-8 grid gap-4 font-mono text-sm md:grid-cols-3">
          {[
            ["Version", "Java 1.21.4"],
            ["Address", "evbb.online"],
            ["Bedrock", "Not supported (Java only)"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between border border-line bg-void/60 px-5 py-4">
              <span className="text-muted-ink">{k}</span>
              <span className="text-ink">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
