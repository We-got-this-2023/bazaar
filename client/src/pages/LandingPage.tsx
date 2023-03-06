import { Link } from "react-router-dom";
import CardSlider from "../components/CardSlider";

export default function LandingPage() {
  return (
    <main className="flex grow flex-col items-center">
      <Link
        to="/search"
        className="my-20 rounded-2xl bg-brick-red py-6 px-10 font-display text-4xl font-semibold text-white transition-all duration-200 hover:scale-105 hover:brightness-110"
      >
        Get Started
      </Link>
      <CardSlider />
    </main>
  );
}
