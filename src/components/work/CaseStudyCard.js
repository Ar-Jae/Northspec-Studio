import Image from "next/image";
import { cn } from "../../lib/utils";

export default function CaseStudyCard({ study, compact = false }) {
  return (
    <article
      className={cn(
        "group overflow-hidden rounded-2xl border border-white/10 bg-white/5",
        "transition hover:border-white/20 hover:bg-white/10"
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-800">
        <Image
          src={study.image}
          alt={`${study.client} project placeholder`}
          fill
          className="object-cover transition duration-300 group-hover:scale-[1.02]"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={Boolean(study.featured)}
        />
      </div>
      <div className={cn("p-6", compact && "p-5")}
      >
        <p className="text-sm font-medium text-brand-orange">
          {study.client} • {study.industry}
        </p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">
          {study.client}
        </h3>
        <p className="mt-3 text-sm text-slate-400">
          {study.problem}
        </p>

        <dl className="mt-5 grid grid-cols-3 gap-3">
          {study.impact.map((item) => (
            <div key={item.label} className="rounded-xl bg-white/5 p-3">
              <dt className="text-xs text-slate-400">{item.label}</dt>
              <dd className="mt-1 text-sm font-semibold text-white">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-5 flex flex-wrap gap-2">
          {study.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
