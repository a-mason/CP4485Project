import Link from "next/link";
import type { ReactNode } from "react";

const buttonClass =
  "inline-block rounded-full bg-nl-green px-6 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-nl-green-700";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  type?: "button" | "submit";
  fullWidth?: boolean;
};

export default function Button({
  children,
  href,
  type = "button",
  fullWidth = false,
}: ButtonProps) {
  const className = fullWidth ? `${buttonClass} w-full` : buttonClass;

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={className}>
      {children}
    </button>
  );
}
