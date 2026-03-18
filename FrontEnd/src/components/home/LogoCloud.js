import Container from "../Container";
import LogoIcon from "../LogoIcon";

const logos = ["HarborCart", "LumenOps", "Ridgeview", "Kestrel", "Brightlane", "AtlasCo"]; 

export default function LogoCloud() {
  return (
    <section className="border-y border-white/10 bg-brand-dark">
      <Container className="py-10">
        <p className="text-center text-sm font-medium text-slate-400 mb-8">
          Trusted by teams who value quality and speed
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex items-center gap-2">
            <LogoIcon className="h-8 w-8" />
            <span className="text-lg font-bold text-white tracking-tight">Northspec</span>
          </div>
          {logos.map((name) => (
            <div
              key={name}
              className="text-xl font-bold tracking-tight text-slate-300"
            >
              {name}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
