"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { TravelEvent } from "./events/types";
import Card from "@/components/Card";

type Condition = "sunny" | "cloudy" | "rainy" | "snowy" | "windy" | "foggy";

type City = {
  name: string;
  region: string;
  temp: number | null;
  feelsLike: number | null;
  label: string;
  wind: number | null;
  humidity: number | null;
  visibility: number | null;
};

const CONDITION_ICON: Record<Condition, string> = {
  sunny: "☀️",
  cloudy: "☁️",
  rainy: "🌧️",
  snowy: "❄️",
  windy: "💨",
  foggy: "🌫️",
};

function conditionFromLabel(label: string): Condition {
  const text = label.toLowerCase();
  if (text.includes("fog")) return "foggy";
  if (text.includes("rain") || text.includes("drizzle") || text.includes("shower")) return "rainy";
  if (text.includes("snow") || text.includes("flurr")) return "snowy";
  if (text.includes("wind") || text.includes("breez")) return "windy";
  if (text.includes("sun") || text.includes("clear")) return "sunny";
  return "cloudy";
}

function show(value: number | null, suffix: string): string {
  return value === null ? "--" : `${value}${suffix}`;
}

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span className="h-5 w-1 rounded-full bg-nl-pink-600" />
      <h2 className="font-display text-xl font-extrabold">{children}</h2>
    </div>
  );
}

function WeatherStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-lg bg-white/10 px-3 py-3">
      <span className="font-mono text-sm font-medium text-white">{value}</span>
      <span className="text-[0.65rem] uppercase tracking-wider text-white/50">
        {label}
      </span>
    </div>
  );
}

export default function Home() {
  const [cities, setCities] = useState<City[]>([]);
  const [selectedName, setSelectedName] = useState("St. John's");
  const [events, setEvents] = useState<TravelEvent[]>([]);

  useEffect(() => {
    fetch("/api/weather/nearby")
      .then((res) => res.json())
      .then((data: City[]) => setCities(data))
      .catch((err) => console.error("Failed to load weather:", err));

    fetch("/api/events")
      .then((res) => res.json())
      .then((data: TravelEvent[]) => setEvents(data))
      .catch((err) => console.error("Failed to load events:", err));
  }, []);

  const selected =
    cities.find((city) => city.name === selectedName) ?? cities[0] ?? null;

  const today = new Date().toISOString().slice(0, 10);
  const upcoming = events
    .filter((event) => event.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 6);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SectionHeading>Current Conditions</SectionHeading>

          <div className="mt-5 overflow-hidden rounded-2xl bg-gradient-to-br from-nl-green to-nl-green-900 shadow-sm">
            <div className="flex flex-col gap-8 p-8 sm:flex-row sm:items-center">
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
                  {selected ? selected.region : "Loading…"}
                </p>
                <h3 className="mt-1 font-display text-4xl font-extrabold text-white">
                  {selected ? selected.name : "St. John's"}
                </h3>
                <div className="mt-3 flex items-end gap-4">
                  <span className="font-display text-7xl font-extrabold leading-none text-white">
                    {selected ? show(selected.temp, "°") : "--°"}
                  </span>
                  <div className="pb-2">
                    <p className="text-lg font-semibold text-nl-pink-100">
                      {selected
                        ? `${CONDITION_ICON[conditionFromLabel(selected.label)]} ${selected.label}`
                        : "Loading…"}
                    </p>
                    {selected && selected.feelsLike !== null && (
                      <p className="text-sm text-white/60">
                        Feels like {selected.feelsLike}°C
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <WeatherStat
                  label="Wind"
                  value={selected ? show(selected.wind, " km/h") : "--"}
                />
                <WeatherStat
                  label="Humidity"
                  value={selected ? show(selected.humidity, "%") : "--"}
                />
                <WeatherStat
                  label="Vis."
                  value={selected ? show(selected.visibility, " km") : "--"}
                />
              </div>
            </div>
            <div className="tricolour-bar h-1.5 w-full" />
          </div>

          <p className="mt-5 text-xs text-nl-fog">
            Nearby spots — pick one to see its conditions.
          </p>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {cities.map((city) => {
              const active = city.name === selectedName;
              return (
                <button
                  key={city.name}
                  type="button"
                  onClick={() => setSelectedName(city.name)}
                  className={`rounded-xl border-2 p-4 text-left transition-colors ${
                    active
                      ? "border-nl-green bg-nl-green text-white"
                      : "border-black/10 bg-white text-nl-ink hover:border-nl-green/40"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-[15px] font-bold leading-tight">
                        {city.name}
                      </p>
                      <p
                        className={`mt-0.5 truncate text-xs ${
                          active ? "text-white/70" : "text-nl-fog"
                        }`}
                      >
                        {city.region}
                      </p>
                    </div>
                    <span className="text-base">
                      {CONDITION_ICON[conditionFromLabel(city.label)]}
                    </span>
                  </div>
                  <div className="mt-2 flex items-end justify-between gap-2">
                    <span className="font-display text-3xl font-extrabold">
                      {show(city.temp, "°")}
                    </span>
                    <span
                      className={`truncate pb-1 text-xs ${
                        active ? "text-white/70" : "text-nl-fog"
                      }`}
                    >
                      {city.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <Link
            href="/weather"
            className="mt-6 inline-block text-sm font-bold text-nl-green-700 hover:underline"
          >
            Full weather →
          </Link>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <SectionHeading>Upcoming Events</SectionHeading>
            <Link
              href="/events"
              className="text-xs font-bold text-nl-green-700 hover:underline"
            >
              Calendar →
            </Link>
          </div>

          <ul className="mt-5 space-y-3">
            {upcoming.length === 0 && (
              <li className="text-sm text-nl-fog">No upcoming events yet.</li>
            )}
            {upcoming.map((event) => {
              const day = new Date(`${event.date}T00:00:00`);
              return (
                <li key={event._id}>
                  <Card className="flex items-center gap-3 p-3">
                    <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg bg-nl-green-50 text-nl-green-700">
                      <span className="text-[0.6rem] font-bold uppercase">
                        {day.toLocaleDateString("en-CA", { month: "short" })}
                      </span>
                      <span className="text-lg font-extrabold leading-none">
                        {day.getDate()}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-semibold">{event.title}</p>
                      <p className="truncate text-xs text-nl-fog">
                        {event.location}
                      </p>
                    </div>
                  </Card>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}