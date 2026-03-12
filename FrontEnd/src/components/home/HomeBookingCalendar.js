import Container from "../Container";
import InlineScheduler from "../book/InlineScheduler";

export default function HomeBookingCalendar() {
  return (
    <section id="home-booking-calendar" className="bg-brand-dark pb-20">
      <Container>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-2xl font-semibold text-white font-serif">Pick an available time</h2>
          <p className="text-sm text-slate-400 mt-1 mb-6">
            Only available slots are shown. Your internal calendar events remain private.
          </p>
          <InlineScheduler />
        </div>
      </Container>
    </section>
  );
}
