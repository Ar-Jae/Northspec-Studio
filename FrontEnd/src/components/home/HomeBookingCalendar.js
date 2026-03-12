import Container from "../Container";

export default function HomeBookingCalendar() {
  return (
    <section id="home-booking-calendar" className="bg-brand-dark pb-20">
      <Container>
        <div className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 bg-white/5">
            <h2 className="text-2xl font-semibold text-white font-serif">Pick an available time</h2>
            <p className="text-sm text-slate-400 mt-1">
              Select a date and time directly on this page.
            </p>
          </div>
          <iframe
            src="https://calendar.google.com/calendar/embed?src=build%40northspecstudio.com&ctz=America%2FNew_York"
            style={{ border: 0 }}
            width="100%"
            height="700"
            frameBorder="0"
            scrolling="no"
            title="Northspec Booking Calendar"
          ></iframe>
        </div>
      </Container>
    </section>
  );
}
