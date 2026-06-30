export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return Response.json({ error: "lat and lon are required" }, { status: 400 });
  }

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto&forecast_days=7`;

  const res = await fetch(url, { next: { revalidate: 1800 } });
  const data = await res.json();
  const daily = data.daily;

  const days = daily.time.map((date: string, index: number) => ({
    date,
    high: Math.round(daily.temperature_2m_max[index]),
    low: Math.round(daily.temperature_2m_min[index]),
    code: daily.weather_code[index],
  }));

  return Response.json(days);
}