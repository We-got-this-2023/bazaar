import CardSlider from "../components/CardSlider";

export default function LandingPage() {
  return (
    <main className="flex h-full flex-grow flex-col items-center">
      <button className="my-20 rounded-2xl bg-brick-red py-6 px-10 font-display text-4xl font-semibold text-white">
        Get Started
      </button>
      <CardSlider />
    </main>
  );
}
