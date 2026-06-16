"use client";

import { useState } from "react";

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
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
        Plan Your <span className="text-tricolour">Trip</span>
      </h1>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-extrabold">Where to wander</h2>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {gallery.map((g) => (
            <figure
              key={g.title}
              className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm"
            >
              <img src={g.src} alt={g.title} className="aspect-[8/5] w-full object-cover" />
              <figcaption className="p-4 font-semibold">{g.title}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <section>
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

        <section>
          <h2 className="font-display text-2xl font-extrabold">
            Share a spot with fellow travelers
          </h2>
          <p className="mt-2 text-sm text-nl-fog">
            Found somewhere worth knowing about? Add it to the map for the next visitor.
          </p>

          <form
            action="/api/createdestination"
            method="POST"
            className="mt-5 space-y-4 rounded-2xl border border-black/5 bg-white p-6 shadow-sm"
          >
            <label className="block">
              <span className="text-sm font-semibold">Place</span>
              <input
                type="text"
                name="place"
                placeholder="Quidi Vidi Brewery"
                className="mt-1 w-full rounded-lg border border-black/10 bg-nl-cream px-3 py-2 text-sm outline-none focus:border-nl-green"
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold">Category</span>
              <select
                name="category"
                className="mt-1 w-full rounded-lg border border-black/10 bg-nl-cream px-3 py-2 text-sm outline-none focus:border-nl-green"
              >
                <option value="see">Eat & Drink</option>
                <option value="eat">Attractions</option>
                <option value="do">Activities</option>
                <option value="see">Stay & Practical</option>
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-semibold">Info</span>
              <input
                type="text"
                name="tip"
                placeholder="Helpful information to better enjoy this spot"
                className="mt-1 w-full rounded-lg border border-black/10 bg-nl-cream px-3 py-2 text-sm outline-none focus:border-nl-green"
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold">Your name</span>
              <input
                type="text"
                name="submittedBy"
                placeholder="Optional"
                className="mt-1 w-full rounded-lg border border-black/10 bg-nl-cream px-3 py-2 text-sm outline-none focus:border-nl-green"
              />
            </label>

            <button
              type="submit"
              className="w-full rounded-full bg-nl-pink-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-nl-pink-700"
            >
              Submit
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
