interface Props {
  src: string;
  title: string;
}

export default function Gallery({ src, title }: Props) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
      <img src={src} alt={title} className="aspect-[8/5] w-full object-cover" />
      <figcaption className="p-4 font-semibold">{title}</figcaption>
    </figure>
  );
}