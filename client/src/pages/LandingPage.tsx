import CardSlider from "../components/CardSlider";
import Carousel from "../components/Carousel";

export default function LandingPage() {
  return (
    <main className="flex h-screen flex-col justify-end">
      <button className="land_btn mx-auto mb-20 h-20 w-96 rounded-2xl bg-brick-red font-sans text-4xl font-semibold text-white">
        Get Started
      </button>
      <div className="pb-20">
        <CardSlider />
      </div>

      {/* <Carousel images={images} /> */}
    </main>
  );
}
