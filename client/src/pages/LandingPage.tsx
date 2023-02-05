import Carousel from "../components/Carousel";

export default function LandingPage() {
  const images = ["/electronics.jpg", "/glassware.jpg", "/clothing.jpg"];

  return (
    <main>
      <button className="font-logo">Get Started</button>
      {/* <Carousel images={images} /> */}
    </main>
  );
}
