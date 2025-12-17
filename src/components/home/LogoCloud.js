import Container from "../Container";

const logos = ["HarborCart", "LumenOps", "Ridgeview", "Kestrel", "Brightlane", "AtlasCo"]; 

export default function LogoCloud() {
  return (
    <section className="border-y border-white/10 bg-brand-dark">
      <Container className="py-10">
        <p className="text-center text-sm font-medium text-slate-400">
          Trusted by teams who value quality and speed
        </p>
        <ul className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-4">
          {logos.map((name) => (
            <li
              key={name}
              className="text-sm font-semibold tracking-tight text-slate-500"
            >
              {name}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
