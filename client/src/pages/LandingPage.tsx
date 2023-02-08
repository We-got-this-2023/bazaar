import CardSlider from "../components/CardSlider";

export default function LandingPage() {
  return (
    <main className="flex h-screen flex-col justify-end font-logo">
      <button className="mx-auto mb-20 h-20 w-96 rounded-2xl bg-brick-red font-display text-4xl font-semibold text-white">
        Get Started
      </button>
      <div className="pb-20">
        <CardSlider />
      </div>
    </main>
  );
}
