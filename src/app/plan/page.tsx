"use client";

import Gallery from "@/components/Gallery";
import Checklist from "@/components/Checklist";

const gallery = [
  { src: "/images/jellybean-row.svg", title: "Jellybean Row" },
  { src: "/images/signal-hill.svg", title: "Signal Hill" },
  { src: "/images/cape-spear.svg", title: "Cape Spear" },
  { src: "/images/the-narrows.svg", title: "The Narrows" },
];

const checklist = [
  "Layer up, the weather turns on a dime out here.",
  "Check out Signal Hill and Cape Spear.",
  "Check ferry and road advisories before day trips.",
  "Carry cash for smaller shops and the farmers' market.",
  "Grab a Metrobus day pass to get around town.",
  "Catch a kitchen party on George Street after dark.",
];

export default function Plan() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
        Plan Your <span className="text-tricolour">Trip</span>
      </h1>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-extrabold">Where to wander</h2>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {gallery.map((g) => (
            <Gallery key={g.title} src={g.src} title={g.title} />
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-extrabold">
          Newfoundland travel checklist
        </h2>
        <ul className="mt-5 space-y-3">
          {checklist.map((item, i) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-xl border border-black/5 bg-white p-4 shadow-sm"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-nl-green-50 text-xs font-bold text-nl-green-700">
                {i + 1}
              </span>
              <span className="text-sm">{item}</span>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => window.print()}
          className="mt-6 rounded-full bg-nl-green px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-nl-green-700"
        >
          Print this checklist
        </button>
      </section>
    </div>
  );
}
