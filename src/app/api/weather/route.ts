export async function GET() {
  const res = await fetch(
    "https://api.weather.gc.ca/collections/citypageweather-realtime/items/nl-24"
  );
  const data = await res.json();
  return Response.json(data);
}