export default function TricolourBar({
  className = "h-1 w-full",
}: {
  className?: string;
}) {
  return <div className={`tricolour-bar ${className}`} />;
}
