import { ArrowDown, Check, Copy, Users } from "lucide-react";
import { useCopy, SERVER_IP } from "../../hooks/use-copy";
import { useServerStatus } from "../../queries/server";

const ticker = [
  "Java Edition 1.21.4",
  "No bullying — ever",
  "Staff applications always open",
  "Partnered with clients & servers",
  "Custom commands & scripts",
  "Staff reports go straight to the owners",
  "We actually listen",
];

const cubes = [
  { l: "8%", t: "22%", s: 26, c: "bg-emerald/80", d: "0s", r: "12deg" },
  { l: "86%", t: "18%", s: 18, c: "bg-cyan/70", d: "1.2s", r: "-8deg" },
  { l: "72%", t: "62%", s: 34, c: "bg-emerald/40", d: "2.4s", r: "20deg" },
  { l: "46%", t: "12%", s: 12, c: "bg-gold/70", d: "3s", r: "5deg" },
  { l: "93%", t: "48%", s: 14, c: "bg-lapis/70", d: "0.6s", r: "30deg" },
];

export function Hero() {
  const { copied, copy } = useCopy();
  const { data } = useServerStatus();

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <div className="absolute inset-0">
        <img src="/images/hero.jpg" alt="" className="h-full w-full scale-105 object-cover object-[65%_center]" />
        <div className="absolute inset-0 bg-gradient-to-r from-void via-void/75 to-void/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/50" />
        <div className="pixel-grid absolute inset-0 opacity-60" />
      </div>
      <div className="scanlines pointer-events-none absolute inset-0" />

      {cubes.map((c, i) => (
        <span
          key={i}
          className={`cube absolute hidden md:block ${c.c}`}
          style={
            {
              left: c.l,
              top: c.t,
              width: c.s,
              height: c.s,
              animationDelay: c.d,
              "--r": c.r,
              boxShadow: "inset -4px -4px 0 rgba(0,0,0,.35), 0 0 30px rgba(61,255,176,.35)",
            } as React.CSSProperties
          }
        />
      ))}

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pt-28 pb-16 md:px-8">
        <div className="rise mb-6 flex flex-wrap items-center gap-3 font-mono text-[11px] tracking-[0.25em] text-muted-ink uppercase" style={{ animationDelay: ".05s" }}>
          <span className="flex items-center gap-2 border border-line bg-void/60 px-3 py-1.5 backdrop-blur">
            <span className={`live-dot h-2 w-2 rounded-full ${data?.online === false ? "bg-redstone" : "bg-emerald"}`} />
            {data ? (data.online ? "Server online" : "Server offline") : "Pinging server…"}
          </span>
          <span className="border border-line bg-void/60 px-3 py-1.5 backdrop-blur">Java {data?.version ?? "1.21.4"}</span>
          <span className="hidden border border-line bg-void/60 px-3 py-1.5 backdrop-blur sm:inline">Survival community</span>
        </div>

        <h1 className="font-display leading-[0.82] font-bold">
          <span className="rise block" style={{ animationDelay: ".15s" }}>
            <span className="glitch glow-text block text-[22vw] text-emerald md:text-[13rem]">EVBB</span>
          </span>
          <span className="rise text-stroke block text-[13vw] tracking-wide md:text-[7.5rem]" style={{ animationDelay: ".3s" }}>
            REVIVAL
          </span>
        </h1>

        <p className="rise mt-8 max-w-xl text-lg leading-relaxed text-ink/80 md:text-xl" style={{ animationDelay: ".45s" }}>
          The server is back, and it's better. A friendly crew, staff who actually pass your reports up to the owners, partnerships across
          clients and servers, and a big pile of custom commands and scripts.
        </p>

        <div className="rise mt-10 flex flex-col gap-4 sm:flex-row sm:items-stretch" style={{ animationDelay: ".6s" }}>
          <button
            onClick={copy}
            className="notch group flex items-center justify-between gap-6 border border-emerald/40 bg-void/80 px-5 py-4 text-left backdrop-blur transition hover:border-emerald"
          >
            <div>
              <div className="font-mono text-[10px] tracking-[0.3em] text-muted-ink uppercase">Server address</div>
              <div className="mt-1 font-mono text-2xl font-semibold text-ink">
                <span className="text-emerald">&gt;</span> {SERVER_IP}
                <span className="caret text-emerald">_</span>
              </div>
            </div>
            <span className="flex h-11 w-11 items-center justify-center bg-emerald text-void">
              {copied ? <Check size={20} /> : <Copy size={20} />}
            </span>
          </button>
          <a
            href="#join"
            className="notch btn-block flex items-center justify-center gap-3 bg-emerald px-8 py-4 font-display text-xl font-bold text-void"
          >
            PLAY NOW
          </a>
        </div>
        {copied && <div className="mt-3 font-mono text-xs text-emerald">Copied. Paste it into Multiplayer → Add Server.</div>}

        <div className="rise mt-12 flex items-center gap-4" style={{ animationDelay: ".75s" }}>
          <div className="flex shrink-0 -space-x-2">
            {(data?.players.list ?? []).slice(0, 5).map((p) => (
              <img
                key={p.uuid}
                src={`https://mc-heads.net/avatar/${p.uuid}/40`}
                alt={p.name}
                title={p.name}
                className="h-10 w-10 border-2 border-void"
                style={{ imageRendering: "pixelated" }}
              />
            ))}
            {!data?.players.list.length && (
              <span className="flex h-10 w-10 items-center justify-center border border-line bg-deep text-muted-ink">
                <Users size={16} />
              </span>
            )}
          </div>
          <div className="font-mono text-sm text-muted-ink">
            <span className="font-semibold text-ink">{data?.players.online ?? "—"}</span>
            {data?.players.max ? ` / ${data.players.max}` : ""} players online right now
          </div>
        </div>
      </div>

      <a href="#live" className="relative mx-auto mb-6 hidden animate-bounce text-muted-ink md:block" aria-label="Scroll">
        <ArrowDown />
      </a>

      <div className="relative overflow-hidden border-y border-line bg-emerald py-3 text-void">
        <div className="marquee flex w-max gap-10 whitespace-nowrap font-display text-lg font-bold">
          {[...ticker, ...ticker].map((t, i) => (
            <span key={i} className="flex items-center gap-10">
              {t}
              <span className="inline-block h-3 w-3 bg-void" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
