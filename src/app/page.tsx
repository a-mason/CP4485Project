import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center">
      <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
        <br className="hidden sm:block" />{" "}
        <span className="text-tricolour">St. John's Travel Advisory</span>
      </h1>

      <p className="mx-auto mt-6 max-w-xl text-base text-nl-fog sm:text-lg">
        Your local travel advisory platform
      </p>
    </div>
  );
}