import { useState } from "react";
import { Crown, Send, CheckCircle2 } from "lucide-react";
import { SectionHead } from "./section-head";
import { useSubmitApplication } from "../../queries/server";

const OWNER_UUID = "d14ffe30-06e8-4a57-9d99-5e71b77a5ccd";
const ROLES = ["Helper", "Moderator", "Builder", "Developer"] as const;
type Role = (typeof ROLES)[number];

const roleInfo: Record<Role, string> = {
  Helper: "Answer questions, welcome new players, pass reports up the chain.",
  Moderator: "Keep chat and gameplay fair. Handle reports and enforce the rules.",
  Builder: "Design spawn, event arenas and server builds.",
  Developer: "Write the plugins, scripts and commands that make Evbb unique.",
};

const empty = { username: "", discord: "", age: "", role: "Helper" as Role, timezone: "", experience: "", why: "" };

export function Staff() {
  const [f, setF] = useState(empty);
  const submit = useSubmitApplication();
  const set = (k: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setF({ ...f, [k]: e.target.value });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit.mutate({ ...f, age: Number(f.age) }, { onSuccess: () => setF(empty) });
  };

  const field = "w-full border border-line bg-void/70 px-4 py-3 font-mono text-sm text-ink placeholder:text-muted-ink/50 focus:border-emerald focus:outline-none";
  const label = "mb-2 block font-mono text-[10px] tracking-[0.25em] text-muted-ink uppercase";

  return (
    <section id="staff" className="relative border-y border-line bg-deep px-5 py-28 md:px-8">
      <div className="pixel-grid absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHead
          kicker="The team"
          title={
            <>
              Run by players,
              <br />
              <span className="text-emerald">for players.</span>
            </>
          }
          sub="Staff applications never close. If you're kind, active and want to help, there's a spot for you."
        />

        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-5">
            <div className="reveal notch relative flex items-end gap-6 overflow-hidden border border-gold/40 bg-gradient-to-br from-gold/15 to-transparent p-7">
              <img
                src={`https://mc-heads.net/body/${OWNER_UUID}/160`}
                alt="NickWack11's skin"
                className="h-40 w-auto drop-shadow-[0_0_30px_rgba(255,210,74,.35)]"
                style={{ imageRendering: "pixelated" }}
              />
              <div className="pb-2">
                <span className="flex w-fit items-center gap-2 bg-gold px-2 py-1 font-mono text-[10px] font-bold text-void">
                  <Crown size={12} /> OWNER
                </span>
                <div className="mt-3 font-display text-3xl font-bold">NickWack11</div>
                <p className="mt-2 text-sm text-muted-ink">Runs the server. Every staff report lands here.</p>
              </div>
            </div>

            <div className="grid gap-px bg-line sm:grid-cols-2">
              {ROLES.map((r) => (
                <button
                  type="button"
                  key={r}
                  onClick={() => {
                    setF({ ...f, role: r });
                    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "center" });
                  }}
                  className={`reveal group bg-deep p-6 text-left transition hover:bg-deep-2 ${f.role === r ? "outline outline-1 -outline-offset-1 outline-emerald" : ""}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xl font-bold">{r}</span>
                    <span className="flex items-center gap-1.5 font-mono text-[10px] text-emerald">
                      <span className="live-dot h-1.5 w-1.5 rounded-full bg-emerald" /> OPEN
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-ink">{roleInfo[r]}</p>
                </button>
              ))}
            </div>
          </div>

          <form id="apply" onSubmit={onSubmit} className="reveal notch panel p-7 md:p-9">
            <div className="mb-7 flex items-baseline justify-between">
              <h3 className="font-display text-3xl font-bold">Apply for staff</h3>
              <span className="font-mono text-xs text-muted-ink">~3 min</span>
            </div>

            {submit.isSuccess ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle2 size={56} className="text-emerald" />
                <div className="mt-5 font-display text-3xl font-bold">Application sent!</div>
                <p className="mt-3 max-w-sm text-muted-ink">
                  Ticket #{submit.data.id} is in. The team will reach out on Discord. Keep playing in the meantime.
                </p>
                <button type="button" onClick={() => submit.reset()} className="mt-6 font-mono text-xs text-emerald underline">
                  Submit another
                </button>
              </div>
            ) : (
              <div className="grid gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="app-1" className={label}>Minecraft username</label>
                    <input id="app-1" aria-label="Minecraft username" required minLength={3} maxLength={16} pattern="[A-Za-z0-9_]+" value={f.username} onChange={set("username")} placeholder="Steve" className={field} />
                  </div>
                  <div>
                    <label htmlFor="app-2" className={label}>Discord</label>
                    <input id="app-2" aria-label="Discord" required minLength={2} value={f.discord} onChange={set("discord")} placeholder="steve#0001 / @steve" className={field} />
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-3">
                  <div>
                    <label htmlFor="app-3" className={label}>Age</label>
                    <input id="app-3" aria-label="Age" required type="number" min={10} max={99} value={f.age} onChange={set("age")} placeholder="16" className={field} />
                  </div>
                  <div>
                    <label htmlFor="app-4" className={label}>Role</label>
                    <select id="app-4" aria-label="Role" value={f.role} onChange={set("role")} className={field}>
                      {ROLES.map((r) => (
                        <option key={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="app-5" className={label}>Timezone</label>
                    <input id="app-5" aria-label="Timezone" required value={f.timezone} onChange={set("timezone")} placeholder="GMT+1" className={field} />
                  </div>
                </div>
                <div>
                  <label htmlFor="app-6" className={label}>Past experience</label>
                  <textarea id="app-6" aria-label="Past experience" required minLength={10} rows={3} value={f.experience} onChange={set("experience")} placeholder="Servers you've staffed on, plugins you've built, anything relevant…" className={field} />
                </div>
                <div>
                  <label htmlFor="app-7" className={label}>Why Evbb?</label>
                  <textarea id="app-7" aria-label="Why Evbb?" required minLength={20} rows={4} value={f.why} onChange={set("why")} placeholder="What would you bring to the team?" className={field} />
                </div>
                {submit.isError && (
                  <div className="border border-redstone/50 bg-redstone/10 px-4 py-3 font-mono text-xs text-redstone">
                    Couldn't send that. Check your answers and try again.
                  </div>
                )}
                <button
                  disabled={submit.isPending}
                  className="notch btn-block flex items-center justify-center gap-3 bg-emerald px-6 py-4 font-display text-xl font-bold text-void disabled:opacity-60"
                >
                  <Send size={18} /> {submit.isPending ? "SENDING…" : "SUBMIT APPLICATION"}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
