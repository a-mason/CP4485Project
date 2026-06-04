import Link from "next/link"

export default function Navbar(){
  return (
      <nav className="w-full bg-white shadow flex justify-center gap-8 py-4">
        <Link href={"/"} className="font-semibold text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
        <Link href={"/about"} className="font-semibold text-gray-700 hover:text-blue-600 transition-colors">about</Link>
        <Link href={"/advisor"} className="font-semibold text-gray-700 hover:text-blue-600 transition-colors">advisor</Link>
        <Link href={"/transit"} className="font-semibold text-gray-700 hover:text-blue-600 transition-colors">transit</Link>
      </nav>
      );
    }