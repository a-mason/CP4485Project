import Link from "next/link";



export default function Footer() {
  return (
    <footer className="mt-auto border-t border-black/5 bg-white">
      <div className="tricolour-bar h-1 w-full" />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <p className="font-display text-lg font-extrabold tracking-tight">
              St. John&apos;s <span className="text-tricolour">Travel Advisory</span>
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-2 border-t border-black/5 pt-6 text-xs text-nl-fog sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} St. John&apos;s Travel Advisory · Newfoundland &amp; Labrador</p>
          <p>Weather data courtesy of Environment Canada.</p>
        </div>
      </div>
    </footer>
  );
}
