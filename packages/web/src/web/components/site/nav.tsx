import { useEffect, useState } from "react";
import { Copy, Check, Menu, X } from "lucide-react";
import { useCopy, SERVER_IP } from "../../hooks/use-copy";

const links = [
  ["Live", "#live"],
  ["Features", "#features"],
  ["Join", "#join"],
  ["Commands", "#commands"],
  ["Rules", "#rules"],
  ["Staff", "#staff"],
  ["FAQ", "#faq"],
];

export function Nav() {
  const { copied, copy } = useCopy();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-line bg-void/80 backdrop-blur-xl" : "bg-transparent"}`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <a href="#top" className="group flex items-center gap-3">
          <Logo />
          <span className="font-display text-xl font-bold tracking-wide text-ink">
            EVBB<span className="text-emerald">.</span>
          </span>
        </a>
        <nav className="hidden items-center gap-1 lg:flex">
          {links.map(([l, h]) => (
            <a
              key={h}
              href={h}
              className="px-3 py-2 font-mono text-xs tracking-widest text-muted-ink uppercase transition-colors hover:text-emerald"
            >
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={copy}
            className="notch-sm btn-block hidden items-center gap-2 bg-emerald px-4 py-2 font-mono text-xs font-semibold text-void sm:flex"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "COPIED!" : SERVER_IP}
          </button>
          <button className="p-2 text-ink lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-line bg-void/95 px-5 py-4 backdrop-blur-xl lg:hidden">
          {links.map(([l, h]) => (
            <a
              key={h}
              href={h}
              onClick={() => setOpen(false)}
              className="block py-3 font-mono text-sm tracking-widest text-ink uppercase"
            >
              {l}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

export function Logo({ size = 32 }: { size?: number }) {
  // 4x4 pixel "E" block mark
  const on = [1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1];
  const px = size / 4;
  return (
    <span
      className="grid shrink-0 transition-transform group-hover:rotate-12"
      style={{ width: size, height: size, gridTemplateColumns: `repeat(4, ${px}px)` }}
    >
      {on.map((v, i) => (
        <span
          key={i}
          style={{ width: px, height: px }}
          className={v ? (i % 3 === 0 ? "bg-cyan" : "bg-emerald") : "bg-transparent"}
        />
      ))}
    </span>
  );
}
