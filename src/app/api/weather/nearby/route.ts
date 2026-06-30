const SITES = [
  { id: "nl-24", name: "St. John's" },
  { id: "nl-43", name: "Bay Roberts" },
  { id: "nl-30", name: "Placentia" },
  { id: "nl-28", name: "Cape Race" },
  { id: "nl-1", name: "Clarenville" },
  { id: "nl-15", name: "Terra Nova" },
];

function toNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === "") {
    return null;
  }
  const parsed = Number(value);
  return Number.isNaN(parsed) ? null : Math.round(parsed);
}

function regionText(region: unknown): string {
  if (!region) {
    return "";
  }
  if (typeof region === "string") {
    return region;
  }
  const asRecord = region as { en?: string };
  return asRecord.en ? asRecord.en : "";
}

type CurrentConditions = {
  temperature?: { value?: { en?: string } };
  condition?: { en?: string };
  wind?: { speed?: { value?: { en?: string } } };
  relativeHumidity?: { value?: { en?: string } };
  visibility?: { value?: { en?: string } };
  humidex?: { value?: { en?: string } };
  windChill?: { value?: { en?: string } };
};

function parseCity(
  name: string,
  region: unknown,
  lon: number | null,
  lat: number | null,
  cc: CurrentConditions
) {
  const temp = toNumber(cc?.temperature?.value?.en);
  const humidex = toNumber(cc?.humidex?.value?.en);
  const windChill = toNumber(cc?.windChill?.value?.en);

  let feelsLike = temp;
  if (humidex !== null) {
    feelsLike = humidex;
  } else if (windChill !== null) {
    feelsLike = windChill;
  }
  if (feelsLike !== null && temp !== null && Math.abs(feelsLike - temp) > 15) {
    feelsLike = temp;
  }

  return {
    name,
    region: regionText(region),
    lon,
    lat,
    temp,
    feelsLike,
    label: cc?.condition?.en ? cc.condition.en : "",
    wind: toNumber(cc?.wind?.speed?.value?.en),
    humidity: toNumber(cc?.relativeHumidity?.value?.en),
    visibility: toNumber(cc?.visibility?.value?.en),
  };
}

export async function GET() {
  const cities = await Promise.all(
    SITES.map(async (site) => {
      const res = await fetch(
        `https://api.weather.gc.ca/collections/citypageweather-realtime/items/${site.id}?lang=en`,
        { next: { revalidate: 600 } }
      );
      const data = await res.json();
      const props = data.properties;
      const coordinates = data.geometry ? data.geometry.coordinates : [null, null];
      return parseCity(
        site.name,
        props.region,
        coordinates[0],
        coordinates[1],
        props.currentConditions
      );
    })
  );

  return Response.json(cities);
}