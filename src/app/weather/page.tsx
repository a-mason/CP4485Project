"use client";
import { useState, useEffect } from "react";

export default function Weather() {
  const [cityName, setCityName] = useState("");
  const [temp, setTemp] = useState("");
  const [condition, setCondition] = useState("");
  const [humidity, setHumidity] = useState("");
  const [wind, setWind] = useState("");
  const [icon, setIcon] = useState("");
  const [feelsLike, setFeelsLike] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://api.weather.gc.ca/collections/citypageweather-realtime/items/nl-24"
    )
      .then((response) => response.json())
      .then((data) => {
        const props = data.properties;
        const cc = props.currentConditions;

        setCityName(props.name.en);
        setTemp(cc.temperature.value.en);
        setCondition(cc.condition.en);
        setHumidity(cc.relativeHumidity.value.en);
        setWind(cc.wind.speed.value.en);
        setIcon(cc.iconCode.url);

        const calculatedFeels = cc.humidex
          ? cc.humidex.value.en
          : cc.windChill
          ? cc.windChill.value.en
          : cc.temperature.value.en;
        setFeelsLike(calculatedFeels);
      })
      .catch((error) => console.error("Error fetching weather:", error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="aurora min-h-[70vh]">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-14 sm:px-6 sm:py-20">
        <div className="mb-8 text-center">
          <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            {cityName ? `${cityName} Weather` : "St. John's Weather"}
          </h1>
        </div>

        <div className="relative w-full max-w-md animate-float-up overflow-hidden rounded-3xl border border-black/5 bg-white shadow-xl">
          <div className="tricolour-bar h-1.5 w-full" />
              <>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 rounded-full bg-nl-pink-50 px-3 py-1 text-xs font-bold text-nl-pink-700">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-nl-pink-600" />
                    Travel Status
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-nl-fog">
                    St. John's, NL
                  </span>
                </div>

                {icon && (
                  <div className="mt-6 flex items-center justify-center gap-5">
                    <img
                      src={icon}
                      alt={condition}
                      className="h-20 w-20 drop-shadow"
                    />
                    <div>
                      <h2 className="font-display text-5xl font-extrabold leading-none tracking-tight">
                        {temp}
                        <span className="align-top text-2xl text-nl-fog">°C</span>
                      </h2>
                      <p className="mt-1 text-sm font-medium text-nl-fog">
                        {condition}
                      </p>
                    </div>
                  </div>
                )}

                {feelsLike && (
                  <div className="mt-6 rounded-2xl bg-gradient-to-r from-nl-green-50 to-nl-pink-50 p-3.5 text-center text-sm text-nl-ink/80">
                    Feels like{" "}
                    <span className="font-extrabold text-nl-green-700">
                      {feelsLike}°C
                    </span>{" "}
                  </div>
                )}

                <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                  <div className="flex flex-col gap-1 rounded-2xl border border-black/5 bg-nl-cream p-4">
                    <span className="text-[0.65rem] font-bold uppercase tracking-wider text-nl-fog">
                      Humidity
                    </span>
                    <span className="text-lg font-extrabold text-nl-ink">
                      {humidity}%
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 rounded-2xl border border-black/5 bg-nl-cream p-4">
                    <span className="text-[0.65rem] font-bold uppercase tracking-wider text-nl-fog">
                      Wind Speed
                    </span>
                    <span className="text-lg font-extrabold text-nl-ink">
                      {wind} km/h
                    </span>
                  </div>
                </div>
              </>
          </div>
        </div>
      </div>
  );
}
