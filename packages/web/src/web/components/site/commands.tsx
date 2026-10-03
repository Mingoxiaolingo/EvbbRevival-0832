import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { SectionHead } from "./section-head";

type Cmd = { c: string; d: string };
const groups: Record<string, Cmd[]> = {
  Essentials: [
    { c: "/help", d: "Lists every command you have access to" },
    { c: "/rules", d: "Shows the server rules" },
    { c: "/spawn", d: "Teleports you back to spawn" },
    { c: "/discord", d: "Gets you the community link" },
  ],
  Teleport: [
    { c: "/sethome <name>", d: "Saves your current spot as a home" },
    { c: "/home <name>", d: "Teleports you to a saved home" },
    { c: "/tpa <player>", d: "Asks to teleport to another player" },
    { c: "/tpaccept", d: "Accepts an incoming teleport request" },
    { c: "/back", d: "Returns you to your last location" },
  ],
  Social: [
    { c: "/msg <player> <text>", d: "Sends a private message" },
    { c: "/r <text>", d: "Replies to your last message" },
    { c: "/ignore <player>", d: "Hides someone's chat from you" },
  ],
  Support: [
    { c: "/report <player> <reason>", d: "Flags a player to staff, who pass it up to the owners" },
    { c: "/helpop <text>", d: "Pings online staff for help" },
    { c: "/apply", d: "Info on applying for staff" },
  ],
};

export function Commands() {
  const tabs = Object.keys(groups);
  const [tab, setTab] = useState(tabs[0]);
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    if (!q.trim()) return groups[tab];
    const all = Object.values(groups).flat();
    return all.filter((x) => (x.c + x.d).toLowerCase().includes(q.toLowerCase()));
  }, [tab, q]);

  return (
    <section id="commands" className="relative px-5 py-28 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionHead
            kicker="Commands & scripts"
            title={
              <>
                Your <span className="text-emerald">toolbelt.</span>
              </>
            }
            sub="The commands you'll use most. On top of these, the server runs custom scripts. Type /help in-game for the full, up-to-date list."
          />
          <div className="reveal flex flex-wrap gap-2">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTab(t);
                  setQ("");
                }}
                className={`notch-sm px-4 py-2 font-mono text-xs tracking-widest uppercase transition ${tab === t && !q ? "bg-emerald text-void" : "border border-line text-muted-ink hover:text-ink"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="reveal notch overflow-hidden border border-line bg-[#070a0f]">
          <div className="flex items-center gap-2 border-b border-line bg-deep px-4 py-3">
            <span className="h-3 w-3 bg-redstone" />
            <span className="h-3 w-3 bg-gold" />
            <span className="h-3 w-3 bg-emerald" />
            <span className="ml-3 font-mono text-xs text-muted-ink">evbb@online:~/{q ? "search" : tab.toLowerCase()}</span>
          </div>
          <div className="flex items-center gap-3 border-b border-line px-5 py-4">
            <Search size={16} className="text-emerald" />
            <input
              aria-label="Search commands"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="search commands…"
              className="w-full bg-transparent font-mono text-sm text-ink placeholder:text-muted-ink/60 focus:outline-none"
            />
          </div>
          <div className="min-h-[340px] divide-y divide-line/60 font-mono">
            {list.map((x) => (
              <div key={x.c} className="group flex flex-col gap-1 px-5 py-4 transition hover:bg-emerald/5 sm:flex-row sm:items-center sm:gap-6">
                <span className="text-emerald sm:w-64 sm:shrink-0">
                  <span className="text-muted-ink/60">$ </span>
                  {x.c}
                </span>
                <span className="text-sm text-muted-ink group-hover:text-ink">{x.d}</span>
              </div>
            ))}
            {!list.length && <div className="px-5 py-10 text-sm text-muted-ink">command not found: {q}</div>}
          </div>
        </div>
      </div>
    </section>
  );
}
