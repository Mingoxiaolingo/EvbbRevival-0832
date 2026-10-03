import { useState } from "react";
import { Plus } from "lucide-react";
import { SectionHead } from "./section-head";

const faqs = [
  ["What's the server IP?", "evbb.online. Add it under Multiplayer → Add Server in Minecraft: Java Edition."],
  ["Which version do I need?", "The server runs Java 1.21.4. That's the version to pick in your launcher for the best experience."],
  ["Can I join on Bedrock / mobile / console?", "Not right now. Evbb is Java Edition only."],
  ["Is it free?", "Yes. Joining and playing is completely free."],
  ["How many people can be on at once?", "There are 20 slots. The live panel above shows how many are taken right now."],
  ["Someone is being rude. What do I do?", "Use /report in-game or tell any staff member. Staff pass reports straight to the owners, and bullying isn't tolerated."],
  ["How do I become staff?", "Fill in the application form on this page. Applications are always open, all year."],
  ["Can my server or client partner with Evbb?", "Very likely. Evbb already partners with many clients and servers. Reach out to staff in-game to start the conversation."],
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="px-5 py-28 md:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionHead kicker="FAQ" title={<>Questions, <span className="text-emerald">answered.</span></>} align="center" />
        <div className="divide-y divide-line border-y border-line">
          {faqs.map(([q, a], i) => (
            <div key={q} className="reveal">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
                aria-expanded={open === i}
              >
                <span className={`font-display text-xl font-bold transition md:text-2xl ${open === i ? "text-emerald" : "text-ink"}`}>{q}</span>
                <Plus className={`shrink-0 text-emerald transition-transform duration-300 ${open === i ? "rotate-45" : ""}`} />
              </button>
              <div className={`grid transition-all duration-300 ${open === i ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"}`}>
                <p className="overflow-hidden pr-10 text-lg leading-relaxed text-muted-ink">{a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
