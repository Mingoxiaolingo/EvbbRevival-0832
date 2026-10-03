import { RefreshCw } from "lucide-react";
import { useServerStatus } from "../../queries/server";
import { SectionHead } from "./section-head";

function ago(ts?: number) {
  if (!ts) return "—";
  const s = Math.max(0, Math.round((Date.now() - ts) / 1000));
  return s < 60 ? `${s}s ago` : `${Math.round(s / 60)}m ago`;
}

export function Live() {
  const { data, isLoading, refetch, isFetching } = useServerStatus();
  const max = data?.players.max || 20;
  const online = data?.players.online ?? 0;
  const pct = Math.round((online / max) * 100);

  return (
    <section id="live" className="relative px-5 py-28 md:px-8">
      <div className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-emerald/10 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHead
          kicker="Live from the server"
          title={
            <>
              Real players. <span className="text-emerald">Right now.</span>
            </>
          }
          sub="This panel pings evbb.online every minute. No fake numbers — what you see is who's actually on."
        />

        <div className="reveal grid gap-5 lg:grid-cols-[1.25fr_1fr]">
          <div className="notch panel p-6 md:p-8">
            <div className="mb-8 flex items-center justify-between font-mono text-xs text-muted-ink">
              <span className="flex items-center gap-2">
                <span className={`live-dot h-2.5 w-2.5 rounded-full ${data?.online === false ? "bg-redstone" : "bg-emerald"}`} />
                {isLoading ? "PINGING…" : data?.online ? "STATUS: ONLINE" : "STATUS: OFFLINE"}
              </span>
              <button onClick={() => refetch()} className="flex items-center gap-2 hover:text-emerald">
                <RefreshCw size={13} className={isFetching ? "animate-spin" : ""} />
                updated {ago(data?.fetchedAt)}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-px bg-line md:grid-cols-4">
              {[
                ["Online", isLoading ? "…" : String(online)],
                ["Slots", String(max)],
                ["Version", data?.version ?? "1.21.4"],
                ["Edition", "Java"],
              ].map(([k, v]) => (
                <div key={k} className="bg-deep p-5">
                  <div className="font-mono text-[10px] tracking-[0.3em] text-muted-ink uppercase">{k}</div>
                  <div className="mt-2 font-display text-4xl font-bold text-ink">{v}</div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <div className="mb-3 flex justify-between font-mono text-xs text-muted-ink">
                <span>CAPACITY</span>
                <span className="text-emerald">{pct}%</span>
              </div>
              <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${Math.min(max, 40)}, minmax(0, 1fr))` }}>
                {Array.from({ length: Math.min(max, 40) }).map((_, i) => (
                  <span
                    key={i}
                    className={`aspect-square ${i < online ? "bg-emerald shadow-[0_0_12px_rgba(61,255,176,.6)]" : "bg-deep-2"}`}
                    style={{ transitionDelay: `${i * 30}ms` }}
                  />
                ))}
              </div>
            </div>

            <div className="mt-8 border border-line bg-void/70 p-4 font-mono text-sm">
              <div className="mb-1 text-[10px] tracking-[0.3em] text-muted-ink">MOTD</div>
              <div className="text-[#AAAAAA]">
                {data?.motd ? (
                  data.motd.split(/(nickwack)/i).map((part, i) =>
                    /nickwack/i.test(part) ? (
                      <span key={i} className="text-[#5555FF]">
                        {part}
                      </span>
                    ) : (
                      <span key={i}>{part}</span>
                    ),
                  )
                ) : (
                  "Welcome to the server!"
                )}
              </div>
            </div>
          </div>

          <div className="notch panel flex flex-col p-6 md:p-8">
            <div className="mb-6 flex items-baseline justify-between">
              <h3 className="font-display text-2xl font-bold">Who's on</h3>
              <span className="font-mono text-xs text-muted-ink">{data?.players.list.length ?? 0} visible</span>
            </div>
            <div className="grid flex-1 content-start gap-2">
              {(data?.players.list ?? []).map((p, i) => (
                <div
                  key={p.uuid}
                  className="group flex items-center gap-4 border border-transparent bg-deep-2/60 p-3 transition hover:border-emerald/40 hover:bg-deep-2"
                >
                  <span className="w-5 font-mono text-xs text-muted-ink">{String(i + 1).padStart(2, "0")}</span>
                  <img
                    src={`https://mc-heads.net/avatar/${p.uuid}/48`}
                    alt=""
                    className="h-10 w-10 transition group-hover:scale-110"
                    style={{ imageRendering: "pixelated" }}
                  />
                  <span className="flex-1 font-mono text-sm text-ink">{p.name}</span>
                  {/^nickwack/i.test(p.name) && (
                    <span className="bg-gold px-2 py-0.5 font-mono text-[10px] font-bold text-void">OWNER</span>
                  )}
                  <span className="h-2 w-2 bg-emerald" />
                </div>
              ))}
              {!isLoading && !data?.players.list.length && (
                <div className="flex flex-1 flex-col items-center justify-center border border-dashed border-line p-10 text-center">
                  <div className="font-display text-xl">Nobody's on yet.</div>
                  <p className="mt-2 text-sm text-muted-ink">Be the first one in. Everyone after you will see your name here.</p>
                </div>
              )}
              {isLoading &&
                Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-16 animate-pulse bg-deep-2/60" />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
