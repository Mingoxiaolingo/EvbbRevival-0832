import { Check, Copy } from "lucide-react";
import { useCopy, SERVER_IP } from "../../hooks/use-copy";
import { Logo } from "./nav";

export function Footer() {
  const { copied, copy } = useCopy();
  return (
    <footer className="relative overflow-hidden">
      <div className="relative px-5 py-32 md:px-8">
        <img src="/images/hero.jpg" alt="" className="absolute inset-0 h-full w-full object-cover object-right opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-void via-void/70 to-void" />
        <div className="scanlines absolute inset-0" />
        <div className="reveal relative mx-auto max-w-5xl text-center">
          <div className="font-mono text-xs tracking-[0.3em] text-emerald">// SEE YOU AT SPAWN</div>
          <h2 className="mt-5 font-display text-5xl leading-[0.95] font-bold md:text-8xl">
            The revival
            <br />
            <span className="glow-text text-emerald">needs you.</span>
          </h2>
          <button
            onClick={copy}
            className="notch btn-block mx-auto mt-12 flex items-center gap-4 bg-emerald px-10 py-5 font-mono text-2xl font-semibold text-void"
          >
            {copied ? <Check /> : <Copy />} {copied ? "Copied!" : SERVER_IP}
          </button>
        </div>
      </div>
      <div className="border-t border-line bg-void px-5 py-10 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-3">
            <Logo size={24} />
            <span className="font-display text-lg font-bold">Evbb Revival</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 font-mono text-xs text-muted-ink">
            {["live", "features", "join", "commands", "rules", "staff", "faq"].map((s) => (
              <a key={s} href={`#${s}`} className="uppercase hover:text-emerald">
                {s}
              </a>
            ))}
          </div>
          <p className="font-mono text-[11px] text-muted-ink/70">Not affiliated with Mojang or Microsoft.</p>
        </div>
      </div>
    </footer>
  );
}
