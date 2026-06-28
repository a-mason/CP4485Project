interface Props {
  index: number;
  text: string;
}

export default function Checklist({ index, text }: Props) {
  return (
    <li className="flex items-start gap-3 rounded-xl border border-black/5 bg-white p-4 shadow-sm">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-nl-green-50 text-xs font-bold text-nl-green-700">
        {index}
      </span>
      <span className="text-sm">{text}</span>
    </li>
  );
}