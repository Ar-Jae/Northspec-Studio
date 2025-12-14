import Image from "next/image";
import { cn } from "../../lib/utils";

export default function CaseStudyCard({ study, compact = false }) {
  return (
    <article
      className={cn(
        "group overflow-hidden rounded-2xl border border-slate-200 bg-white",
        "transition hover:border-slate-300"
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
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
        <p className="text-sm font-medium text-slate-600">
          {study.client} • {study.industry}
        </p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">
          {study.client}
        </h3>
        <p className="mt-3 text-sm text-slate-600">
          {study.problem}
        </p>

        <dl className="mt-5 grid grid-cols-3 gap-3">
          {study.impact.map((item) => (
            <div key={item.label} className="rounded-xl bg-slate-50 p-3">
              <dt className="text-xs text-slate-600">{item.label}</dt>
              <dd className="mt-1 text-sm font-semibold text-slate-900">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-5 flex flex-wrap gap-2">
          {study.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
