"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { TravelEvent } from "./events/types";
import Card from "@/components/Card";

type Weather = {
  name: string;
  temp: string;
  condition: string;
  feelsLike: string;
  humidity: string;
  wind: string;
  visibility: string;
};

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
  const [weather, setWeather] = useState<Weather | null>(null);
  const [events, setEvents] = useState<TravelEvent[]>([]);

  useEffect(() => {
    fetch("/api/weather")
      .then((res) => res.json())
      .then((data) => {
        const props = data.properties;
        const cc = props.currentConditions;
        const feelsLike = cc.humidex
          ? cc.humidex.value.en
          : cc.windChill
          ? cc.windChill.value.en
          : cc.temperature.value.en;
        setWeather({
          name: props.name.en,
          temp: cc.temperature.value.en,
          condition: cc.condition.en,
          feelsLike,
          humidity: cc.relativeHumidity.value.en,
          wind: cc.wind.speed.value.en,
          visibility: cc.visibility ? cc.visibility.value.en : "",
        });
      })
      .catch((err) => console.error("Failed to load weather:", err));

    fetch("/api/events")
      .then((res) => res.json())
      .then((data: TravelEvent[]) => setEvents(data))
      .catch((err) => console.error("Failed to load events:", err));
  }, []);

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
                  {weather ? weather.name : "St. John's"}
                </p>
                <div className="mt-3 flex items-end gap-4">
                  <span className="font-display text-7xl font-extrabold leading-none text-white">
                    {weather ? Math.round(parseFloat(weather.temp)) : "--"}°
                  </span>
                  <div className="pb-2">
                    <p className="text-lg font-semibold text-nl-pink-100">
                      {weather ? weather.condition : "Loading…"}
                    </p>
                    {weather && (
                      <p className="text-sm text-white/60">
                        Feels like {Math.round(parseFloat(weather.feelsLike))}°C
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <WeatherStat
                  label="Wind"
                  value={
                    weather ? `${Math.round(parseFloat(weather.wind))} km/h` : "--"
                  }
                />
                <WeatherStat
                  label="Humidity"
                  value={weather ? `${weather.humidity}%` : "--"}
                />
                <WeatherStat
                  label="Vis."
                  value={
                    weather && weather.visibility
                      ? `${weather.visibility} km`
                      : "--"
                  }
                />
              </div>
            </div>
            <div className="tricolour-bar h-1.5 w-full" />
          </div>

          <Link
            href="/weather"
            className="mt-5 inline-block text-sm font-bold text-nl-green-700 hover:underline"
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