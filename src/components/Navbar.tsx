"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/weather", label: "Weather" },
  { href: "/events", label: "Events" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="tricolour-bar h-1 w-full" />

      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-extrabold">
          <span className="flex h-7 w-7 overflow-hidden rounded-md ring-1 ring-black/5">
            <span className="h-full w-1/3 bg-nl-green" />
            <span className="h-full w-1/3 bg-white" />
            <span className="h-full w-1/3 bg-nl-pink" />
          </span>
          St. John&apos;s
        </Link>

        <ul className="hidden gap-6 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="font-semibold text-nl-ink/70 transition-colors hover:text-nl-green-700"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="text-2xl leading-none md:hidden"
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {open && (
        <ul className="flex flex-col gap-1 border-t border-black/5 px-4 py-2 md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 font-semibold text-nl-ink/80 hover:bg-black/5"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
