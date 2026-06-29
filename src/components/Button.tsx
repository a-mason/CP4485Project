import Link from "next/link";
import type { ReactNode } from "react";

const variantClass = {
  primary: "bg-nl-green text-white hover:bg-nl-green-700",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

const buttonClass =
  "inline-block rounded-full px-6 py-3 text-center text-sm font-bold transition-colors disabled:opacity-50";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  type?: "button" | "submit";
  fullWidth?: boolean;
  variant?: "primary" | "danger";
  onClick?: () => void;
  disabled?: boolean;
};

export default function Button({
  children,
  href,
  type = "button",
  fullWidth = false,
  variant = "primary",
  onClick,
  disabled = false,
}: ButtonProps) {
  const className = `${buttonClass} ${variantClass[variant]} ${fullWidth ? "w-full" : ""}`;

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
