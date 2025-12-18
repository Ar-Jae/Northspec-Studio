import { cn } from "../lib/utils";
import TextReveal from "./animations/TextReveal";
import FadeIn from "./animations/FadeIn";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={cn("flex flex-col", alignClass, className)}>
      {eyebrow ? (
        <FadeIn>
          <p className="text-sm font-medium tracking-wide text-brand-gold uppercase mb-2">{eyebrow}</p>
        </FadeIn>
      ) : null}
      <TextReveal>
        <h2 className="text-balance text-3xl font-serif font-medium tracking-tight text-white sm:text-5xl pb-1">
          {title}
        </h2>
      </TextReveal>
      {description ? (
        <FadeIn delay={0.2}>
          <p className="mt-4 max-w-2xl text-pretty text-base text-slate-400 sm:text-lg">
            {description}
          </p>
        </FadeIn>
      ) : null}
    </div>
  );
}
