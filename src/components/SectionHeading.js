import { cn } from "../lib/utils";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}) {
  const alignClass = align === "center" ? "text-center" : "text-left";

  return (
    <div className={cn(alignClass, className)}>
      {eyebrow ? (
        <p className="text-sm font-medium tracking-wide text-brand-gold uppercase">{eyebrow}</p>
      ) : null}
      <h2 className="mt-2 text-balance text-3xl font-serif font-medium tracking-tight text-white sm:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 max-w-2xl text-pretty text-base text-slate-400 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
