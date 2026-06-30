"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import TricolourBar from "@/components/TricolourBar";

const links = [
  { href: "/", label: "Home" },
  { href: "/weather", label: "Weather" },
  { href: "/events", label: "Events" },
];

function NstClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    function update() {
      setTime(
        new Date().toLocaleTimeString("en-CA", {
          timeZone: "America/St_Johns",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    }
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  if (!time) {
    return null;
  }

  return (
    <span className="text-xs font-semibold tracking-wide text-nl-pink-100">
      Updated {time} NST
    </span>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-nl-green-900 text-white shadow-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-base font-extrabold leading-tight text-white sm:text-lg"
        >
          <span className="flex h-7 w-10 shrink-0 overflow-hidden rounded ring-1 ring-white/20">
            <span className="h-full w-1/3 bg-nl-green" />
            <span className="h-full w-1/3 bg-white" />
            <span className="h-full w-1/3 bg-nl-pink" />
          </span>
          Newfoundland Travel Advisory
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <ul className="flex gap-6">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="font-semibold text-white/75 transition-colors hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <NstClock />
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="text-2xl leading-none text-white md:hidden"
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {open && (
        <ul className="flex flex-col gap-1 border-t border-white/10 px-4 py-2 md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 font-semibold text-white/80 hover:bg-white/10"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <TricolourBar />
    </header>
  );
}